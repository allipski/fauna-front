import styled from "styled-components";
import fauna from "../assets/fauna.png";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/sessionApi";
import { useContext, useEffect } from "react";
import { OrganizationContext, SessionType } from "../contexts/organizationContext";
import { getFromLocalStorage } from "../utils/localStorage";

export default function Header() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(OrganizationContext) as SessionType;

    useEffect(() => {
        if(!session) {
            setSession(getFromLocalStorage());
        }
    }, [session])

    function logout() {
        signOut(session.token)
        localStorage.removeItem("session")
        navigate('/');
    }

  return (
    <Wrapper>
      <img onClick={() => navigate("/")} src={fauna} />
      <h4 onClick={() => navigate("/projetos")}>Projetos</h4>
      <h4 onClick={() => navigate("/especies")}>Espécies</h4>
      <h4 onClick={() => navigate("/individuals")}>Indivíduos</h4>
      <h4>Organização</h4>
      <h4 onClick={logout}>
        <span className="material-symbols-outlined">logout</span>
      </h4>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #283618;
  height: 50px;
  width: 100%;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 0 15%;
  color: #fcfbf6;
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  img {
    height: 45px;
  }

  img:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  h4 {
    padding: 10px 20px;
  }

  h4:hover {
    cursor: pointer;
    background-color: #606c38;
    border-radius: 15px;
    transform: scale(1.05);
  }

  h4:last-of-type {
    padding: 6px;
    border-radius: 5px;
  }
`;
