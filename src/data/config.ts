export const CONFIG = {
  siteName: "THE MINE GATE’S",
  serverIp: "play.theminegates.com",
  version: "1.20.1",
  status: "Servidor Online",
  discordUrl: "",
  profileUrl: "",
  storeUrl: "",
  supportUrl: "",
  modpackUrl:
    "https://www.curseforge.com/minecraft/modpacks/better-mc-forge-bmc4",
  curseforgeUrl: "https://www.curseforge.com/download/app",
  modrinthUrl: "https://modrinth.com/app",
  prismUrl: "https://prismlauncher.org/",
} as const;

export const MUSIC_CONFIG = {
  defaultVolume: 0.45,
  crossfadeSeconds: 2,
  enabledStorageKey: "mine-gates-music-enabled",
  volumeStorageKey: "mine-gates-music-volume",
} as const;

export type ConfigLinkKey =
  | "discordUrl"
  | "profileUrl"
  | "storeUrl"
  | "supportUrl";

export function isConfigured(url: string): boolean {
  return url.trim().length > 0;
}
