import { toast } from "react-toastify";
import api from "./api";

export async function signIn(signInData: SignInData) {

  try {
    const response = await api.post("/sign-in", signInData);
    toast('Login realizado com sucesso!');
    return response.data;
  } catch (error) {
    toast('Não foi possível realizar o login! Por favor, tente novamente.');
  } 
}

export type SignInData = {
  email: string,
  password: string
};
