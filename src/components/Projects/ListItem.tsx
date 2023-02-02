import styled from "styled-components";

export default function ListItem(props:{name: string, onClick: () => void}) {
  return (
    <Wrapper onClick={props.onClick}>{props.name}</Wrapper>
  );
}

const Wrapper = styled.h2`
    font-size: 16px;
    padding: 7px 10px;
    border-bottom: whitesmoke 1px solid;

  &:first-of-type {
    border-top: whitesmoke 1px solid;
  }

  &:hover {
    background-color: lightgray;
    transition: 500ms;
    cursor: pointer;
  }
`;
