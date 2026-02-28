import { useEffect, useRef, useState } from "react";

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
  const preloadingIndexesRef = useRef<Set<number>>(new Set());
  const pendingCallbacksRef = useRef<Map<number, Array<() => void>>>(new Map());
  const preloadTimeoutsRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    if (!images.length) {
      return;
    }

    preloadTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    preloadTimeoutsRef.current.clear();
    preloadingIndexesRef.current.clear();
    pendingCallbacksRef.current.clear();

    setIndex(0);
    setLoadedIndexes(new Set([0]));
    setIsSwitching(false);
  }, [images]);

  useEffect(() => {
    return () => {
      preloadTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      preloadTimeoutsRef.current.clear();
      preloadingIndexesRef.current.clear();
      pendingCallbacksRef.current.clear();
    };
  }, []);

  function markLoaded(imageIndex: number) {
    setLoadedIndexes((previous) => {
      if (previous.has(imageIndex)) {
        return previous;
      }
      const next = new Set(previous);
      next.add(imageIndex);
      return next;
    });
  }

  function preloadImage(targetIndex: number, onDone?: () => void) {
    if (!images.length || targetIndex < 0 || targetIndex >= images.length) {
      return;
    }

    if (loadedIndexes.has(targetIndex)) {
      onDone?.();
      return;
    }

    if (preloadingIndexesRef.current.has(targetIndex)) {
      if (onDone) {
        const pending = pendingCallbacksRef.current.get(targetIndex) ?? [];
        pending.push(onDone);
        pendingCallbacksRef.current.set(targetIndex, pending);
      }
      return;
    }

    preloadingIndexesRef.current.add(targetIndex);
    pendingCallbacksRef.current.set(targetIndex, onDone ? [onDone] : []);

    const preload = new Image();
    preload.decoding = "async";
    preload.src = images[targetIndex].src;

    let finished = false;
    const done = () => {
      if (finished) {
        return;
      }
      finished = true;

      const timeoutId = preloadTimeoutsRef.current.get(targetIndex);
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
        preloadTimeoutsRef.current.delete(targetIndex);
      }

      preloadingIndexesRef.current.delete(targetIndex);
      markLoaded(targetIndex);

      const pending = pendingCallbacksRef.current.get(targetIndex) ?? [];
      pendingCallbacksRef.current.delete(targetIndex);
      pending.forEach((callback) => callback());
    };

    const timeoutId = window.setTimeout(done, 8000);
    preloadTimeoutsRef.current.set(targetIndex, timeoutId);

    preload.onload = done;
    preload.onerror = done;
  }

  useEffect(() => {
    if (!images.length || images.length === 1) {
      return;
    }

    const nextIndex = (index + 1) % images.length;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(() => preloadImage(nextIndex));
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => preloadImage(nextIndex), 300);
    return () => window.clearTimeout(timeoutId);
  }, [index, images, loadedIndexes]);

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
    preloadImage(targetIndex, () => {
      setIndex(targetIndex);
      setIsSwitching(false);
    });
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
