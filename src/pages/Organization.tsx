import styled from 'styled-components';
import Header from '../components/Header';
import OrgDashboard from '../components/Organization/OrgDashboard';

export default function Organization() {
    return (
        <Wrapper>
            <Header />
            <OrgDashboard />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;