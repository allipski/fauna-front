import { toast } from "react-toastify";
import { UpdateOrganization } from "../types/types";
import api from "./api";

export async function signUp(signUpData: SignUpData) {
  try {
    const response = await api.post("/sign-up", signUpData);
    toast("Cadastro realizado com sucesso!");
    return response.data;
  } catch (error) {
    toast("Não foi possível fazer o seu cadastro! Por favor, tente novamente.");
  }
}

export type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function updateOrgInfo(
  token: string,
  orgInfo: UpdateOrganization
) {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  try {
    const response = await api.put("/sign-up", orgInfo, config);
    toast("Cadastro atualizado com sucesso! Faça login novamente para ver as alterações.");
    return response.data;
  } catch (error) {
    toast(
      "Não foi possível atualizar o seu cadastro! Por favor, tente novamente."
    );
  }
}
