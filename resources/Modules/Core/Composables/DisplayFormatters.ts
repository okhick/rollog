import { Camera } from "../@types";

export function useDisplayFormatters() {
  function formatCamera(camera: Camera | undefined) {
    if (!camera) return "";

    return `${camera.make} ${camera.model}`;
  }

  function formatPushPull(pushPull: number | undefined) {
    // this covers push_pull = 0
    if (!pushPull) return undefined;

    const sign = pushPull < 0;

    const stopSign = sign ? "+" : "-";
    const stopAbs = Math.abs(pushPull);
    const stopText = stopAbs > 1 ? "stops" : "stop";

    return `${stopSign}${stopAbs} ${stopText}`;
  }

  return {
    formatCamera,
    formatPushPull,
  };
}
