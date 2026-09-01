import type { Locale } from "@/content/i18n";
import { ui } from "@/content/i18n";

// The signature mark of the site: a progress bar that gives the visual weight
// to what REMAINS. The done segment is quiet solid green; the unfinished
// segment is hatched and carries its own label. All values are real HTML.
export function Progress({ percent, locale }: { percent: number; locale: Locale }) {
  const remaining = 100 - percent;
  return (
    <div>
      <div
        role="img"
        aria-label={`${percent}% ${ui.labels.complete[locale]}, ${remaining}% ${ui.labels.remains[locale]}`}
        className="flex h-5 w-full border border-stone"
      >
        <div className="h-full bg-green" style={{ width: `${percent}%` }} />
        <div className="remains-hatch h-full flex-1" />
      </div>
      <div className="mt-2 flex items-baseline justify-between font-sans text-sm">
        <span className="text-green">
          {percent}% {ui.labels.complete[locale]}
        </span>
        <span className="font-medium text-ink">
          {remaining}% {ui.labels.remains[locale]}
        </span>
      </div>
    </div>
  );
}
