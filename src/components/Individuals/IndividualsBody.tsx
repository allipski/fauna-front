import styled from "styled-components";
import IndividualsCard from "./IndividualsCard";

export default function IndividualsBody() {
    return (
        <Wrapper>
            <IndividualsCard />
            <IndividualsCard />
            <IndividualsCard />
            <IndividualsCard />
            <IndividualsCard />
            <IndividualsCard />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 2%;
    padding: 70px 15% 30px 15%;
`;