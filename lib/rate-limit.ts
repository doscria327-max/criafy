import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Login: 5 tentativas por 15 minutos por IP
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: false,
  prefix: "criafy:login",
});

// Signup: 3 por hora por IP
export const signupRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: false,
  prefix: "criafy:signup",
});

// Recuperação de senha: 3 por hora por email
export const recoveryRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: false,
  prefix: "criafy:recovery",
});

export function extrairIP(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-vercel-forwarded-for") ||
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "0.0.0.0"
  );
}
