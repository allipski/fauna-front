import styled from 'styled-components';
import Header from '../components/Header';
import ProjectsBody from '../components/Projects/ProjectsBody';

export default function Projects() {
    return (
        <Wrapper>
            <Header />
            <ProjectsBody />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;