import styled from "styled-components";
import panda from "../../assets/newproject.svg";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

export type NewSpeciesData = {
  name: string;
  img: string;
  description: string;
};

export default function CardAddNew(props: {
  showCard: boolean;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>
}) {

  const { register, handleSubmit, reset } = useForm<NewSpeciesData>({
    defaultValues: {
      name: "",
      img: "",
      description: "",
    },
  });

  // const onSubmit = handleSubmit(async (data) => {
  //   setData("loading");
  //   const newProjectData = await newProject(session.token, data);
  //   setData(newProjectData || "");
  //   if (newProjectData) {
  //     setData("success");
  //     setModal(!modal);
  //     reset();
  //   }
  // });

  return (
    <Wrapper showCard={props.showCard} modal={props.modal}>
        <div>
          <div>
            <img src={panda} />
            <h2>Novo Projeto</h2>
          </div>
          <span
            className="material-symbols-outlined"
            // onClick={() => setModal(!modal)}
          >
            close
          </span>
        </div>
        {/* <form onSubmit={onSubmit}>
          <input
            disabled={data === "loading" ? true : false}
            type="text"
            placeholder="nome"
            {...register("name")}
          ></input>
          <input
            disabled={data === "loading" ? true : false}
            type="url"
            placeholder="url da imagem"
            {...register("img")}
          ></input>
          <textarea
            disabled={data === "loading" ? true : false}
            placeholder="descrição do projeto"
            {...register("description")}
            rows={4}
          ></textarea>
          <button type="submit">
            <Loading />
          </button>
        </form> */}
      </Wrapper>
  );
}

const Wrapper = styled.div<{ showCard: boolean, modal: boolean }>`
  display: ${(props) => (props.showCard === false && props.modal === true ? "flex" : "none")};
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  background-color: red;
  border-radius: 2px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  & > div {
    display: flex;
    width: 100%;
    gap: 15px;
  }

  img {
    object-fit: cover;
    border-radius: 15px;
    height: 280px;
  }

  h1 {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  & > div:nth-of-type(2) {
    flex-direction: row;
    width: 100%;

    div {
      width: 50%;
      border: #283618 1px solid;
    }
  }

  h2 {
    font-size: 16px;
    line-height: 18px;

    span {
      font-weight: 700;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
    width: 100%;
    background-color: #606c38;
    color: #fefae0;
    justify-self: flex-end;
  }

  button:nth-of-type(2) {
    background-color: white;
    color: #283618;
    gap: 7px;
    border: 1px solid #283618;
    font-weight: 400;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
