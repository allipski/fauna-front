import styled from "styled-components";

export default function Project({
  name,
  description,
  img
}: {
  name: string,
  description: string,
  img: string
}) {
  return (
    <Wrapper>
      <h2>{name}</h2>
      <img src={img}/>
      <span>{description}</span>
      <button>Ver Detalhes</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 30px;
  width: 47%;
  border-radius: 15px;
  gap: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  h2 {
    font-weight: 700;
    font-size: 30px;
    color: #606c38;
  }

  span {
    font-size: 16px;
    line-height: 20px;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
  }

  button {
    border: none;
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    width: 50%;
    background-color: #606c38;
    color: #fefae0;
  }

  button:hover {
    cursor: pointer;
  }
`;
