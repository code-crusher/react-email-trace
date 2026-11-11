/**
 * Returns a function that delays calling `callback` until `delay`
 * milliseconds have passed since the last time it was invoked.
 *
 * This is used to batch file system events into a single hot-reload
 * notification instead of sending one per changed file.
 */
export const createDebouncedCallback = (
  callback: () => void,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};
