import styled from 'styled-components';
import Header from '../components/Header';
import SpeciesBody from '../components/SpeciesBody';
export default function Species() {
    return (
        <Wrapper>
            <Header />
            <SpeciesBody />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;