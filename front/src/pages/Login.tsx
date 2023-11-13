import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  function login() {}

  function redirectToRegister() {}

  return (
    <div className={styles.login}>
      <form>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Digite seu e-mail" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" placeholder="Digite seu password" />
        </div>

        <button>Entrar</button>
        <Link to="/register">Cadatrar-se</Link>
      </form>
    </div>
  );
};

export default Login;
