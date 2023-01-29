import styled from "styled-components";

export default function IndividualsCard() {
    return (
        <Wrapper>
            <h2>Individual X</h2>
            <img src="https://www.volunteerhq.org/images/projects/belize/volunteer-abroad-in-belize-ivhq-environmental-marine-conservation.jpg" />
            <TagsContainer>
                <SpeciesTag>homo sapiens</SpeciesTag>
                <ProjectTag>Projeto X</ProjectTag>
            </TagsContainer>
            <button>Ver Ficha Técnica</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    padding: 20px;
    width: 23%;
    border-radius: 15px;
    gap: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    h2 {
        font-weight: 700;
        font-size: 25px;
        color: #606C38;
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 15px;
    }

    button {
        border: none;
        border-radius: 15px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 700;
        padding: 15px;
        width: 100%;
        background-color: #606C38;
        color: #FEFAE0;
    }

    button:hover {
        cursor: pointer;
    }
`;

const SpeciesTag = styled.span`
    font-size: 12px;
    line-height: 20px;
    font-style: italic;
    border-radius: 7px;
    background-color: yellow;
    padding: 3px 8px;
    width: fit-content;
`

const ProjectTag = styled.span`
    font-size: 12px;
    line-height: 20px;
    border-radius: 7px;
    background-color: lightblue;
    padding: 3px 8px;
    width: fit-content;
`

const TagsContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 4px;
    flex-wrap: wrap;
`