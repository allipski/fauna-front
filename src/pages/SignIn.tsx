import fauna from "../assets/fauna.png"
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import SignInForm from "../components/SignInForm";
export default function SignIn() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Header>
            <img onClick={() => navigate("/")} src={fauna} />
            </Header>
            <SignInForm />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
`;

const Header = styled.div`
    background-color: #283618;
    height: 50px;
    width: 100%;
    max-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
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
        transform: scale(1.05); 
    }
`