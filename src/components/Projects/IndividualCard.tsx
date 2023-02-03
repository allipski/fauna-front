import styled from "styled-components";
import { IndividualList, SingleIndividual } from "../../types/types";

export default function IndividualCard(props: {
  showIndividualCard: boolean;
  individualCardInfo: SingleIndividual | undefined;
  infoType: number;
}) {
  return (
    <CardWrapper showIndividualCard={props.showIndividualCard}>
      <h1>{props.individualCardInfo?.name}</h1>
      <div>
        <img src={props.individualCardInfo?.img} />
        <CardInfo>
          <div>
            <h2>
              <span>Idade: </span>
              {props.individualCardInfo?.age}
            </h2>
            <h2>
              <span>Sexo: </span>
              {props.individualCardInfo?.gender}
            </h2>
            <h2>
              <span>
                {props.infoType === 2 ? "Data de soltura: " : "Data de captura: "}
              </span>
              17/10/2021
            </h2>
            <h2>
              <span>
                {props.infoType === 2 ? "Próximo monitoramento: " : "Previsão de soltura: "}
              </span>
              25/02/2023
            </h2>
          </div>
          <div>
            <button>Ver detalhes</button>
            <button>
              <p>Exportar Dados</p>
            </button>
          </div>
        </CardInfo>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ showIndividualCard: boolean }>`
  display: ${(props) => (props.showIndividualCard ? "flex" : "none")};
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
