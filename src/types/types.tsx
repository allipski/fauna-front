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
  token: string,
  name?: string,
  location?: string,
  status?: string,
  projectId?: number
};


type SpeciesFetch = {
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
  }[];
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

type SpeciesList = {
  id: number;
  name: string;
  location: string;
  status: string;
  img: string;
  projectId: number;
  _count: {
    individuals: number;
  };
}[];

type IndividualsFetch = {
  individuals: {
    name: string;
    geocode: string;
    age: number;
    gender: string;
    onRehab: boolean;
    natureReady: boolean;
    img: string;
    speciesId: number;
  }[];
  loadingIndividuals: boolean;
  errorIndividuals: unknown;
};

type IndividualList = {
    name: string;
    geocode: string;
    age: number;
    gender: string;
    onRehab: boolean;
    natureReady: boolean;
    img: string;
    speciesId: number;
  } [];

  type SingleIndividual = {
    name: string;
    geocode: string;
    age: number;
    gender: string;
    onRehab: boolean;
    natureReady: boolean;
    img: string;
    speciesId: number;
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
  ProjectFetch,
  ModalType
};
