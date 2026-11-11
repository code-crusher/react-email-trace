import { afterEach, beforeEach } from 'vitest';
import { createDebouncedCallback } from './create-debounced-callback.js';

describe('createDebouncedCallback()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('only calls the callback once the delay elapses', () => {
    const callback = vi.fn();
    const debounced = createDebouncedCallback(callback, 150);

    debounced();

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(149);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('batches calls that arrive within the delay into a single call', () => {
    const callback = vi.fn();
    const debounced = createDebouncedCallback(callback, 150);

    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(100);
    debounced();

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(150);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls the callback again for calls after it has run', () => {
    const callback = vi.fn();
    const debounced = createDebouncedCallback(callback, 150);

    debounced();
    vi.advanceTimersByTime(150);
    expect(callback).toHaveBeenCalledTimes(1);

    debounced();
    vi.advanceTimersByTime(150);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
