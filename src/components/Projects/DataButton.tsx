import styled from "styled-components";

// espécies em monitoramento, indivíduos reabilitados, indivíduos sob cuidado, ações comunitárias, voluntários

export default function DataButton(props:{onClick?:()=>void, infoType?: number, idNumber?: number, numberCount: number, description: string}) {
  return (
    <Wrapper onClick={props.onClick} infoType={props.infoType} idNumber={props.idNumber}>
      <h1>{props.numberCount}</h1>
      <p>{props.description}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div<{infoType?: number, idNumber?: number}>`
  padding: 15px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-family: "Montserrat", sans-serif;
  background-color: ${props => !(props.infoType && props.idNumber) ? "white" : props.infoType === props.idNumber ? "#606c38" : "white"};
  color: ${props => !(props.infoType && props.idNumber) ? "black" : props.infoType === props.idNumber ? "#fcfbf6" : "black"};

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 16px;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    background-color: #606c38;
    color: #fcfbf6;
    transition: 500ms;
  }
`;
