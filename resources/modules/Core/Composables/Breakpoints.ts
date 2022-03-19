import { computed, onUnmounted, ref } from "vue";

const TABLET = 769;
const DESKTOP = 1024;
const WIDESCREEN = 1216;
const FULLSCREEN = 1480;

export function useBreakpoints() {
  const width = ref(window.innerWidth);

  window.addEventListener("resize", () => (width.value = window.innerWidth));

  onUnmounted(() => window.removeEventListener("resize", () => null));

  const currentBreakpoint = computed(() => {
    if (width.value < TABLET) return "mobile";
    if (width.value < DESKTOP) return "table";
    if (width.value < WIDESCREEN) return "desktop";
    if (width.value < FULLSCREEN) return "widescreen";
    if (width.value >= FULLSCREEN) return "fullscreen";
  });

  return { currentBreakpoint };
}
