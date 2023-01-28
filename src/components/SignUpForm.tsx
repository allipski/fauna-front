import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import form from "../assets/form.svg";
import { SignUpData, signUp } from "../services/organizationApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactLoading from "react-loading";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const { register, handleSubmit } = useForm<SignUpData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function Loading() {
    if (data === "loading") {
      return <ReactLoading type="spinningBubbles" />;
    } else {
      return <>"Quero ser #fauna!"</>;
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    setData("loading");
    const signUpData = await signUp(data);
    setData(signUpData || "");
    if (signUpData) {
      setData("success");
      navigate("/login");
    }
  });

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <div>
          <img src={form} />
          <h3>Cadastre-se</h3>
        </div>
        <input
          disabled={data === "loading" ? true : false}
          type="text"
          placeholder="nome da organização"
          {...register("name")}
        ></input>

        <input
          disabled={data === "loading" ? true : false}
          type="email"
          placeholder="email"
          {...register("email")}
        ></input>

        <input
          disabled={data === "loading" ? true : false}
          type="password"
          placeholder="senha"
          {...register("password")}
        ></input>

        <input
          disabled={data === "loading" ? true : false}
          type="password"
          placeholder="confirme a senha"
          {...register("confirmPassword")}
        ></input>

        <button type="submit">
          <Loading />
        </button>

        <p onClick={() => navigate("/login")}>
          Já sou #fauna, quero fazer login!
        </p>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e5bd95;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  & > div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }

  img {
    height: 40px;
  }

  h3 {
    font-size: 28px;
    font-family: "Lato", sans-serif;
    font-weight: 900;
    color: #283618;
  }

  input {
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    margin: 3px;
    border-radius: 5px;
    border: none;
    padding: 12px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    border: none;
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 13px;
    width: 100%;
    background-color: #606c38;
    color: #fefae0;
    transition: all 0.2s ease-in-out;

    svg,
    div {
      max-height: 23px;
    }
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  p {
    font-size: 14px;
    margin-top: 12px;
    text-decoration: underline;
    font-weight: 400;
    color: #283618;
  }

  p:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;
