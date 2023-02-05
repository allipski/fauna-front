import { useEffect, useState } from "react";
import api from "../services/api";
import { FilterIndividuals } from "../types/types";

function useIndividuals(props: FilterIndividuals) {
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
        `/individuals?${
          props.speciesName !== "" && props.speciesName !== undefined
            ? `speciesName=${props.speciesName}&`
            : ""
        }${
          props.speciesId !== 0 && props.speciesId !== undefined
            ? `species=${props.speciesName}&`
            : ""
        }${
          props.projectId !== 0 && props.projectId !== undefined
            ? `project=${props.projectId}&`
            : ""
        }${
          props.location !== "" && props.location !== undefined
            ? `location=${props.location}&`
            : ""
        }${
          props.gender !== "" && props.gender !== undefined
            ? `gender=${props.gender}&`
            : ""
        }${
          props.healthStatus !== "" && props.healthStatus !== undefined
            ? `health=${props.healthStatus}&`
            : ""
        }${props.onRehab !== undefined ? `rehab=${props.onRehab}&` : ""}${
          props.released !== undefined ? `released=${props.released}&` : ""
        }`,
        config
      )
      .then((response) => setIndividuals(response.data))
      .catch((error) => setErrorIndividuals(error))
      .finally(() => setLoadingIndividuals(false));
  }, [
    props.token,
    props.onRehab,
    props.released,
    props.speciesId,
    props.speciesName,
    props.healthStatus,
    props.gender,
    props.location,
  ]);

  return { individuals, loadingIndividuals, errorIndividuals } as unknown;
}

export default useIndividuals;
