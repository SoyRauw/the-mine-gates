import { useState, type FormEvent } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  validateMinecraftUsername,
  validateRealName,
} from "../data/whitelist";
import { Reveal } from "./ui/Reveal";
import { RuneIcon } from "./ui/RuneIcon";
import { SectionHeader } from "./ui/SectionHeader";

const STEPS = [
  {
    title: "Envía tu solicitud",
    text: "Solo necesitamos tu usuario de Minecraft y tu nombre real. El nombre real queda oculto para el público.",
  },
  {
    title: "El staff la revisa",
    text: "Una persona del gremio comprobará tu solicitud manualmente. No hay aprobación automática.",
  },
  {
    title: "Cruza la Puerta",
    text: "Si todo está en orden, tu usuario se añade a la whitelist y podrás entrar al servidor.",
  },
];

export function Whitelist() {
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    realName?: string;
    rules?: string;
  }>({});
  const [submittedUsername, setSubmittedUsername] = useState<string | null>(null);

  const resetForm = () => {
    setUsername("");
    setRealName("");
    setAcceptedRules(false);
    setHoneypot("");
    setError(null);
    setFieldErrors({});
    setSubmittedUsername(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (honeypot.trim()) {
      setSubmittedUsername(username.trim() || "tu usuario");
      return;
    }

    const usernameError = validateMinecraftUsername(username);
    const realNameError = validateRealName(realName);
    const rulesError = acceptedRules
      ? undefined
      : "Debes aceptar las reglas para enviar la solicitud.";

    if (usernameError || realNameError || rulesError) {
      setFieldErrors({
        username: usernameError ?? undefined,
        realName: realNameError ?? undefined,
        rules: rulesError,
      });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setError(
        "El registro todavía no está configurado. Avisa al staff en Discord.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from("whitelist_applications")
        .insert({
          minecraft_username: username.trim(),
          real_name: realName.trim(),
        });

      if (insertError) {
        if (insertError.code === "23505") {
          setError(
            "Ya existe una solicitud pendiente para ese usuario de Minecraft.",
          );
        } else if (
          insertError.code === "42P01" ||
          insertError.code === "PGRST205"
        ) {
          setError(
            "El registro todavía se está preparando. Inténtalo de nuevo más tarde.",
          );
        } else if (insertError.code === "42501") {
          setError(
            "El registro no tiene permisos para guardar solicitudes. Avisa al staff.",
          );
        } else {
          console.error("Whitelist insert error:", insertError);
          setError(
            "No se pudo enviar la solicitud. Inténtalo de nuevo en unos minutos.",
          );
        }
        return;
      }

      setSubmittedUsername(username.trim());
    } catch (submitError) {
      console.error("Whitelist unexpected error:", submitError);
      setError("No se pudo enviar la solicitud. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="whitelist"
      className="section whitelist-section"
      aria-labelledby="whitelist-title"
    >
      <div className="container">
        <SectionHeader
          id="whitelist-title"
          eyebrow="El Registro del Gremio"
          title={
            <>
              Solicita tu
              <br />
              acceso a la Puerta
            </>
          }
          subtitle="La Puerta no se abre para cualquiera. Envía tu solicitud, deja que el staff la revise y gana tu lugar en el servidor."
        />

        <div className="whitelist-layout">
          <Reveal className="fd-panel whitelist-intro" delay={0.05}>
            <div className="whitelist-intro__seal" aria-hidden="true">
              <RuneIcon variant="holy" size={108} />
            </div>
            <span className="fd-eyebrow">Tres sellos antes de entrar</span>
            <h3 className="fd-title whitelist-intro__title">
              El acceso se gana, no se pide dos veces
            </h3>
            <div className="whitelist-steps">
              {STEPS.map((step, index) => (
                <div className="whitelist-step" key={step.title}>
                  <span className="whitelist-step__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="whitelist-intro__privacy">
              Tu nombre real solo lo verá el staff. No se muestra en la página
              ni se comparte con otros jugadores.
            </p>
          </Reveal>

          <Reveal className="fd-panel whitelist-form-panel" delay={0.12}>
            {submittedUsername ? (
              <div className="whitelist-success" role="status">
                <span className="whitelist-success__rune" aria-hidden="true">
                  <RuneIcon variant="holy" size={92} />
                </span>
                <span className="fd-eyebrow">Solicitud sellada</span>
                <h3 className="fd-title whitelist-success__title">
                  Tu nombre está en el registro
                </h3>
                <p>
                  Hemos recibido la solicitud de{" "}
                  <strong>{submittedUsername}</strong>. El staff la revisará
                  manualmente y, si todo está en orden, añadirá tu usuario a la
                  whitelist.
                </p>
                <p className="whitelist-success__note">
                  No hay aviso automático. Prueba a entrar más tarde; si aún no
                  tienes acceso, espera a que el staff termine la revisión.
                </p>
                <button
                  type="button"
                  className="fd-btn fd-btn--ghost"
                  onClick={resetForm}
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form className="whitelist-form" onSubmit={handleSubmit} noValidate>
                <span className="fd-eyebrow">Formulario de acceso</span>
                <h3 className="fd-title whitelist-form__title">
                  Escribe tu nombre en la Puerta
                </h3>

                <div className="whitelist-field">
                  <label htmlFor="whitelist-username">
                    Usuario de Minecraft
                  </label>
                  <input
                    id="whitelist-username"
                    name="minecraft_username"
                    type="text"
                    autoComplete="username"
                    spellCheck={false}
                    maxLength={16}
                    placeholder="Steve_O_Mago"
                    value={username}
                    aria-invalid={Boolean(fieldErrors.username)}
                    aria-describedby={
                      fieldErrors.username ? "whitelist-username-error" : undefined
                    }
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setFieldErrors((current) => ({
                        ...current,
                        username: undefined,
                      }));
                    }}
                  />
                  {fieldErrors.username ? (
                    <span
                      className="whitelist-field__error"
                      id="whitelist-username-error"
                    >
                      {fieldErrors.username}
                    </span>
                  ) : (
                    <span className="whitelist-field__hint">
                      El nombre exacto con el que entrarás al servidor.
                    </span>
                  )}
                </div>

                <div className="whitelist-field">
                  <label htmlFor="whitelist-real-name">Nombre real</label>
                  <input
                    id="whitelist-real-name"
                    name="real_name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    placeholder="Tu nombre"
                    value={realName}
                    aria-invalid={Boolean(fieldErrors.realName)}
                    aria-describedby={
                      fieldErrors.realName
                        ? "whitelist-real-name-error"
                        : "whitelist-real-name-hint"
                    }
                    onChange={(event) => {
                      setRealName(event.target.value);
                      setFieldErrors((current) => ({
                        ...current,
                        realName: undefined,
                      }));
                    }}
                  />
                  {fieldErrors.realName ? (
                    <span
                      className="whitelist-field__error"
                      id="whitelist-real-name-error"
                    >
                      {fieldErrors.realName}
                    </span>
                  ) : (
                    <span
                      className="whitelist-field__hint"
                      id="whitelist-real-name-hint"
                    >
                      Solo lo verá el staff. No se publica.
                    </span>
                  )}
                </div>

                <label className="whitelist-check">
                  <input
                    type="checkbox"
                    checked={acceptedRules}
                    aria-invalid={Boolean(fieldErrors.rules)}
                    onChange={(event) => {
                      setAcceptedRules(event.target.checked);
                      setFieldErrors((current) => ({
                        ...current,
                        rules: undefined,
                      }));
                    }}
                  />
                  <span>
                    He leído y acepto las{" "}
                    <a href="#reglas">reglas del servidor</a>.
                  </span>
                </label>
                {fieldErrors.rules ? (
                  <span className="whitelist-field__error">
                    {fieldErrors.rules}
                  </span>
                ) : null}

                <div className="whitelist-honeypot" aria-hidden="true">
                  <label htmlFor="whitelist-website">No rellenar</label>
                  <input
                    id="whitelist-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                {error ? (
                  <p className="whitelist-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="fd-btn fd-btn--fire whitelist-submit"
                  disabled={submitting}
                >
                  {submitting ? "Sellando solicitud…" : "Sellar mi solicitud"}
                </button>

                <p className="whitelist-form__note">
                  La revisión es manual. No se aprueba automáticamente.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
