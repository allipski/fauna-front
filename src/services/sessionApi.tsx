import { toast } from "react-toastify";
import api from "./api";

export async function signIn(signInData: SignInData) {

  try {
    const response = await api.post("/sign-in", signInData);
    toast(`Que bom te ver de novo, ${response.data.organization}!`);
    return response.data;
  } catch (error) {
    toast('Não foi possível realizar o login! Por favor, tente novamente.');
  } 
}

export type SignInData = {
  email: string,
  password: string
};

export async function signOut(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  try {
    const response = await api.delete("/sign-in", config);
    toast('Até a próxima, #faunático!');
    return response.data;
  } catch (error) {
    toast('Não foi possível realizar o logout! Por favor, tente novamente.');
  } 
}
