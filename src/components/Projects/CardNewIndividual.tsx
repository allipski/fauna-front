import styled from "styled-components";
import panda from "../../assets/newproject.svg";
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from "react";
import { useForm } from "react-hook-form";
import {
  OrganizationContext,
  SessionType,
} from "../../contexts/organizationContext";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import {
  NewIndividualData,
  SpeciesList,
} from "../../types/types";
import { newIndividual } from "../../services/individualsApi";

export default function CardNewIndividual(props: {
  species: SpeciesList;
  loadingSpecies: boolean;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;

  const navigate = useNavigate();

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

  useEffect(() => {
    if(props.modal === false) {
      reset();
    }
  },[props.modal])

  const { register, handleSubmit, reset } = useForm<NewIndividualData>({
    defaultValues: {
      name: "",
      geocode: "",
      age: 0,
      gender: "",
      onRehab: true,
      natureReady: false,
      img: "",
      speciesId: 0,
    },
  });
  
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setData("loading");
    const newIndividualData = await newIndividual(session.token, data);
    setData(newIndividualData || "");
    if (newIndividualData) {
      setData("success");
      reset();
    }
  });

  function Loading() {
    if (data === "loading") {
      return <ReactLoading type="spinningBubbles" />;
    } else {
      return <>Registrar indivíduo</>;
    }
  }

  return (
    <Wrapper modal={props.modal}>
      <div>
        <div>
          <img src={panda} />
          <h2>Novo Indivíduo</h2>
        </div>
        <span
          className="material-symbols-outlined"
          onClick={() => props.setModal(false)}
        >
          close
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <input
          disabled={data === "loading" ? true : false}
          type="text"
          placeholder="nome"
          {...register("name")}
        ></input>
        <select
          disabled={data === "loading" ? true : false}
          {...register("speciesId")}
        >
          <option value="" disabled selected>
            espécie
          </option>
          {props.loadingSpecies
            ? null
            : props.species
            ? props.species?.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))
            : null}
        </select>
        <input
          disabled={data === "loading" ? true : false}
          type="text"
          placeholder="código de geolocalização"
          {...register("geocode")}
        ></input>
        <input
          disabled={data === "loading" ? true : false}
          type="number"
          min={0}
          placeholder="idade"
          {...register("age")}
        ></input>
        <select
          disabled={data === "loading" ? true : false}
          {...register("gender")}
        >
          <option value="" disabled selected>
            sexo
          </option>
          <option value={"Fêmea"}>Fêmea</option>
          <option value={"Macho"}>Macho</option>
        </select>
        <input
          disabled={data === "loading" ? true : false}
          type="url"
          placeholder="url da imagem"
          {...register("img")}
        ></input>
        <button type="submit">
          <Loading />
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ modal: boolean }>`
  display: ${(props) => (props.modal === true ? "flex" : "none")};
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  background-color: #e5bd95;
  border-radius: 2px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  & > div {
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 15px;

    span:hover {
      cursor: pointer;
    }
  }

  & > div > div {
    display: flex;
    align-items: center;

    img {
      height: 25px;
    }
  }

  h2 {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    textarea,
    select,
    option {
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      padding: 5px;
      border-radius: 5px;
      border: none;
    }

    textarea {
      resize: none;
      line-height: 18px;
    }

    select:hover {
      cursor: pointer;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 15px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      font-weight: 700;
      padding: 13px;
      width: 100%;
      background-color: #606c38;
      color: #fefae0;
      transition: all 0.2s ease-in-out;

      svg,
      div {
        max-height: 23px;
      }
    }

    button:hover {
      cursor: pointer;
      transform: scale(1.01);
    }
  }
`;
