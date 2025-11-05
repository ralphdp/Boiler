"use client";

import { useEffect, useRef, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollRestorationProps {
  children: React.ReactNode;
}

function ScrollRestorationInner({ children }: ScrollRestorationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollPositions = useRef<Map<string, ScrollPosition>>(new Map());
  const isInitialLoad = useRef(true);
  const isNavigating = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create a unique key for the current page
  const currentPageKey = `${pathname}${searchParams.toString()}`;

  // Debounced scroll position saving (optimized: increased debounce time)
  const saveScrollPosition = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Increased debounce from 100ms to 250ms to reduce writes
    scrollTimeoutRef.current = setTimeout(() => {
      const currentPosition: ScrollPosition = {
        x: window.scrollX,
        y: window.scrollY,
      };
      scrollPositions.current.set(currentPageKey, currentPosition);
    }, 250);
  }, [currentPageKey]);

  useEffect(() => {
    // Handle initial page load - always scroll to top
    if (isInitialLoad.current) {
      // Force scroll to top immediately and after a short delay to ensure it sticks
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });

      // Additional safety check after a short delay
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 100);

      isInitialLoad.current = false;
      return;
    }

    // Handle navigation between pages
    if (isNavigating.current) {
      // Restore scroll position if it exists
      const savedPosition = scrollPositions.current.get(currentPageKey);
      if (savedPosition) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedPosition.y,
            left: savedPosition.x,
            behavior: "instant",
          });
        });
      } else {
        // New page, scroll to top
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        });
      }
      isNavigating.current = false;
    }
  }, [pathname, searchParams, currentPageKey]);

  // Save scroll position before navigation (optimized with cleanup)
  useEffect(() => {
    const handleScroll = () => {
      // Debounced scroll handler
      saveScrollPosition();
    };

    const handleBeforeUnload = () => {
      const currentPosition: ScrollPosition = {
        x: window.scrollX,
        y: window.scrollY,
      };
      scrollPositions.current.set(currentPageKey, currentPosition);
    };

    const handlePopState = () => {
      isNavigating.current = true;
    };

    // Use passive scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentPageKey, saveScrollPosition]);

  // Handle programmatic navigation (Link clicks, router.push, etc.)
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && !link.target && !link.download) {
        // Check if it's an internal link
        try {
          const url = new URL(link.href);
          if (url.origin === window.location.origin) {
            // Save current scroll position before navigation
            const currentPosition: ScrollPosition = {
              x: window.scrollX,
              y: window.scrollY,
            };
            scrollPositions.current.set(currentPageKey, currentPosition);

            // Mark as navigating
            isNavigating.current = true;
          }
        } catch (e) {
          // Invalid URL, ignore
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [currentPageKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}

export function ScrollRestoration({ children }: ScrollRestorationProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <ScrollRestorationInner>{children}</ScrollRestorationInner>
    </Suspense>
  );
}
