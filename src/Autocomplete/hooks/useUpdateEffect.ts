import { useEffect, useRef } from 'react';

export const useUpdateEffect = (effect: () => void, deps: unknown[] = []) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
}
