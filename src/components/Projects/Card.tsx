import styled from "styled-components";
import { SingleSpecies } from "../../pages/ProjectPage";
import DataButton from "./DataButton";

export default function Card(props: {
  showCard: boolean;
  cardInfo: SingleSpecies | undefined;
}) {
  return (
    <CardWrapper showCard={props.showCard}>
      <h1>{props.cardInfo?.name}</h1>
      <div>
        <img src={props.cardInfo?.img} />
        <CardInfo>
          <div>
            <h2>
              <span>Localização:</span> {props.cardInfo?.location}
            </h2>
            <h2>
              <span>Status:</span> {props.cardInfo?.status}
            </h2>
            <h2>
              <span>Número de indivíduos monitorados:</span>{" "}
              {props.cardInfo?._count.individuals}
            </h2>
          </div>
          <div>
            <DataButton numberCount={45} description={'Indivíduos reabilitados'} />
            <DataButton numberCount={22} description={'Indivíduos sob cuidado'} />
          </div>
          <div>
            <button>Ver espécie</button>
            <button>
              <p>Exportar Dados</p>
            </button>
          </div>
        </CardInfo>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ showCard: boolean }>`
  display: ${(props) => (props.showCard ? "flex" : "none")};
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  background-color: white;
  border-radius: 2px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  & > div {
    display: flex;
    width: 100%;
    gap: 15px;
  }

  img {
    object-fit: cover;
    border-radius: 15px;
    height: 280px;
  }

  h1 {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  & > div:nth-of-type(2) {
    flex-direction: row;
    width: 100%;

    div {
      width: 50%;
      border: #283618 1px solid;
    }
  }

  h2 {
    font-size: 16px;
    line-height: 18px;

    span {
      font-weight: 700;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
    width: 100%;
    background-color: #606c38;
    color: #fefae0;
    justify-self: flex-end;
  }

  button:nth-of-type(2) {
    background-color: white;
    color: #283618;
    gap: 7px;
    border: 1px solid #283618;
    font-weight: 400;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
