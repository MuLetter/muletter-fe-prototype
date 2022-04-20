function createWheelStopListener(
  element: HTMLDivElement,
  callback: (e: React.WheelEvent) => void,
  timeout: number
) {
  var handle: any = null;
  var onScroll = function (e: React.WheelEvent) {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(() => callback(e), timeout || 200);
  };
  element.addEventListener("wheel", onScroll as any);
  return function () {
    element.removeEventListener("wheel", onScroll as any);
  };
}

export default createWheelStopListener;
