import { useEffect, useState } from "react";
import api from "../services/api";
import { FilterSpecies } from "../types/types";

function useSpecies(props: FilterSpecies) {
  const [species, setSpecies] = useState();
  const [loadingSpecies, setLoadingSpecies] = useState(false);
  const [errorSpecies, setErrorSpecies] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  useEffect(() => {
    setLoadingSpecies(true);
    api
      .get(
        `/species?${
          props.projectId !== 0 && props.projectId !== undefined
            ? `project=${props.projectId}&`
            : ""
        }${
          props.status !== "" && props.status !== undefined
            ? `status=${props.status}&`
            : ""
        }${
          props.name !== "" && props.name !== undefined
            ? `name=${props.name}&`
            : ""
        }${
          props.location !== "" && props.location !== undefined
            ? `location=${props.location}&`
            : ""
        }`,
        config
      )
      .then((response) => setSpecies(response.data))
      .catch((error) => setErrorSpecies(error))
      .finally(() => setLoadingSpecies(false));
  }, [props.token, props.projectId, props.status, props.location, props.name]);

  return { species, loadingSpecies, errorSpecies } as unknown;
}

export default useSpecies;
