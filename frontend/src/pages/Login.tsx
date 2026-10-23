import "../styles.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (endpoint: string) => {
    setError("");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("user", login);
      navigate("/expenses");
    }
  };
  return (
      <div className="full-page vertical pad-gapped centered">
        <p className="title-header">BUDGET TRACKER</p>
        <div className="pad-gapped vertical login-wrapper">
          <input
              className="better-textarea login-textareas rounded"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
          />
          <input
              type="password"
              className="better-textarea login-textareas rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-buttons pad-gapped">
            <Button className="rounded login-button centered secondary-button" onClick={()=>handleLogin("http://localhost:4444/register")}>Register</Button>
            <Button className="rounded login-button centered primary-button" onClick={()=>handleLogin("http://localhost:4444/login")}>Login</Button>
          </div>
          {error && <p className="login-error centered pad-gapped rounded">{error}</p>}
        </div>
      </div>
  );
}

export default Login;
