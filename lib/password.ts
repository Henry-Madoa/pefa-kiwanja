// Shared password policy — used by the client strength meter AND enforced
// server-side, so the rules can never drift apart. Pure & isomorphic.

export type PasswordRule = { id: string; label: string; ok: boolean };

export type PasswordResult = {
  rules: PasswordRule[];
  score: number; // 0–5 core criteria met
  valid: boolean; // all rules pass
  label: "Empty" | "Weak" | "Fair" | "Good" | "Strong";
};

function containsIdentity(pw: string, identity: { name?: string; email?: string }): boolean {
  const lower = pw.toLowerCase();
  const parts: string[] = [];
  const name = (identity.name || "").trim().toLowerCase();
  if (name.length >= 3) parts.push(name);
  const email = (identity.email || "").trim().toLowerCase();
  if (email.length >= 3) {
    parts.push(email);
    const local = email.split("@")[0];
    if (local.length >= 3) parts.push(local);
  }
  return parts.some((p) => p && lower.includes(p));
}

export function checkPassword(
  password: string,
  identity: { name?: string; email?: string } = {}
): PasswordResult {
  const core: PasswordRule[] = [
    { id: "length", label: "At least 8 characters", ok: password.length >= 8 },
    { id: "upper", label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { id: "lower", label: "One lowercase letter", ok: /[a-z]/.test(password) },
    { id: "number", label: "One number", ok: /[0-9]/.test(password) },
    { id: "special", label: "One special character", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const identityOk = password.length === 0 ? false : !containsIdentity(password, identity);
  const rules: PasswordRule[] = [
    ...core,
    { id: "identity", label: "Doesn't contain your name or email", ok: identityOk },
  ];

  const score = core.filter((r) => r.ok).length;
  const valid = rules.every((r) => r.ok);

  let label: PasswordResult["label"] = "Empty";
  if (password.length > 0) {
    if (!identityOk || score <= 2) label = "Weak";
    else if (score === 3) label = "Fair";
    else if (score === 4) label = "Good";
    else label = "Strong";
  }

  return { rules, score, valid, label };
}

// Server-side assertion. Throws with the first failing rule's message.
export function assertValidPassword(
  password: string,
  identity: { name?: string; email?: string } = {}
): void {
  const { rules, valid } = checkPassword(password, identity);
  if (!valid) {
    const failed = rules.find((r) => !r.ok);
    throw new Error(`Password does not meet requirements: ${failed?.label}.`);
  }
}
