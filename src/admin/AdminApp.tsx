import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  formatWhitelistDate,
  WHITELIST_STATUS_LABELS,
  type WhitelistApplication,
  type WhitelistStatus,
} from "../data/whitelist";
import { copyText } from "../lib/clipboard";
import { RuneIcon } from "../components/ui/RuneIcon";

type StatusFilter = "all" | WhitelistStatus;

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "Pendientes" },
  { id: "approved", label: "Aprobadas" },
  { id: "rejected", label: "Rechazadas" },
];

function Brand() {
  return (
    <a
      className="admin-brand"
      href="./"
      aria-label="THE MINE GATE’S · Volver a la web"
    >
      <span className="admin-brand__rune" aria-hidden="true">
        <RuneIcon variant="arcane" size={44} />
      </span>
      <span className="admin-brand__text">
        <span className="admin-brand__name">THE MINE GATE’S</span>
        <span className="admin-brand__tag">Portal del staff</span>
      </span>
    </a>
  );
}

function Loading({ label }: { label: string }) {
  return (
    <div className="admin-loading" role="status" aria-live="polite">
      <span className="admin-loading__rune" aria-hidden="true">
        <RuneIcon variant="arcane" size={52} />
      </span>
      <span>{label}</span>
    </div>
  );
}

function ConfigWarning() {
  return (
    <section className="admin-card fd-panel admin-config">
      <span className="fd-eyebrow">Configuración pendiente</span>
      <h1 className="fd-title">La Puerta aún no está sellada</h1>
      <p>
        Faltan las variables de entorno de Supabase. El formulario público y
        este panel no podrán guardar ni leer solicitudes hasta que se definan
        al compilar la web:
      </p>
      <ul className="admin-config__list">
        <li>
          <code>VITE_SUPABASE_URL</code>
        </li>
        <li>
          <code>VITE_SUPABASE_ANON_KEY</code>
        </li>
      </ul>
      <p className="admin-config__note">
        Añádelas en un archivo <code>.env.local</code> para desarrollo y como
        secretos del repositorio para el despliegue.
      </p>
      <a className="fd-btn fd-btn--ghost" href="./">
        Volver a la web
      </a>
    </section>
  );
}

function describeAuthError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login")) {
    return "Correo o contraseña incorrectos.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Tu correo todavía no está confirmado en Supabase.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "Demasiados intentos. Espera un momento antes de volver a probar.";
  }
  return "No se pudo iniciar sesión. Comprueba tus credenciales e inténtalo de nuevo.";
}

function StaffLogin({
  onSignedIn,
}: {
  onSignedIn: (session: Session) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;

    setError(null);
    setSubmitting(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        console.error("Staff sign-in error:", signInError);
        setError(describeAuthError(signInError.message));
        return;
      }

      if (data.session) {
        onSignedIn(data.session);
      }
    } catch (signInFailure) {
      console.error("Staff sign-in unexpected error:", signInFailure);
      setError("No se pudo conectar con Supabase. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-card fd-panel admin-login">
      <div className="admin-login__seal" aria-hidden="true">
        <RuneIcon variant="holy" size={92} />
      </div>
      <span className="fd-eyebrow">Acceso restringido</span>
      <h1 className="fd-title admin-login__title">El Sello del Staff</h1>
      <p className="admin-login__intro">
        Inicia sesión con tu cuenta de Supabase para revisar las solicitudes de
        whitelist. Solo el staff autorizado puede leer esta página.
      </p>

      <form className="admin-login__form" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>Correo del staff</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="staff@theminegates.com"
          />
        </label>

        <label className="admin-field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />
        </label>

        {error ? (
          <p className="admin-alert" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="fd-btn fd-btn--fire admin-login__submit"
          disabled={submitting}
        >
          {submitting ? "Abriendo el sello…" : "Entrar al panel"}
        </button>
      </form>

      <p className="admin-login__note">
        No hay registro público. Las cuentas del staff se crean manualmente en
        Supabase Auth.
      </p>
    </section>
  );
}

function describeLoadError(error: { code?: string; message: string }): string {
  if (error.code === "42P01" || error.code === "PGRST205") {
    return "La tabla whitelist_applications todavía no existe. Ejecuta supabase/migrations/001_whitelist.sql en el SQL Editor de Supabase.";
  }
  if (error.code === "42501" || error.code === "PGRST301") {
    return "Tu cuenta no tiene permisos para leer las solicitudes. Revisa las políticas RLS y vuelve a iniciar sesión.";
  }
  return `No se pudieron cargar las solicitudes: ${error.message}`;
}

function Dashboard({ session }: { session: Session }) {
  const [applications, setApplications] = useState<WhitelistApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [query, setQuery] = useState("");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copiedTimer = useRef<number | null>(null);

  const load = useCallback(async (mode: "initial" | "refresh") => {
    if (!supabase) return;

    if (mode === "refresh") {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const { data, error: loadError } = await supabase
        .from("whitelist_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (loadError) {
        console.error("Whitelist load error:", loadError);
        setError(describeLoadError(loadError));
      } else {
        setApplications((data ?? []) as WhitelistApplication[]);
      }
    } catch (loadFailure) {
      console.error("Whitelist load unexpected error:", loadFailure);
      setError("No se pudieron cargar las solicitudes. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- initial remote fetch
    void load("initial");
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(
    () => () => {
      if (copiedTimer.current !== null) {
        window.clearTimeout(copiedTimer.current);
      }
    },
    [],
  );

  const counts = useMemo(
    () => ({
      all: applications.length,
      pending: applications.filter((item) => item.status === "pending").length,
      approved: applications.filter((item) => item.status === "approved").length,
      rejected: applications.filter((item) => item.status === "rejected").length,
    }),
    [applications],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesFilter =
        filter === "all" || application.status === filter;
      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      return (
        application.minecraft_username.toLowerCase().includes(normalizedQuery) ||
        application.real_name.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [applications, filter, query]);

  const review = async (
    application: WhitelistApplication,
    status: WhitelistStatus,
  ) => {
    if (!supabase) return;

    setReviewingId(application.id);
    setError(null);
    setNotice(null);

    try {
      const { data, error: reviewError } = await supabase
        .from("whitelist_applications")
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: session.user.id,
        })
        .eq("id", application.id)
        .select()
        .single();

      if (reviewError) {
        console.error("Whitelist review error:", reviewError);
        setError(
          "No se pudo guardar la revisión. Comprueba tu sesión y las políticas RLS.",
        );
        return;
      }

      if (data) {
        setApplications((current) =>
          current.map((item) =>
            item.id === application.id
              ? (data as WhitelistApplication)
              : item,
          ),
        );
      }

      setNotice(
        status === "approved"
          ? `Solicitud de ${application.minecraft_username} aprobada. Copia el comando y ejecútalo en la consola.`
          : `Solicitud de ${application.minecraft_username} rechazada.`,
      );
    } catch (reviewFailure) {
      console.error("Whitelist review unexpected error:", reviewFailure);
      setError("No se pudo guardar la revisión. Inténtalo de nuevo.");
    } finally {
      setReviewingId(null);
    }
  };

  const copyCommand = async (application: WhitelistApplication) => {
    const command = `whitelist add ${application.minecraft_username}`;
    const copied = await copyText(command);

    if (!copied) {
      setError(
        "No se pudo copiar el comando. Copia manualmente: " + command,
      );
      return;
    }

    setError(null);
    setNotice(`Comando copiado: ${command}`);
    setCopiedId(application.id);

    if (copiedTimer.current !== null) {
      window.clearTimeout(copiedTimer.current);
    }
    copiedTimer.current = window.setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section className="admin-dashboard" aria-labelledby="admin-title">
      <div className="admin-dashboard__heading">
        <div>
          <span className="fd-eyebrow">Registro de la Puerta</span>
          <h1 id="admin-title" className="fd-title admin-dashboard__title">
            Solicitudes de whitelist
          </h1>
          <p>
            Revisa cada solicitud manualmente. Al aprobar, copia el comando y
            ejecútalo en la consola del servidor: la web nunca modifica la
            whitelist por sí sola.
          </p>
        </div>
        <button
          type="button"
          className="fd-btn fd-btn--ghost admin-refresh"
          onClick={() => void load("refresh")}
          disabled={refreshing}
        >
          {refreshing ? "Actualizando…" : "Actualizar"}
        </button>
      </div>

      <div className="admin-stats">
        <article
          className={`admin-stat admin-stat--pending${counts.pending > 0 ? " is-hot" : ""}`}
        >
          <span className="admin-stat__value">{counts.pending}</span>
          <span className="admin-stat__label">Pendientes</span>
        </article>
        <article className="admin-stat admin-stat--approved">
          <span className="admin-stat__value">{counts.approved}</span>
          <span className="admin-stat__label">Aprobadas</span>
        </article>
        <article className="admin-stat admin-stat--rejected">
          <span className="admin-stat__value">{counts.rejected}</span>
          <span className="admin-stat__label">Rechazadas</span>
        </article>
        <article className="admin-stat admin-stat--all">
          <span className="admin-stat__value">{counts.all}</span>
          <span className="admin-stat__label">Totales</span>
        </article>
      </div>

      <div className="admin-toolbar fd-panel">
        <div className="admin-filters" role="group" aria-label="Filtrar por estado">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-filter${filter === item.id ? " is-active" : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span aria-hidden="true">{counts[item.id]}</span>
            </button>
          ))}
        </div>

        <label className="admin-search">
          <span className="admin-search__label">Buscar</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Usuario o nombre real…"
            autoComplete="off"
          />
        </label>
      </div>

      {notice ? (
        <p className="admin-notice" role="status" aria-live="polite">
          {notice}
        </p>
      ) : null}

      {error ? (
        <div className="admin-alert admin-alert--panel" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="admin-alert__retry"
            onClick={() => void load("refresh")}
          >
            Reintentar
          </button>
        </div>
      ) : null}

      {loading ? (
        <Loading label="Leyendo el registro…" />
      ) : filtered.length === 0 ? (
        <div className="admin-empty fd-panel">
          <span className="admin-empty__rune" aria-hidden="true">
            <RuneIcon variant="eldritch" size={72} />
          </span>
          <h2 className="fd-title admin-empty__title">
            {applications.length === 0
              ? "El registro está vacío"
              : "No hay solicitudes que coincidan"}
          </h2>
          <p>
            {applications.length === 0
              ? "Cuando alguien envíe el formulario de la landing, su solicitud aparecerá aquí."
              : "Prueba con otro estado o limpia la búsqueda."}
          </p>
          {query ? (
            <button
              type="button"
              className="fd-btn fd-btn--ghost"
              onClick={() => setQuery("")}
            >
              Limpiar búsqueda
            </button>
          ) : null}
        </div>
      ) : (
        <ul className="admin-list" aria-label="Solicitudes de whitelist">
          <li className="admin-list__head" aria-hidden="true">
            <span>Solicitante</span>
            <span>Estado y fecha</span>
            <span>Acciones</span>
          </li>

          {filtered.map((application) => {
            const isReviewing = reviewingId === application.id;
            const reviewed = application.status !== "pending";

            return (
              <li className="admin-row" key={application.id}>
                <div className="admin-row__identity">
                  <span className="admin-row__username">
                    {application.minecraft_username}
                  </span>
                  <span className="admin-row__real-name">
                    {application.real_name}
                  </span>
                </div>

                <div className="admin-row__meta">
                  <span
                    className={`admin-status admin-status--${application.status}`}
                  >
                    {WHITELIST_STATUS_LABELS[application.status]}
                  </span>
                  <time
                    className="admin-row__date"
                    dateTime={application.created_at}
                  >
                    Enviada el {formatWhitelistDate(application.created_at)}
                  </time>
                  {reviewed && application.reviewed_at ? (
                    <time
                      className="admin-row__date admin-row__date--reviewed"
                      dateTime={application.reviewed_at}
                    >
                      Revisada el {formatWhitelistDate(application.reviewed_at)}
                    </time>
                  ) : null}
                </div>

                <div className="admin-row__actions">
                  {application.status === "pending" ? (
                    <>
                      <button
                        type="button"
                        className="admin-action admin-action--approve"
                        onClick={() => void review(application, "approved")}
                        disabled={isReviewing}
                      >
                        {isReviewing ? "Guardando…" : "Aprobar"}
                      </button>
                      <button
                        type="button"
                        className="admin-action admin-action--reject"
                        onClick={() => void review(application, "rejected")}
                        disabled={isReviewing}
                      >
                        Rechazar
                      </button>
                    </>
                  ) : null}

                  <button
                    type="button"
                    className="admin-action admin-action--copy"
                    onClick={() => void copyCommand(application)}
                  >
                    {copiedId === application.id
                      ? "¡Copiado!"
                      : "Copiar comando"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(
    isSupabaseConfigured,
  );

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession(data.session);
        setCheckingSession(false);
      })
      .catch(() => {
        if (active) setCheckingSession(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <div className="admin-shell">
      <div className="admin-backdrop" aria-hidden="true" />

      <header className="admin-topbar">
        <Brand />
        <div className="admin-topbar__actions">
          <a className="admin-topbar__link" href="./">
            Ver la web
          </a>
          {session ? (
            <>
              <span
                className="admin-topbar__user"
                title={session.user.email ?? "Staff"}
              >
                {session.user.email ?? "Staff"}
              </span>
              <button
                type="button"
                className="fd-btn fd-btn--ghost admin-topbar__logout"
                onClick={() => void handleSignOut()}
              >
                Cerrar sesión
              </button>
            </>
          ) : null}
        </div>
      </header>

      <main className="admin-main">
        {!isSupabaseConfigured ? (
          <ConfigWarning />
        ) : checkingSession ? (
          <Loading label="Comprobando el sello…" />
        ) : session ? (
          <Dashboard session={session} />
        ) : (
          <StaffLogin onSignedIn={setSession} />
        )}
      </main>

      <footer className="admin-footer">
        <p>Acceso privado · Solo staff autorizado</p>
        <p>THE MINE GATE’S · Panel de whitelist</p>
      </footer>
    </div>
  );
}
