import styled from "styled-components";
import Project from "./Project";

export default function ProjectsBody() {
    return (
        <Wrapper>
            <Project />
            <Project />
            <Project />
            <Project />
            <Project />
            <Project />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    padding: 70px 15% 30px 15%;
`;