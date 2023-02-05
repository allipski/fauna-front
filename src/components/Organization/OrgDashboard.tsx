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
import { UpdateOrganization } from "../../types/types";
import { updateOrgInfo } from "../../services/organizationApi";

export default function OrgDashboard() {
  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;
  const navigate = useNavigate();
  const [inputStatus, setInputStatus] = useState(true);

  const { register, handleSubmit, reset } = useForm<UpdateOrganization>();

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

  console.log(session)

  const onSubmit = handleSubmit(async (data) => {
    if (
      data.name === undefined &&
      data.email === undefined &&
      data.password === undefined &&
      data.confirmPassword === undefined
      && inputStatus === false
    ) {
      toast("Nenhuma alteração realizada");
      setInputStatus(true);
    } else {
      if (inputStatus) {
        setInputStatus(false);
      } else {
        const newOrganizationData = await updateOrgInfo(session.token, data);
        if (newOrganizationData) {
          reset();
          setInputStatus(true);
        } else {
        }
      }
    }
  });

  return (
    <Wrapper>
      <LeftContainer>
        <h1>Seu perfil</h1>
        <form id="updateOrgInfo" onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Nome da organização:</label>
            <input
              id="name"
              type="text"
              placeholder={session.organization}
              disabled={inputStatus}
              {...register("name")}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              placeholder={session.email}
              disabled={inputStatus}
              {...register("email")}
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              placeholder="***********"
              disabled={inputStatus}
              {...register("password")}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar senha:</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="***********"
              disabled={inputStatus}
              {...register("confirmPassword")}
            />
          </div>
        </form>
        <div>
          <button type="submit" form="updateOrgInfo">
            {inputStatus ? "Editar perfil" : "Salvar alterações"}
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
        <div>
          <img src="http://tous-logos.com/wp-content/uploads/2017/03/WWF-logo.png" />
        </div>
        <h2>{session.organization}</h2>
      </RightContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  padding: 70px 15% 30px 15%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  gap: 25px;

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
    box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
    width: 100%;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    input {
      padding: 7px 10px;
      border-radius: 8px;
      border: 1px solid lightgray;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  gap: 15px;

  h2 {
    font-size: 20px;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    width: 180px;
    border-radius: 50%;
    border: 1px solid lightslategray;
    overflow: hidden;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;

    img {
      object-fit: cover;
      height: 150px;
      width: 150px;
    }
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
