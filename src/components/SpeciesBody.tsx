import styled from "styled-components";
import SpeciesCard from "./SpeciesCard";
export default function SpeciesBody() {
    return (
        <Wrapper>
            <SpeciesCard />
            <SpeciesCard />
            <SpeciesCard />
            <SpeciesCard />
            <SpeciesCard />
            <SpeciesCard />
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