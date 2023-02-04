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
import useIndividuals from "../hooks/useIndividuals";
import DataButton from "../components/Projects/DataButton";
import Card from "../components/Projects/Card";
import ListItem from "../components/Projects/ListItem";
import ReactLoading from "react-loading";
import CardAddNew from "../components/Projects/CardAddNew";
import {
  SingleSpecies,
  SingleProjectType,
  SpeciesFetch,
  IndividualsFetch,
  SingleIndividual,
} from "../types/types";
import IndividualCard from "../components/Projects/IndividualCard";
import CardNewIndividual from "../components/Projects/CardNewIndividual";

export default function ProjectPage() {
  const [infoType, setInfoType] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showIndividualCard, setShowIndividualCard] = useState(false);
  const [showIndividualCardTwo, setShowIndividualCardTwo] = useState(false);
  const [cardInfo, setCardInfo] = useState<SingleSpecies>();
  const [individualCardInfo, setIndividualCardInfo] =
    useState<SingleIndividual>();
  const [individualCardInfoTwo, setIndividualCardInfoTwo] =
    useState<SingleIndividual>();
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const { id } = useParams();

  const { session, setSession } = useContext(
    OrganizationContext
  ) as SessionType;

  const navigate = useNavigate();

  const { data } = useFetch(
    session.token,
    `/projects/${id}`
  ) as SingleProjectType;

  const { species, loadingSpecies } = useSpecies({
    token: session.token,
    projectId: Number(id)
  }) as SpeciesFetch;

  const allIndividuals = useIndividuals({
    token: session.token,
  }) as IndividualsFetch;

  const releasedIndividuals = useIndividuals({
    token: session.token,
    released: true,
  }) as IndividualsFetch;

  const rehabIndividuals = useIndividuals({
    token: session.token,
    rehab: true,
  }) as IndividualsFetch;

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

  function listItems() {
    if (infoType === 0) {
      return [];
    } else if (infoType === 1) {
      return species;
    } else if (infoType === 2) {
      return releasedIndividuals.individuals;
    } else if (infoType === 3) {
      return rehabIndividuals.individuals;
    } else if (infoType === 4) {
      return species;
    } else if (infoType === 5) {
      return species;
    }
  }

  function loadingItems() {
    if (infoType === 0) {
      return [];
    } else if (infoType === 1) {
      return loadingSpecies;
    } else if (infoType === 2) {
      return releasedIndividuals.loadingIndividuals;
    } else if (infoType === 3) {
      return rehabIndividuals.loadingIndividuals;
    } else if (infoType === 4) {
      return species;
    } else if (infoType === 5) {
      return species;
    }
  }

  function clickListItem(index: number) {
    setModal(false);
    if (infoType === 1) {
      if (cardInfo === species[index]) {
        setShowCard(!showCard);
      } else {
        setShowCard(true);
        setCardInfo(species[index]);
      }
    } else if (infoType === 2) {
      if (individualCardInfo === releasedIndividuals.individuals[index]) {
        setShowIndividualCard(!showIndividualCard);
      } else {
        setShowIndividualCard(true);
        setIndividualCardInfo(releasedIndividuals.individuals[index]);
      }
    } else if (infoType === 3) {
      if (individualCardInfo === rehabIndividuals.individuals[index]) {
        setShowIndividualCardTwo(!showIndividualCardTwo);
      } else {
        setShowIndividualCardTwo(true);
        setIndividualCardInfoTwo(rehabIndividuals.individuals[index]);
      }
    }
  }

  function hideAllCards() {
    setShowCard(false);
    setShowIndividualCard(false);
    setShowIndividualCardTwo(false);
    setModal(false);
    setModalTwo(false);
  }

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
              onClick={() => {
                setInfoType(infoType === 1 ? 0 : 1);
                hideAllCards();
              }}
              infoType={infoType}
              idNumber={1}
              numberCount={loadingSpecies ? 0 : species ? species?.length : 0}
              description={"Espécies em monitoramento"}
            />
          ) : null}
          <DataButton
            onClick={() => {
              setInfoType(infoType === 2 ? 0 : 2);
              hideAllCards();
            }}
            infoType={infoType}
            idNumber={2}
            numberCount={
              releasedIndividuals.loadingIndividuals
                ? 0
                : releasedIndividuals.individuals
                ? releasedIndividuals.individuals?.length
                : 0
            }
            description={"Indivíduos reabilitados"}
          />
          <DataButton
            onClick={() => {
              setInfoType(infoType === 3 ? 0 : 3);
              hideAllCards();
            }}
            infoType={infoType}
            idNumber={3}
            numberCount={
              rehabIndividuals.loadingIndividuals
                ? 0
                : rehabIndividuals.individuals
                ? rehabIndividuals.individuals?.length
                : 0
            }
            description={"Indivíduos sob cuidado"}
          />
          <DataButton
            onClick={() => {
              setInfoType(infoType === 4 ? 0 : 4);
              hideAllCards();
            }}
            infoType={infoType}
            idNumber={4}
            numberCount={9}
            description={"Ações comunitárias"}
          />
          <DataButton
            onClick={() => {
              setInfoType(infoType === 5 ? 0 : 5);
              hideAllCards();
            }}
            infoType={infoType}
            idNumber={5}
            numberCount={16}
            description={"Voluntários"}
          />
        </SecondSection>
        <ThirdSection infoType={infoType}>
          <div>
            <ListBox>
              {loadingItems() ? (
                <ReactLoading type="spinningBubbles" />
              ) : listItems() ? (
                listItems()?.map((item, index) => (
                  <ListItem
                    key={index}
                    onClick={() => clickListItem(index)}
                    name={item.name}
                  />
                ))
              ) : null}
            </ListBox>
            <AddNew
              onClick={() => {
                if (infoType === 1) {
                  setModal(!modal);
                  setModalTwo(false);
                } else {
                  setModalTwo(!modalTwo);
                  setModal(false);
                }
                setShowCard(false);
                setShowIndividualCard(false);
                setShowIndividualCardTwo(false);
              }}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <h4>{infoType === 1 ? "Espécie" : "Indivíduo"}</h4>
            </AddNew>
          </div>
          <Card
            showCard={showCard}
            cardInfo={cardInfo}
            individuals={allIndividuals.individuals}
            loadingIndividuals={allIndividuals.loadingIndividuals}
          />
          <CardAddNew
            modal={modal}
            setModal={setModal}
            projectId={Number(id)}
          />
          <CardNewIndividual
            species={species}
            loadingSpecies={loadingSpecies}
            modal={modalTwo}
            setModal={setModalTwo}
          />
          <IndividualCard
            showIndividualCard={showIndividualCard}
            individualCardInfo={individualCardInfo}
            infoType={infoType}
          />
          <IndividualCard
            showIndividualCard={showIndividualCardTwo}
            individualCardInfo={individualCardInfoTwo}
            infoType={infoType}
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
  min-width: 950px;
`;

const FirstSection = styled.div`
  display: flex;
  gap: 15px;
  max-width: 100%;
  min-width: 950px;

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
  min-width: 950px;
`;

const ThirdSection = styled.div<{ infoType: number }>`
  display: ${(props) => (props.infoType === 0 ? "none" : "flex")};
  margin-top: 15px;
  gap: 15px;
  height: 350px;
  max-width: 100%;
  min-width: 950px;

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
  height: 100%;
  flex-direction: column;
  min-width: 220px;
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
