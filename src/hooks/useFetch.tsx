import { useEffect, useState } from "react";
import api from "../services/api";

function useFetch(token: string, url: string) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setLoading(true);
    api.get(url, config)
        .then(response => setData(response.data))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, [token, url]);

  return {data, loading, error} as unknown
}

export default useFetch;
