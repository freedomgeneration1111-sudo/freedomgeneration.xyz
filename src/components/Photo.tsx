import type { Locale } from "@/content/i18n";
import { media } from "@/content/media/registry";

const dims: Record<string, { w: number; h: number }> = {
  "16:9": { w: 1600, h: 900 },
  "4:3": { w: 1200, h: 900 },
  "3:2": { w: 1200, h: 800 },
  "4:5": { w: 1000, h: 1250 },
  "21:9": { w: 2100, h: 900 },
};

// Registry-driven figure. Captions are archival: 14px sans over a hairline rule,
// date set at the far end when the record carries one.
export function Photo({
  id,
  locale,
  priority = false,
  showCaption = true,
  className = "",
  imgClassName = "",
}: {
  id: string;
  locale: Locale;
  priority?: boolean;
  showCaption?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const m = media(id);
  const { w, h } = dims[m.orientation];
  const caption = showCaption ? m.caption?.[locale] : undefined;
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={m.file}
        alt={m.alt[locale]}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={`h-auto w-full object-cover ${imgClassName}`}
      />
      {caption && (
        <figcaption className="mt-2 flex items-baseline justify-between gap-4 border-t border-stone pt-2 font-sans text-sm text-ink/70">
          <span>{caption}</span>
          {m.date && <span className="shrink-0">{m.date}</span>}
        </figcaption>
      )}
    </figure>
  );
}
