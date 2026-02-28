import { useEffect, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  images: GalleryImage[];
  prevLabel: string;
  nextLabel: string;
  galleryLabel: string;
}

export default function ApartmentGallery({ images, prevLabel, nextLabel, galleryLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(() => new Set([0]));
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (!images.length) {
      return;
    }

    setIndex(0);
    setLoadedIndexes(new Set([0]));
    setIsSwitching(false);

    const preloads = images.map((image, imageIndex) => {
      const preload = new Image();
      preload.src = image.src;

      const markLoaded = () =>
        setLoadedIndexes((previous) => {
          if (previous.has(imageIndex)) {
            return previous;
          }
          const next = new Set(previous);
          next.add(imageIndex);
          return next;
        });

      preload.onload = markLoaded;
      preload.onerror = markLoaded;
      return preload;
    });

    return () => {
      preloads.forEach((preload) => {
        preload.onload = null;
        preload.onerror = null;
      });
    };
  }, [images]);

  function goTo(targetIndex: number) {
    if (!images.length) {
      return;
    }

    if (targetIndex === index) {
      return;
    }

    if (loadedIndexes.has(targetIndex)) {
      setIndex(targetIndex);
      setIsSwitching(false);
      return;
    }

    setIsSwitching(true);

    const preload = new Image();
    preload.src = images[targetIndex].src;

    const done = () => {
      setLoadedIndexes((previous) => {
        if (previous.has(targetIndex)) {
          return previous;
        }
        const next = new Set(previous);
        next.add(targetIndex);
        return next;
      });
      setIndex(targetIndex);
      setIsSwitching(false);
    };

    preload.onload = done;
    preload.onerror = done;
  }

  if (!images.length) {
    return null;
  }

  const current = images[index];

  return (
    <div className="space-y-3" aria-label={galleryLabel}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover object-center transition-opacity duration-200 ${isSwitching ? "opacity-85" : "opacity-100"}`}
        />
        {isSwitching && (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/70 via-card/50 to-muted/70"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo((index - 1 + images.length) % images.length)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={prevLabel}
          disabled={isSwitching}
        >
          {"\u2190"}
        </button>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={() => goTo((index + 1) % images.length)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={nextLabel}
          disabled={isSwitching}
        >
          {"\u2192"}
        </button>
      </div>
    </div>
  );
}
