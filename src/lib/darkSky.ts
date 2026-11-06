export interface DarkSkyOptions {
  realm?: "twilight" | "moonlit" | "emerald" | "ember" | "void";
  swirl?: number;
  stars?: number;
  fadeIn?: number;
  scale?: number;
}

export interface DarkSkyHandle {
  play: () => void;
  pause: () => void;
  resize: () => void;
  destroy: () => void;
}

type RealmColors = [number[], number[], number[], number[]];

const REALMS: Record<string, RealmColors> = {
  twilight: [
    [0.03, 0.02, 0.14],
    [0.2, 0.08, 0.6],
    [0.55, 0.35, 1.0],
    [0.75, 0.2, 0.85],
  ],
  moonlit: [
    [0.01, 0.02, 0.1],
    [0.05, 0.12, 0.5],
    [0.3, 0.55, 1.0],
    [0.35, 0.3, 0.9],
  ],
  emerald: [
    [0.03, 0.01, 0.12],
    [0.22, 0.06, 0.45],
    [0.3, 0.85, 0.7],
    [0.45, 0.2, 0.8],
  ],
  ember: [
    [0.1, 0.01, 0.03],
    [0.55, 0.07, 0.08],
    [1.0, 0.45, 0.15],
    [0.9, 0.2, 0.2],
  ],
  voidrealm: [
    [0.04, 0.0, 0.1],
    [0.4, 0.05, 0.65],
    [0.95, 0.25, 0.95],
    [0.85, 0.1, 0.55],
  ],
};

const VERTEX_SHADER =
  "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAGMENT_SHADER = [
  "precision mediump float;",
  "uniform vec2 uRes;uniform float uTime;uniform float uSwirl;uniform float uStars;uniform float uFade;",
  "uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;",
  "float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
  "float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);",
  " return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}",
  "float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);",
  " for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}",
  "vec2 rot(vec2 p,float a){float s=sin(a),c=cos(a);return vec2(c*p.x-s*p.y,s*p.x+c*p.y);}",
  "void main(){",
  " vec2 uv=gl_FragCoord.xy/uRes.xy;",
  " float asp=uRes.x/uRes.y;",
  " vec2 p=(uv-vec2(.5,.62))*vec2(asp,1.)*2.2;",
  " float t=uTime*.06;",
  " float r=length(p);",
  " float ang=uSwirl*(1.6/(r+.55))+t*1.5;",
  " vec2 q=rot(p,ang);",
  " vec2 w=vec2(fbm(q*1.3+vec2(0.,t*2.)),fbm(q*1.3+vec2(5.2,1.3)-t*2.));",
  " vec2 w2=vec2(fbm(q+3.*w+vec2(1.7,9.2)+t),fbm(q+3.*w+vec2(8.3,2.8)-t));",
  " float f=fbm(q+3.5*w2);",
  " float filament=smoothstep(.45,.85,f)*.9+pow(f,3.)*.6;",
  " vec3 col=mix(c0,c1,smoothstep(.1,.7,f));",
  " col=mix(col,c2,filament*.55);",
  " float neb=smoothstep(.35,.0,abs(uv.y-(.55+.25*(uv.x-.5)))-.05+fbm(p*2.+t)*.18);",
  " col+=c3*neb*.35*fbm(p*3.-t*2.);",
  " vec2 g=uv*vec2(asp,1.)*vec2(90.,90.);vec2 id=floor(g);vec2 fr=fract(g)-.5;",
  " float h=hash(id);float on=step(.965,h);",
  " float tw=.6+.4*sin(uTime*(1.+h*4.)+h*40.);",
  " float star=on*smoothstep(.22,.0,length(fr))*tw;",
  " vec2 g2=uv*vec2(asp,1.)*vec2(28.,28.);vec2 id2=floor(g2);vec2 fr2=fract(g2)-.5;",
  " float h2=hash(id2+7.);float big=step(.985,h2)*smoothstep(.3,.0,length(fr2))*(.7+.3*sin(uTime*2.+h2*30.));",
  " float cross=step(.985,h2)*(smoothstep(.02,.0,abs(fr2.x))*smoothstep(.35,.0,abs(fr2.y))+smoothstep(.02,.0,abs(fr2.y))*smoothstep(.35,.0,abs(fr2.x)))*.5;",
  " col+=vec3(.9,.9,1.)*(star*.9+big+cross)*uStars*(1.-filament*.6);",
  " float vig=smoothstep(1.25,.3,length((uv-.5)*vec2(asp*.8,1.)));",
  " col*=mix(.45,1.,vig);",
  " col*=mix(.35,1.,smoothstep(.0,.45,uv.y));",
  " col*=uFade;",
  " gl_FragColor=vec4(col,1.);",
  "}",
].join("\n");

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

export function mountDarkSky(
  canvas: HTMLCanvasElement,
  options: DarkSkyOptions = {},
): DarkSkyHandle | null {
  const realm =
    REALMS[options.realm === "void" ? "voidrealm" : options.realm ?? "twilight"] ??
    REALMS.twilight;
  const swirl = options.swirl ?? 0.6;
  const stars = options.stars ?? 0.8;
  const fadeIn = options.fadeIn ?? 1.2;
  const scale = options.scale ?? 0.6;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    canvas.classList.add("fd-sky--fallback");
    return null;
  }

  const context = gl;
  const vertexShader = compileShader(context, context.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER,
  );
  if (!vertexShader || !fragmentShader) {
    canvas.classList.add("fd-sky--fallback");
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    canvas.classList.add("fd-sky--fallback");
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const position = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uRes = uniform("uRes");
  const uTime = uniform("uTime");
  const uSwirl = uniform("uSwirl");
  const uStars = uniform("uStars");
  const uFade = uniform("uFade");

  gl.uniform3fv(uniform("c0"), realm[0]);
  gl.uniform3fv(uniform("c1"), realm[1]);
  gl.uniform3fv(uniform("c2"), realm[2]);
  gl.uniform3fv(uniform("c3"), realm[3]);
  gl.uniform1f(uSwirl, swirl);
  gl.uniform1f(uStars, stars);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * scale;
    canvas.width = Math.max(2, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(2, Math.floor(canvas.clientHeight * dpr));
    context.viewport(0, 0, canvas.width, canvas.height);
    context.uniform2f(uRes, canvas.width, canvas.height);
  }

  const start = performance.now();
  let raf = 0;
  let running = false;

  function draw(now: number) {
    const time = reduce ? 14 : (now - start) / 1000;
    let fade = reduce ? 1 : Math.min(1, time / Math.max(fadeIn, 0.001));
    fade = fade * fade * (3 - 2 * fade);
    context.uniform1f(uTime, time);
    context.uniform1f(uFade, fade);
    context.drawArrays(context.TRIANGLE_STRIP, 0, 4);
    if (running && !reduce) raf = requestAnimationFrame(draw);
  }

  function play() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }

  function pause() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const onResize = () => {
    resize();
    if (reduce) draw(0);
  };

  const onVisibilityChange = () => {
    if (document.hidden) pause();
    else play();
  };

  function destroy() {
    pause();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  }

  resize();
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (reduce) draw(0);
  else play();

  return { play, pause, resize, destroy };
}
