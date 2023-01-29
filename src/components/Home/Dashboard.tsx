import styled from "styled-components";
import { OrganizationContext, SessionType } from "../../contexts/organizationContext";
import { useContext, useEffect } from "react";
import { getFromLocalStorage } from "../../utils/localStorage";

export default function Dashboard() {
    const { session, setSession } = useContext(OrganizationContext) as SessionType;

    useEffect(() => {
        if(!session.organization) {
            setSession(getFromLocalStorage());
        }
    }, [session])

    return (
        <Wrapper>
            <h1>Olá, {session.organization}!</h1>
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