import { callToast } from 'main/utils/call-toast';

export const resolverError = (err: unknown, message?: string, optMessage?: string): void => {
  const error = err as { message: string };

  if (error?.message?.toLowerCase()?.includes('firebase') && !message && !optMessage) return;

  callToast.error(message ?? error?.message ?? optMessage);
};
