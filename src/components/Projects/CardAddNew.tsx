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
import { OrganizationContext } from "../../contexts/organizationContext";
import { SessionType } from "../../contexts/organizationContext";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { newSpecies } from "../../services/speciesApi";
import { NewSpeciesData } from "../../types/types";

export default function CardAddNew(props: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  projectId: number;
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

  const { register, handleSubmit, reset } = useForm<NewSpeciesData>({
    defaultValues: {
      name: "",
      location: "",
      status: "",
      img: "",
      description: "",
      projectId: props.projectId,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setData("loading");
    const newSpeciesData = await newSpecies(session.token, data);
    setData(newSpeciesData || "");
    if (newSpeciesData) {
      setData("success");
      reset();
    }
  });

  function Loading() {
    if (data === "loading") {
      return <ReactLoading type="spinningBubbles" />;
    } else {
      return <>Adicionar espécie</>;
    }
  }

  return (
    <Wrapper modal={props.modal}>
      <div>
        <div>
          <img src={panda} />
          <h2>Nova Espécie</h2>
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
        <input
          disabled={data === "loading" ? true : false}
          type="text"
          placeholder="área de abrangência"
          {...register("location")}
        ></input>
        <select
          disabled={data === "loading" ? true : false}
          {...register("status")}
        >
          <option value="" disabled defaultValue={""}>
            status de preservação
          </option>
          <option value={"Levemente ameaçado"}>Levemente ameaçado</option>
          <option value={"Moderadamente ameaçado"}>
            Moderadamente ameaçado
          </option>
          <option value={"Severamente ameaçado"}>Severamente ameaçado</option>
        </select>
        <input
          disabled={data === "loading" ? true : false}
          type="url"
          placeholder="url da imagem"
          {...register("img")}
        ></input>
        <textarea
          disabled={data === "loading" ? true : false}
          placeholder="descrição da espécie"
          {...register("description")}
          rows={3}
        ></textarea>
        <button type="submit">
          <Loading />
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ modal: boolean }>`
  display: ${(props) => props.modal ? "flex" : "none"};
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
