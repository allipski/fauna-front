import { useEffect, useState } from "react";
import api from "../services/api";

function useSpecies(token: string, projectId?: number) {
    const [species, setSpecies] = useState();
    const [loadingSpecies, setLoadingSpecies] = useState(false);
    const [errorSpecies, setErrorSpecies] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setLoadingSpecies(true);
    api.get(`${projectId ? `/species/?project=${projectId}` : 'species'}`, config)
        .then(response => setSpecies(response.data))
        .catch(error => setErrorSpecies(error))
        .finally(() => setLoadingSpecies(false));
  }, [token]);

  return {species, loadingSpecies, errorSpecies} as unknown
}

export default useSpecies;
