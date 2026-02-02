import axios from "axios";
import { useEffect, useState } from "react";

/* ---------- Axios instance (public) ---------- */
const publicAxios = axios.create({
  baseURL: "https://epi-qura-backend-server-red.vercel.app",
  timeout: 10000,
});

/* ---------- Reusable public data hook ---------- */
const usePublicData = (url, retryDelay = 2000) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await publicAxios.get(url);
        if (mounted) {
          setData(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Cold start retry:", url);

        // retry once (Vercel cold start fix)
        setTimeout(async () => {
          try {
            const retryRes = await publicAxios.get(url);
            if (mounted) {
              setData(retryRes.data);
              setLoading(false);
            }
          } catch (e) {
            if (mounted) {
              setError(e);
              setLoading(false);
            }
          }
        }, retryDelay);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url, retryDelay]);

  return { data, loading, error };
};

export default usePublicData;
