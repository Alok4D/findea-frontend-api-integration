export function setCookie(name: string, value: string, days?: number) {
  if (typeof document === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const isHttps = window.location.protocol === "https:";
  const secureFlag = isHttps ? "; Secure" : "";

  document.cookie =
    name +
    "=" +
    (value || "") +
    expires +
    "; path=/; SameSite=Strict" + secureFlag;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  if (typeof document === "undefined") return;
  const isHttps = window.location.protocol === "https:";
  const secureFlag = isHttps ? "; Secure" : "";

  document.cookie =
    name +
    "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict" + secureFlag;
}
