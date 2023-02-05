import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import ProjectDetailsEdit from "../components/Projects/ProjectDetailsEdit";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <Wrapper>
      <Header />
      <ProjectDetailsEdit id={Number(id)} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;
