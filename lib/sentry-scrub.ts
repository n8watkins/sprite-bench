// What sprite-bench.n8builds.dev sends to Sentry (lib/error-reporting.ts): the
// error, with emails and long tokens masked, and the page path. No user,
// request body, cookies, headers or query string, and no console output.
import type { Breadcrumb, ErrorEvent } from "@sentry/browser";

/** Masks emails and anything that looks like a key or token. */
export function safeMessage(message: string): string {
  return message
    .replace(/[^\s@"'<>]+@[^\s@"'<>]+/g, "[email]")
    .replace(/[A-Za-z0-9_\-.+/=]{24,}/g, "[redacted]")
    .slice(0, 300);
}

export function scrubEvent(event: ErrorEvent): ErrorEvent {
  delete event.user;
  if (event.request) {
    delete event.request.data;
    delete event.request.cookies;
    delete event.request.headers;
    delete event.request.query_string;
    if (event.request.url) event.request.url = withoutQuery(event.request.url);
  }
  if (event.message) event.message = safeMessage(event.message);
  for (const exception of event.exception?.values ?? []) {
    if (exception.value) exception.value = safeMessage(exception.value);
  }
  return event;
}

export function scrubBreadcrumb(breadcrumb: Breadcrumb): Breadcrumb | null {
  if (breadcrumb.category === "console") return null;
  const data = breadcrumb.data;
  if (data) {
    for (const key of ["url", "from", "to"] as const) {
      if (typeof data[key] === "string") data[key] = withoutQuery(data[key]);
    }
  }
  return breadcrumb;
}

function withoutQuery(url: string): string {
  return url.split(/[?#]/)[0] ?? "";
}
