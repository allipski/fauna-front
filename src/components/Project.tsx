import styled from "styled-components";

export default function Project() {
    return (
        <Wrapper>
            <h2>Projeto X</h2>
            <img src="https://www.volunteerhq.org/images/projects/belize/volunteer-abroad-in-belize-ivhq-environmental-marine-conservation.jpg" />
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</span>
            <button>Ver Detalhes</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    padding: 30px;
    width: 47%;
    border-radius: 15px;
    gap: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    h2 {
        font-weight: 700;
        font-size: 30px;
        color: #606C38;
    }

    span {
        font-size: 16px;
        line-height: 20px;
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
        width: 40%;
        background-color: #606C38;
        color: #FEFAE0;
    }

    button:hover {
        cursor: pointer;
    }
`;