import { toast } from "react-toastify";
import api from "./api";

export async function signUp(signUpData: SignUpData) {

  try {
    const response = await api.post("/sign-up", signUpData);
    toast('Cadastro realizado com sucesso!');
    return response.data;
  } catch (error) {
    toast('Não foi possível fazer o seu cadastro! Por favor, tente novamente.');
  } 
}

export type SignUpData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
};
