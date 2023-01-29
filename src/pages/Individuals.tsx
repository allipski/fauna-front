import styled from 'styled-components';
import Header from '../components/Header';
import IndividualsBody from '../components/Individuals/IndividualsBody';
export default function Individuals() {
    return (
        <Wrapper>
            <Header />
            <IndividualsBody />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;