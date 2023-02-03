import { toast } from "react-toastify";
import api from "./api";
import { NewIndividualData } from "../types/types";

export async function newIndividual(token: string, data: NewIndividualData) {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      };

  try {
    const response = await api.post("/individuals", data, config);
    toast(`Indivíduo "${data.name}" registrado com sucesso! Recarregue a página para vê-lo na lista!`)
    return response.data;
  } catch (error) {
    toast('Não foi possível registrar o indivíduo! Por favor, tente novamente.');
  } 
}
