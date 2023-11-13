import { z } from "zod";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(5, { message: "Sua senha deve conter ao menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  function submitLogin({ email, password }: LoginFormData) {
    handleLogin(email, password);
  }

  async function handleLogin(email: string, password: string) {
    try {
      const { data } = await api.post("/authenticate", {
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      navigate("/tasks");
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setInvalidCredentials(true);
        return console.log(err.response.data.message);
      }
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit(submitLogin)}>
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

        {invalidCredentials ?? (
          <div>
            <span className="invalid">Credenciais inválidas</span>
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          Entrar
        </button>
        <Link to="/register">Cadatrar-se</Link>
      </form>
    </div>
  );
};

export default Login;
