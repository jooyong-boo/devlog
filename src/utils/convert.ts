interface DateTimeFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
}

interface DateFormatOptions {
  includeYear?: boolean;
  includeTime?: boolean;
  format?: 'short' | 'full';
}

export function formatDate(
  dateString?: string,
  options: DateFormatOptions = {},
): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const dateKo = new Date(date.setHours(date.getHours()));

  const year = dateKo.getFullYear();
  const month = String(dateKo.getMonth() + 1).padStart(2, '0');
  const day = String(dateKo.getDate()).padStart(2, '0');
  const weekday = new Intl.DateTimeFormat('ko', { weekday: 'short' }).format(
    dateKo,
  );

  const timeOptions: DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const time = new Intl.DateTimeFormat('ko', timeOptions).format(dateKo);

  let result = '';

  if (options.format === 'full' || options.includeYear) {
    result += `${year}. `;
  }

  result += `${month}. ${day} (${weekday})`;

  if (options.includeTime) {
    result += ` ${time}`;
  }

  return result;
}
