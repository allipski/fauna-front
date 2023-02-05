import styled from "styled-components";
import { SingleIndividual, SingleSpecies } from "../../types/types";

export default function IndividualCard(props: {individual: SingleIndividual}) {
    return (
        <Wrapper>
            <h2>{props.individual.name}</h2>
            <img src={props.individual.img} />
            <TagsContainer>
                <StatusTag>{props.individual.species.name}</StatusTag>
                <ProjectTag>ID: {props.individual.geocode}</ProjectTag>
                <LocationTag>{props.individual.species.location}</LocationTag>
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
    width: 31%;
    border-radius: 15px;
    gap: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    h2 {
        font-weight: 600;
        font-size: 23px;
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
        border-radius: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 500;
        padding: 10px;
        width: 100%;
        background-color: #606C38;
        color: #FEFAE0;
    }

    button:hover {
        cursor: pointer;
    }
`;

const StatusTag = styled.span`
    font-size: 12px;
    line-height: 20px;
    border-radius: 7px;
    background-color: red;
    padding: 3px 8px;
    width: fit-content;
`

const LocationTag = styled.span`
    font-size: 12px;
    line-height: 20px;
    border-radius: 7px;
    background-color: lightcoral;
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