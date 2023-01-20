import styled from "styled-components";

export default function Dashboard() {
    return (
        <Wrapper>
            <h1>Em breve a dashboard!</h1>
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