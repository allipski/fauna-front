import { createContext, Dispatch, SetStateAction } from "react";

export type SessionType = {
    session: {
        organization: string,
        token: string,
        email: string
    },
    setSession : Dispatch<SetStateAction<{
        organization: string,
        token: string,
        email: string
    }>>
}

export const OrganizationContext = createContext<SessionType | null>(null);