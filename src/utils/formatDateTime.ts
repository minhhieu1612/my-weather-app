const DEFAULT_LOCALE = 'en-US';

export const getFormattedLocaleDate = (date?: string | number | Date) =>
  (date !== undefined ? new Date(date) : new Date()).toLocaleDateString(
    DEFAULT_LOCALE,
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

export const getFormattedLocaleTime = (time?: string | number | Date) =>
  (time !== undefined ? new Date(time) : new Date()).toLocaleTimeString(
    DEFAULT_LOCALE,
    {
      hour: '2-digit',
      minute: 'numeric',
    }
  );
