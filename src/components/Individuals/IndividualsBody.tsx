import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { OrganizationContext } from "../../contexts/organizationContext";
import IndividualCard from "./IndividualCard";
import useSpecies from "../../hooks/useSpecies";
import {
  SpeciesFetch,
  ProjectFetch,
  FilterIndividuals,
  IndividualsFetch,
} from "../../types/types";
import { SessionType } from "../../contexts/organizationContext";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import useFetch from "../../hooks/useFetch";
import useIndividuals from "../../hooks/useIndividuals";

export default function SpeciesBody() {
  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;

  const [filterParams, setFilterParams] = useState<FilterIndividuals>({
    token: session.token,
  });

  const navigate = useNavigate();
  const { species, loadingSpecies } = useSpecies({
    token: session.token,
  }) as SpeciesFetch;

  const { individuals, loadingIndividuals } = useIndividuals(
    filterParams
  ) as IndividualsFetch;

  const filterDataIndividuals = useIndividuals({
    token: session.token,
  }) as IndividualsFetch;

  const filterDataSpecies = useSpecies({
    token: session.token,
  }) as SpeciesFetch;

  const [data, setData] = useState("");

  useEffect(() => {
    if (!session.organization) {
      if (getFromLocalStorage()) {
        setSession(getFromLocalStorage());
      } else {
        toast("Sua sessão expirou! Por favor, faça o login novamente.");
        navigate("/");
      }
    }
  }, [session]);

  const { register, handleSubmit, reset } = useForm<FilterIndividuals>();

  const onSubmit = handleSubmit(async (data) => {
    setData("loading");
    setFilterParams({
      token: session.token,
      individualName: data.individualName,
      geocode: data.geocode,
      speciesName: data.speciesName,
      projectId: Number(data.projectId),
      age: [0, 12],
      location: data.location,
      gender: data.gender,
      onRehab: data.onRehab,
      natureReady: data.natureReady,
      releaseDate: data.releaseDate,
      captureDate: data.captureDate,
      monitorInterval: data.monitorInterval,
      lastMonitorDate: data.lastMonitorDate,
      healthStatus: data.healthStatus,
    });
    setData("");
    if (filterParams) {
      setData("success");
      reset();
    }
  });

  const projects = useFetch(session.token, "/projects") as ProjectFetch;

  return (
    <Wrapper>
      <FilterSidebar>
        <h1>Filtrar por:</h1>
        <form onSubmit={onSubmit}>
          <select
            disabled={data === "loading" ? true : false}
            {...register("speciesName")}
          >
            <option value="" defaultValue={""}>
              [ nome da espécie ]
            </option>
            {filterDataSpecies.loadingSpecies
              ? null
              : filterDataSpecies.species
              ? [
                  ...new Set(
                    filterDataSpecies.species?.map((item) => item.name)
                  ),
                ].map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              : null}
          </select>

          <select
            disabled={data === "loading" ? true : false}
            {...register("projectId")}
          >
            <option value={Number(0)} defaultValue={Number(0)}>
              [ projeto ]
            </option>
            {projects.loading
              ? null
              : projects.data
              ? projects.data?.map((item, index) => (
                  <option key={index} value={Number(item.id)}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>

          <select
            disabled={data === "loading" ? true : false}
            {...register("location")}
          >
            <option value="" defaultValue={""}>
              [ área de abrangência ]
            </option>
            {filterDataSpecies.loadingSpecies
              ? null
              : filterDataSpecies.species
              ? [
                  ...new Set(
                    filterDataSpecies.species?.map((item) => item.location)
                  ),
                ].map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              : null}
          </select>

          <select
            disabled={data === "loading" ? true : false}
            {...register("gender")}
          >
            <option value="" defaultValue={""}>
              [ sexo ]
            </option>
            <option value={"Fêmea"}>Fêmea</option>
            <option value={"Macho"}>Macho</option>
          </select>

          <select
            disabled={data === "loading" ? true : false}
            {...register("healthStatus")}
          >
            <option value="" defaultValue={""}>
              [ status de saúde ]
            </option>
            <option value={"Saudável"}>Saudável</option>
            <option value={"Em observação"}>Em observação</option>
            <option value={"Preocupante"}>Preocupante</option>
          </select>

          {/* <ButtonBox>
            <input type="button" value={"Sob cuidado"} {...register("onRehab")} />
            <input type="button" value={"Solto"} />
          </ButtonBox> */}

          {/* <Checkbox>
            <input type="checkbox" />
            <h2>Pronto para soltura</h2>
          </Checkbox> */}
          
          <button>Aplicar filtros</button>
        </form>
      </FilterSidebar>
      <CardsContainer>
        {loadingIndividuals ? (
          <ReactLoading type="spinningBubbles" />
        ) : individuals ? (
          individuals?.map((item, index) => (
            <IndividualCard key={index} individual={item} />
          ))
        ) : null}
      </CardsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding: 70px 15% 30px 15%;
  position: relative;
`;

const FilterSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 7px;
  width: 220px;
  height: fit-content;
  background-color: #fcfbf6;
  padding: 20px;
  position: fixed;
  border-radius: 5px;
  border: solid 1px #606c38;
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;

  h1 {
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    line-height: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 7px;

    button {
      border: none;
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 10px;
      width: 100%;
      background-color: #606c38;
      color: #fefae0;
    }

    button:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }

  select {
    width: 100%;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #fcfbf6;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding-left: 230px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  font-family: "Lato", sans-serif;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    padding: 5px 10px;
  }
`;
