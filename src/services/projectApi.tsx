import { toast } from "react-toastify";
import api from "./api";
import { NewProjectData } from "../components/Projects/AddNewModal";
import { UpdateProject } from "../types/types";

export async function newProject(token: string, data: NewProjectData) {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      };

  try {
    const response = await api.post("/projects", data, config);
    toast(`Projeto "${data.name}" criado com sucesso! recarregue a página para vê-lo na lista!`)
    return response.data;
  } catch (error) {
    toast('Não foi possível criar o projeto! Por favor, tente novamente.');
  } 
}

export async function updateProject(token: string, data: UpdateProject, id: number) {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

try {
  const response = await api.put(`/projects/${id}`, data, config);
  toast(`Projeto "${data.name}" atualizado com sucesso! recarregue a página para ver as alterações.`)
  return response.data;
} catch (error) {
  toast('Não foi possível atualizar o projeto! Por favor, tente novamente.');
} 
}
