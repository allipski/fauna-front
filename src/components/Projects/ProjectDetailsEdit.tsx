import styled from "styled-components";
import {
  OrganizationContext,
  SessionType,
} from "../../contexts/organizationContext";
import { useContext, useEffect, useState } from "react";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SingleProjectType, UpdateProject } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { updateProject } from "../../services/projectApi";

export default function ProjectDetailsEdit(props: { id: number }) {
  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;
  const navigate = useNavigate();
  const [inputStatus, setInputStatus] = useState(true);

  const { register, handleSubmit, reset } = useForm<UpdateProject>();

  const { data } = useFetch(
    session.token,
    `/projects/${props.id}`
  ) as SingleProjectType;

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

  const onSubmit = handleSubmit(async (data) => {
    if (
      data.name === undefined &&
      data.description == undefined &&
      data.img === undefined &&
      inputStatus === false
    ) {
      toast("Nenhuma alteração realizada");
      setInputStatus(true);
    } else {
      if (inputStatus) {
        setInputStatus(false);
      } else {
        const newProjectData = await updateProject(
          session.token,
          data,
          props.id
        );
        console.log(newProjectData);
        if (newProjectData) {
          reset();
          setInputStatus(true);
        } else {
        }
      }
    }
  });

  return (
    <Wrapper>
      <div>
        <LeftContainer>
          <h1>
            Projeto {data?.id} - {data?.name}
          </h1>
          <form id="updateOrgInfo" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name">Nome do projeto:</label>
              <input
                id="name"
                type="text"
                placeholder={data?.name}
                disabled={inputStatus}
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="description">Descrição:</label>
              <textarea
                id="description"
                placeholder={data?.description}
                disabled={inputStatus}
                {...register("description")}
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="img">Imagem:</label>
              <input
                id="img"
                type="url"
                placeholder={data?.img}
                disabled={inputStatus}
                {...register("img")}
              />
            </div>
          </form>
          <div>
            <button type="submit" form="updateOrgInfo">
              {inputStatus ? "Editar projeto" : "Salvar alterações"}
            </button>
            <CancelButton
              onClick={() => {
                setInputStatus(true);
                reset();
              }}
              inputStatus={inputStatus}
            >
              Cancelar
            </CancelButton>
          </div>
        </LeftContainer>
        <RightContainer>
          <img src={data?.img} />
        </RightContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 70px 15% 30px 15%;
  align-items: center;
  justify-content: center;
  border-radius: 16px;

  & > div:first-of-type {
    display: flex;
    justify-content: start;
    width: 100%;
    z-index: 1;
    border: 2px solid gray;
    border-radius: 18px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  gap: 25px;
  z-index: 1;
  padding: 15px;

  & > div {
    display: flex;
    gap: 10px;
  }

  button:first-of-type {
    padding: 7px 20px;
    border-radius: 15px;
    border: 1px solid #283618;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    background-color: #283618;
    color: #fcfbf6;
  }

  button:first-of-type:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: 500ms;
  }

  h1 {
    font-size: 23px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    color: #283618;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 100%;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    input,
    textarea {
      font-family: "Lato", sans-serif;
      font-size: 14px;
      padding: 7px 10px;
      border-radius: 8px;
      border: 1px solid lightgray;
    }

    textarea {
      resize: none;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  position: relative;
  z-index: 0;

  img {
    overflow-x: visible;
    object-fit: cover;
    width: 180%;
    height: 100%;
    position: absolute;
    right: 0px;
    z-index: 0;
    border-radius: 0px 15px 15px 0;
    box-shadow: rgba(149, 157, 165, 0.6) 0px 8px 24px;
  }
`;

const CancelButton = styled.button<{ inputStatus: boolean }>`
  display: ${(props) => (!props.inputStatus ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 7px 20px;
  border-radius: 15px;
  border: 1px solid #283618;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  background-color: #fcfbf6;
  color: #283618;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
