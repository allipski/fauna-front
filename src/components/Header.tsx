import styled from "styled-components";
import fauna from "../assets/fauna.png"
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <img onClick={() => navigate("/")} src={fauna} />
            <h4>Organização</h4>
            <h4 onClick={() => navigate("/projetos")}>Projetos</h4>
            <h4>Espécies</h4>
            <h4>Indivíduos</h4>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #283618;
    height: 50px;
    width: 100%;
    max-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    padding: 0 15%;
    color: #FCFBF6;
    font-weight: 400;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    img {
        height: 45px;
    }

    img:hover {
        cursor: pointer;
        height: 47px;
    }

    h4 {
        padding: 10px 20px;
    }

    h4:hover {
        cursor: pointer;
        background-color: #606C38;
        border-radius: 15px;
        font-weight: 600;
    }
`;