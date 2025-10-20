import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useApiMutation } from './useApiMutation';

describe('useApiMutation', () => {
  it('should handle successful mutation', async () => {
    const mockData = { id: '123', name: 'Test' };
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useApiMutation(mutationFn));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await act(async () => {
      await result.current.mutate({});
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mutationFn).toHaveBeenCalledTimes(1);
  });

  it('should handle mutation error', async () => {
    const errorMessage = 'Network error';
    const mutationFn = vi.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useApiMutation(mutationFn));

    await act(async () => {
      try {
        await result.current.mutate({});
      } catch (err) {
        console.error(err);
        // Expected to throw
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe(null);
    });
  });

  it('should call onSuccess callback', async () => {
    const mockData = { id: '456' };
    const mutationFn = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    const { result } = renderHook(() =>
      useApiMutation(mutationFn, { onSuccess })
    );

    await act(async () => {
      await result.current.mutate({});
    });

    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it('should reset state', async () => {
    const mockData = { id: '789' };
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useApiMutation(mutationFn));

    await act(async () => {
      await result.current.mutate({});
    });

    expect(result.current.data).toEqual(mockData);

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });
});

