import { useState, useEffect } from "react";

export const useFetchData = <TRes extends unknown>(
  fetchFn: () => Promise<TRes>
) => {
  const [data, setData] = useState<TRes | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFn()
      .then((data) => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, isLoading, error };
};
