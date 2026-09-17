import { reportError } from "./error-reporting";

export function reportLegacyError(error: unknown, context: Record<string, unknown> = {}) {
  reportError(error, context);
}
