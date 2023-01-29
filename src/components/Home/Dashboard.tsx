import styled from "styled-components";
import { OrganizationContext, SessionType } from "../../contexts/organizationContext";
import { useContext, useEffect } from "react";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { session, setSession } = useContext(OrganizationContext) as SessionType;
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

    return (
        <Wrapper>
            <h1>Olá, {session.organization}!</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    padding: 70px 15% 30px 15%;
`;