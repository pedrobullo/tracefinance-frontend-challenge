import { COOKIE_OPTIONS } from "@/constants/cookies";

interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === "undefined") {
    return;
  }

  const {
    maxAge = COOKIE_OPTIONS.MAX_AGE,
    path = COOKIE_OPTIONS.PATH,
    domain,
    secure,
    sameSite = COOKIE_OPTIONS.SAME_SITE,
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (maxAge) {
    cookieString += `; max-age=${maxAge}`;
  }

  if (path) {
    cookieString += `; path=${path}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += "; secure";
  }

  if (sameSite) {
    cookieString += `; samesite=${sameSite}`;
  }

  document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  const nameEQ = `${encodeURIComponent(name)}=`;

  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookieItem = cookies[i];

    if (!cookieItem) continue;

    let cookie = cookieItem;

    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

export function deleteCookie(
  name: string,
  options: Pick<CookieOptions, "path" | "domain"> = {}
): void {
  setCookie(name, "", { ...options, maxAge: -1 });
}
