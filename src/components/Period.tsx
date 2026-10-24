const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "03/2025" -> "March 2025". Anything unparseable is returned untouched. */
const expandSingle = (token: string): string => {
  const match = token.match(/^(\d{1,2})\/(\d{4})$/);
  if (!match) return token;
  const month = MONTHS[Number(match[1]) - 1];
  return month ? `${month} ${match[2]}` : token;
};

/**
 * Renders a date range such as "03/2025 - Present" inside a `<time>` element,
 * expanding abbreviated months into readable names.
 *
 * `dateTime` carries the machine-readable value for each endpoint, so the
 * period stays semantically a date range rather than a string of text. Ranges
 * with an open end ("Present") intentionally have no second `dateTime`: there is
 * no end date to express.
 */
const Period = ({ period }: { period: string }) => {
  const [start, end] = period.split(/\s*[-–]\s*/);
  const readable = [expandSingle(start.trim()), end?.trim()]
    .filter(Boolean)
    .join(" – ");

  // Only emit a machine-readable value when it is unambiguous.
  const toIso = (token: string): string | undefined => {
    const match = token.trim().match(/^(\d{1,2})\/(\d{4})$/);
    if (!match) return undefined;
    return `${match[2]}-${String(match[1]).padStart(2, "0")}`;
  };

  const dateTime = end ? [toIso(start), toIso(end)].filter(Boolean).join("/") : toIso(start);

  return (
    <time dateTime={dateTime} title={readable}>
      {readable}
    </time>
  );
};

export default Period;