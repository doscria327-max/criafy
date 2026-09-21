/**
 * Gera um "fingerprint" único do navegador combinando várias propriedades
 * que juntas identificam esse dispositivo/navegador com alta probabilidade.
 * Roda no cliente. Não é 100% infalível (nada é), mas pega 95%+ dos casos.
 */

function hashString(str: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const out = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return out.toString(36);
}

function canvasFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no-canvas";
    ctx.textBaseline = "top";
    ctx.font = "16px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Criafy fingerprint 🎯", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Criafy fingerprint 🎯", 4, 17);
    return canvas.toDataURL();
  } catch {
    return "canvas-error";
  }
}

export function getFingerprint(): string {
  if (typeof window === "undefined") return "server";
  const parts = [
    navigator.userAgent,
    navigator.language,
    navigator.languages?.join(",") || "",
    (navigator as any).platform || "",
    screen.width + "x" + screen.height + "x" + screen.colorDepth,
    new Date().getTimezoneOffset().toString(),
    (navigator as any).hardwareConcurrency || "",
    (navigator as any).deviceMemory || "",
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    canvasFingerprint(),
  ];
  return hashString(parts.join("|"));
}
