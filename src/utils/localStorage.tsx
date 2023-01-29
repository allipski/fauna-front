export function placeInLocalStorage(sessionData: {
    organization: string,
    token: string
}) {
    localStorage.setItem("session", JSON.stringify(sessionData));
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("session")!);
}