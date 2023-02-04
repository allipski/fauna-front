import styled from "styled-components";
import Project from "./Project";
import useFetch from "../../hooks/useFetch";
import {
  useEffect,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { getFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { OrganizationContext } from "../../contexts/organizationContext";
import ReactLoading from "react-loading";
import { SessionType } from "../../contexts/organizationContext";
import AddNewModal from "./AddNewModal";
import { ProjectFetch, ModalType } from "../../types/types";


export default function ProjectsBody() {
  const [modal, setModal] = useState(false);
  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    session.token,
    "/projects"
  ) as ProjectFetch;

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
      <AddNew onClick={() => setModal(!modal)}>
        <span className="material-symbols-outlined">add_circle</span>
        <h4>Novo Projeto</h4>
      </AddNew>
      <AddNewModal modal={modal} setModal={setModal} />
      <ProjectsContainer>
        {loading ? (
          <ReactLoading type="spinningBubbles" />
        ) : data ? (
          data.map((item, index) => (
            <Project
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              img={item.img}
            />
          ))
        ) : null}
      </ProjectsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  gap: 25px;
  padding: 70px 15% 30px 15%;
  z-index: 0;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  gap: 20px;
`;

const AddNew = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: #283618;
  width: fit-content;
  height: fit-content;
  padding: 7px 10px;
  border-radius: 14px;
  border: solid 1px #283618;
  transition: 0.3s all ease-in-out;

  span {
    font-size: 26px;
  }

  h4 {
    font-size: 18px;
    font-weight: 500;
  }

  &:hover {
    background-color: #283618;
    color: #fefae0;
    cursor: pointer;
  }
`;
