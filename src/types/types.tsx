import { Dispatch, SetStateAction } from "react";

type SingleProjectType = {
  data: {
    id: number;
    name: string;
    description: string;
    img: string;
  };
  loading: boolean;
  error: unknown;
};

type NewSpeciesData = {
  name: string;
  location: string;
  status: string;
  img: string;
  description: string;
  projectId: number;
};

type FilterSpecies = {
  token: string;
  name?: string;
  location?: string;
  status?: string;
  projectId?: number;
};

type FilterIndividuals = {
  token: string;
  individualName?: string;
  geocode?: string;
  speciesName?: string;
  speciesId?: number;
  projectId?: number;
  age?: [number, number];
  location?: string;
  gender?: string;
  onRehab?: boolean;
  released?: boolean;
  natureReady?: boolean;
  releaseDate?: string;
  captureDate?: string;
  monitorInterval?: number;
  lastMonitorDate?: string;
  healthStatus?: string;
};

type SpeciesFetch = {
  species: SpeciesList;
  loadingSpecies: boolean;
  errorSpecies: unknown;
};

type SingleSpecies = {
  id: number;
  name: string;
  location: string;
  status: string;
  img: string;
  projectId: number;
  _count: {
    individuals: number;
  };
};

type SpeciesList = SingleSpecies [];

type IndividualsFetch = {
  individuals: IndividualList;
  loadingIndividuals: boolean;
  errorIndividuals: unknown;
};

type IndividualList = SingleIndividual [];

type SingleIndividual = {
  id: number;
  name: string;
  geocode: string;
  age: number;
  gender: string;
  onRehab: boolean;
  natureReady: boolean;
  releaseDate?: string;
  captureDate: string;
  monitorInterval?: number;
  lastMonitorDate?: string;
  healthStatus: string;
  img: string;
  speciesId: number;
  species: {
    id: number;
    name: string;
    location: string;
    status: string;
    img: string;
    projectId: number;
    _count: {
      individuals: number;
    };
  };
};

type NewIndividualData = {
  name: string;
  geocode: string;
  age: number;
  gender: string;
  onRehab: boolean;
  natureReady: boolean;
  img: string;
  speciesId: number;
};

type ProjectFetch = {
  data: {
    id: number;
    name: string;
    description: string;
    img: string;
  }[];
  loading: boolean;
  error: unknown;
};

type ModalType = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

export type {
  SingleProjectType,
  SingleSpecies,
  SingleIndividual,
  IndividualList,
  NewIndividualData,
  SpeciesFetch,
  IndividualsFetch,
  NewSpeciesData,
  SpeciesList,
  FilterSpecies,
  FilterIndividuals,
  ProjectFetch,
  ModalType,
};
