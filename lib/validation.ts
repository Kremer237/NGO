export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value);
}

export function requireString(value: unknown, field: string, errors: FieldErrors): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors[field] = "required";
  }
}

export function requireTrue(value: unknown, field: string, errors: FieldErrors): void {
  if (value !== true && value !== "on" && value !== "true") {
    errors[field] = "required";
  }
}
