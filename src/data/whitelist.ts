export type WhitelistStatus = "pending" | "approved" | "rejected";

export interface WhitelistApplication {
  id: string;
  minecraft_username: string;
  real_name: string;
  status: WhitelistStatus;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

export const WHITELIST_STATUS_LABELS: Record<WhitelistStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
};

export const MINECRAFT_USERNAME_PATTERN = /^[A-Za-z0-9_]{3,16}$/;

export function validateMinecraftUsername(value: string): string | null {
  const username = value.trim();
  if (!username) return "Escribe tu usuario de Minecraft.";
  if (!MINECRAFT_USERNAME_PATTERN.test(username)) {
    return "El usuario debe tener entre 3 y 16 caracteres: letras, números o _.";
  }
  return null;
}

export function validateRealName(value: string): string | null {
  const name = value.trim();
  if (!name) return "Escribe tu nombre real.";
  if (name.length < 2) return "El nombre es demasiado corto.";
  if (name.length > 80) return "El nombre es demasiado largo.";
  return null;
}

export function formatWhitelistDate(value: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
