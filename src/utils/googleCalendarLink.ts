// Builds a "Add to Google Calendar" URL. Times are local to Seattle; events without a
// start time become all-day entries (Google treats the end date as exclusive).

export interface CalendarEventInput {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, 24-hour. Omit for an all-day entry. */
  startTime?: string;
  /** HH:MM, 24-hour. Defaults to one hour after startTime. */
  endTime?: string;
  location?: string;
  details?: string;
}

const TIMEZONE = 'America/Los_Angeles';

const compactDate = (date: string): string => date.replace(/-/g, '');

const compactDateTime = (date: string, time: string): string => `${compactDate(date)}T${time.replace(':', '')}00`;

const addHour = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  return `${String((hours + 1) % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const nextDay = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
};

export const googleCalendarLink = (event: CalendarEventInput): string => {
  const dates = event.startTime
    ? `${compactDateTime(event.date, event.startTime)}/${compactDateTime(event.date, event.endTime ?? addHour(event.startTime))}`
    : `${compactDate(event.date)}/${compactDate(nextDay(event.date))}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates,
    ctz: TIMEZONE
  });
  if (event.details) params.set('details', event.details);
  if (event.location) params.set('location', event.location);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
