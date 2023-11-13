import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  function register() {}

  return (
    <div className={styles.register}>
      <form>
        <div>
          <label>Username</label>
          <input type="text" placeholder="Digite seu username" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Digite seu e-mail" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" placeholder="Digite seu password" />
        </div>

        <button>Registrar-se</button>
        <Link to="/">Já possuo uma conta</Link>
      </form>
    </div>
  );
};

export default Register;
