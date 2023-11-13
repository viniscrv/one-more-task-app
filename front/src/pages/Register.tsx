import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { api } from "../lib/axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(5, { message: "Sua senha deve conter ao menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  function submitRegister({ username, email, password }: LoginFormData) {
    handleRegister(username, email, password);
  }

  const navigate = useNavigate();

  async function handleRegister(
    username: string,
    email: string,
    password: string
  ) {
    try {
      const { data } = await api.post("/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      navigate("/tasks");
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return console.log(err.response.data.message);
      }
    }
  }

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(submitRegister)}>
        <div>
          <label>Nome de usuário</label>
          <input
            type="text"
            placeholder="Digite seu username"
            {...register("username")}
          />
          {errors.username && (
            <span className="invalid">{errors.username.message}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            {...register("email")}
          />
          {errors.email && (
            <span className="invalid">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label>Senha</label>
          <input
            type="text"
            placeholder="Digite seu password"
            {...register("password")}
          />
          {errors.password && (
            <span className="invalid">{errors.password.message}</span>
          )}
        </div>

        <button>Registrar-se</button>
        <Link to="/">Já possuo uma conta</Link>
      </form>
    </div>
  );
};

export default Register;
