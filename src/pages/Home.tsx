import styled from 'styled-components';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

export default function Home() {
    return (
        <Wrapper>
            <Header />
            <Dashboard />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;