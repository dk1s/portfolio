export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult =
  | { ok: true; provider: "formspree" | "web3forms" | "mailto" }
  | { ok: false; error: string };

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim();
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * True when a real inbox-backed endpoint is configured. When it is false the
 * form falls back to opening the visitor's mail client, so a message is never
 * silently dropped.
 */
export const isFormConfigured = Boolean(FORMSPREE_ENDPOINT || WEB3FORMS_KEY);

export const activeProvider = FORMSPREE_ENDPOINT
  ? "Formspree"
  : WEB3FORMS_KEY
    ? "Web3Forms"
    : "your email client";

const buildMailtoUrl = (payload: ContactPayload, recipient: string) => {
  const body = `${payload.message}\n\n—\n${payload.name}\n${payload.email}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(
    payload.subject
  )}&body=${encodeURIComponent(body)}`;
};

const post = async (url: string, body: unknown): Promise<Response> =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

export const sendContactMessage = async (
  payload: ContactPayload,
  recipient: string
): Promise<ContactResult> => {
  // No endpoint configured: hand off to the visitor's mail app rather than
  // pretending a message was delivered.
  if (!isFormConfigured) {
    window.location.href = buildMailtoUrl(payload, recipient);
    return { ok: true, provider: "mailto" };
  }

  try {
    if (FORMSPREE_ENDPOINT) {
      const response = await post(FORMSPREE_ENDPOINT, payload);
      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }
      return { ok: true, provider: "formspree" };
    }

    const response = await post(WEB3FORMS_ENDPOINT, {
      access_key: WEB3FORMS_KEY,
      from_name: "Portfolio contact form",
      subject: payload.subject,
      ...payload,
      // Web3Forms rejects submissions that trip this honeypot field
      botcheck: "",
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || data?.success === false) {
      throw new Error(data?.message || `Web3Forms responded with ${response.status}`);
    }

    return { ok: true, provider: "web3forms" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong while sending.";
    return { ok: false, error: message };
  }
};
