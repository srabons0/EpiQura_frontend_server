import axios from "axios";
import { useEffect, useRef, useState } from "react";

const publicAxios = axios.create({
  baseURL: "https://epi-qura-backend-server-red.vercel.app",
  timeout: 10000,
});

const useFetchOnView = (url, options = {}) => {
  const {
    threshold = 0.3,
    rootMargin = "0px",
    repeat = true, // call again every time it appears
  } = options;

  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loading) return;

        setLoading(true);

        try {
          const res = await publicAxios.get(url);
          if (mounted) setData(res.data);
        } catch (err) {
          if (mounted) setError(err);
        } finally {
          if (mounted) setLoading(false);
        }

        if (!repeat && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      mounted = false;
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [url, threshold, rootMargin, repeat, loading]);

  return { ref, data, loading, error };
};

export default useFetchOnView;
