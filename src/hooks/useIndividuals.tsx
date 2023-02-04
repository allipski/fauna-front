import { useEffect, useState } from "react";
import api from "../services/api";

function useIndividuals(props: {
  token: string;
  speciesId?: number;
  rehab?: boolean;
  released?: boolean;
}) {
  const [individuals, setIndividuals] = useState();
  const [loadingIndividuals, setLoadingIndividuals] = useState(false);
  const [errorIndividuals, setErrorIndividuals] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  useEffect(() => {
    setLoadingIndividuals(true);
    api
      .get(
        `/individuals?${props.speciesId ? `species=${props.speciesId}&` : ""}${
          props.rehab !== undefined ? `rehab=${props.rehab}&` : ""
        }${props.released !== undefined ? `released=${props.released}&` : ""}`,
        config
      )
      .then((response) => setIndividuals(response.data))
      .catch((error) => setErrorIndividuals(error))
      .finally(() => setLoadingIndividuals(false));
  }, [props.token, props.rehab, props.released, props.speciesId]);

  return { individuals, loadingIndividuals, errorIndividuals } as unknown;
}

export default useIndividuals;
