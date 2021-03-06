import { Camera, Lens } from "../@types";

export function useDisplayFormatters() {
  function formatCamera(camera: Camera | undefined) {
    if (!camera) return "";

    return `${camera.make} ${camera.model}`;
  }

  function formatLens(lens: Lens | undefined) {
    if (!lens) return "";

    return `${lens.make} ${lens.model} \u0192${lens.minimum_aperture}\u2013${lens.maximum_aperture}`;
  }

  function formatPushPull(pushPull: number | undefined) {
    // this covers pushpull = 0
    if (!pushPull) return undefined;

    const sign = pushPull > 0;

    const stopSign = sign ? "+" : "-";
    const stopAbs = Math.abs(pushPull);
    const stopText = stopAbs > 1 ? "stops" : "stop";

    return `${stopSign}${stopAbs} ${stopText}`;
  }

  function formatExposureTime(time: number | string) {
    if (isNaN(Number(time)) && typeof time === "string") return time;

    return `<sup>1</sup>&frasl;<sub>${time}</sub>`;
  }

  return {
    formatCamera,
    formatLens,
    formatPushPull,
    formatExposureTime,
  };
}
