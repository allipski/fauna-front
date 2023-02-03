import { toast } from "react-toastify";
import api from "./api";
import { NewSpeciesData } from "../types/types";

export async function newSpecies(token: string, data: NewSpeciesData) {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      };

  try {
    const response = await api.post("/species", data, config);
    toast(`Espécie "${data.name}" criada com sucesso! recarregue a página para vê-la na lista!`)
    return response.data;
  } catch (error) {
    toast('Não foi possível criar a espécie! Por favor, tente novamente.');
  } 
}
