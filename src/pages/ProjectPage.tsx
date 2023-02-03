import styled from "styled-components";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { OrganizationContext } from "../contexts/organizationContext";
import { SessionType } from "../contexts/organizationContext";
import { useContext, useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import useSpecies from "../hooks/useSpecies";
import DataButton from "../components/Projects/DataButton";
import Card from "../components/Projects/Card";
import ListItem from "../components/Projects/ListItem";
import ReactLoading from "react-loading";
import CardAddNew from "../components/Projects/CardAddNew";

export type SingleProjectType = {
  data: {
    id: number;
    name: string;
    description: string;
    img: string;
  };
  loading: boolean;
  error: unknown;
};

export type SpeciesFetch = {
  species: {
    name: string;
    location: string;
    status: string;
    img: string;
    projectId: number;
    _count: {
      individuals: number;
    };
  }[];
  loadingSpecies: boolean;
  errorSpecies: unknown;
};

export type SingleSpecies = {
  name: string;
  location: string;
  status: string;
  img: string;
  projectId: number;
  _count: {
    individuals: number;
  };
};

export default function ProjectPage() {
  const [infoType, setInfoType] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [cardInfo, setCardInfo] = useState<SingleSpecies>();

  const { id } = useParams();

  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;

  const navigate = useNavigate();

  const { data } = useFetch(
    session.token,
    `/projects/${id}`
  ) as SingleProjectType;

  const { species, loadingSpecies } = useSpecies(
    session.token,
    Number(id)
  ) as SpeciesFetch;

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

  const [modal, setModal] = useState(false);

  return (
    <Wrapper>
      <Header />
      <ProjectContainer>
        <FirstSection>
          <img src={data?.img} />
          <MostImportantSection>
            <div>
              <h1>{data?.name}</h1>
              <h3>{data?.description}</h3>
            </div>
            <button>Ver espécies monitoradas</button>
          </MostImportantSection>
        </FirstSection>
        <SecondSection>
          {loadingSpecies ? (
            <ReactLoading type="spinningBubbles" />
          ) : species ? (
            <DataButton
              onClick={() => setInfoType(infoType === 1 ? 0 : 1)}
              infoType={infoType}
              idNumber={1}
              numberCount={species.length}
              description={"Espécies em monitoramento"}
            />
          ) : null}
          <DataButton
            onClick={() => setInfoType(infoType === 2 ? 0 : 2)}
            infoType={infoType}
            idNumber={2}
            numberCount={46}
            description={"Indivíduos reabilitados"}
          />
          <DataButton
            onClick={() => setInfoType(infoType === 3 ? 0 : 3)}
            infoType={infoType}
            idNumber={3}
            numberCount={23}
            description={"Indivíduos sob cuidado"}
          />
          <DataButton
            onClick={() => setInfoType(infoType === 4 ? 0 : 4)}
            infoType={infoType}
            idNumber={4}
            numberCount={9}
            description={"Ações comunitárias"}
          />
          <DataButton
            onClick={() => setInfoType(infoType === 5 ? 0 : 5)}
            infoType={infoType}
            idNumber={5}
            numberCount={16}
            description={"Voluntários"}
          />
        </SecondSection>
        <ThirdSection infoType={infoType}>
          <div>
            <ListBox>
              {loadingSpecies ? (
                <ReactLoading type="spinningBubbles" />
              ) : species ? (
                species.map((item, index) => (
                  <ListItem
                    onClick={() => {
                      setModal(false);
                      if (cardInfo === species[index]) {
                        setShowCard(!showCard);
                      } else {
                        setShowCard(true);
                        setCardInfo(species[index]);
                      }
                    }}
                    name={item.name}
                  />
                ))
              ) : null}
            </ListBox>
            <AddNew
              onClick={() => {
                setModal(!modal);
                setShowCard(false);
              }}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <h4>Nova Espécie</h4>
            </AddNew>
          </div>
          <Card showCard={showCard} cardInfo={cardInfo} />
          <CardAddNew
            showCard={showCard}
            modal={modal}
            setModal={setModal}
            projectId={Number(id)}
          />
        </ThirdSection>
      </ProjectContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  z-index: 0;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  padding: 50px 15% 30px 15%;
  z-index: 0;
`;

const FirstSection = styled.div`
  display: flex;
  gap: 15px;
  max-width: 100%;

  img {
    min-width: 60%;
    height: 23rem;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

const MostImportantSection = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  justify-content: space-between;
  gap: 15px;
  padding: 25px 15px;
  color: #283618;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  h1 {
    font-size: 30px;
    line-height: 34px;
  }

  h3 {
    font-size: 20px;
    line-height: 24px;
  }

  button {
    border: none;
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    width: 80%;
    background-color: #606c38;
    color: #fefae0;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const SecondSection = styled.div`
  display: flex;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  max-width: 100%;
`;

const ThirdSection = styled.div<{ infoType: number }>`
  display: ${(props) => (props.infoType === 0 ? "none" : "flex")};
  margin-top: 15px;
  gap: 15px;
  height: 350px;
  max-width: 100%;

  & > div:first-of-type {
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 220px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 2px;
    position: relative;
  }
`;

const ListBox = styled.div`
  padding: 15px 0 55px 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 220px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 2px;
  position: relative;
  overflow: scroll;
`;

const AddNew = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: #283618;
  width: 80%;
  height: fit-content;
  padding: 5px 10px;
  border-radius: 14px;
  border: solid 1px #606c38;
  background-color: white;
  transition: 0.3s all ease-in-out;
  align-self: center;
  position: absolute;
  bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  span {
    font-size: 24px;
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
  }

  &:hover {
    background-color: #606c38;
    color: #fefae0;
    cursor: pointer;
  }
`;
