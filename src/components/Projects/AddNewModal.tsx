import styled from "styled-components";
import { ModalType } from "./ProjectsBody";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { newProject } from "../../services/projectApi";
import { OrganizationContext } from "../../contexts/organizationContext";
import { SessionType } from "../../contexts/organizationContext";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localStorage";
import panda from "../../assets/newproject.svg";

type Props = {
  modal: boolean;
};

export type NewProjectData = {
  name: string;
  img: string;
  description: string;
};

function AddNewModal({ modal, setModal }: ModalType) {
  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;
  const navigate = useNavigate();

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

  const [data, setData] = useState("");
  const { register, handleSubmit, reset } = useForm<NewProjectData>({
    defaultValues: {
      name: "",
      img: "",
      description: "",
    },
  });

  function Loading() {
    if (data === "loading") {
      return <ReactLoading type="spinningBubbles" />;
    } else {
      return <>Criar novo projeto</>;
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    setData("loading");
    const newProjectData = await newProject(session.token, data);
    setData(newProjectData || "");
    if (newProjectData) {
      setData("success");
      setModal(!modal);
      reset();
    }
  });

  return (
    <Background modal={modal}>
      <Wrapper modal={modal}>
        <div>
          <div>
            <img src={panda} />
            <h2>Novo Projeto</h2>
          </div>
          <span
            className="material-symbols-outlined"
            onClick={() => setModal(!modal)}
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
            type="url"
            placeholder="url da imagem"
            {...register("img")}
          ></input>
          <textarea
            disabled={data === "loading" ? true : false}
            placeholder="descrição do projeto"
            {...register("description")}
            rows={4}
          ></textarea>
          <button type="submit">
            <Loading />
          </button>
        </form>
      </Wrapper>
    </Background>
  );
}

const Wrapper = styled.div<Props>`
  display: ${(props) => (props.modal ? "flex" : "none")};
  flex-direction: column;
  width: 50%;
  background-color: #e5bd95;
  padding: 15px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 3;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
  }

  & > div:first-of-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #283618;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        height: 50px;
      }

      h2 {
        font-size: 28px;
        font-weight: 700;
        font-family: "Montserrat", sans-serif;
        margin: 10px 0;
      }
    }
  }

  span {
    font-weight: 600;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    border: solid 1px #e5bd95;
  }

  span:hover {
    cursor: pointer;
    transform: scale(1.1);
    border: solid 1px #283618;
  }

  input {
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    border: none;
  }

  textarea {
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    border: none;
    resize: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
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
`;

const Background = styled.div<Props>`
  display: ${(props) => (props.modal ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
`;

export default AddNewModal;
