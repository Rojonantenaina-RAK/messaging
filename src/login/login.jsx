import { useState, useEffect } from "react";
import { useTranslation } from "../services/usetranslation";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, currentLanguage, isDarkMode }) => {
  const { t } = useTranslation(currentLanguage);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!email || !password);
  }, [email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError(t("emptyFields") || "Email and password must be filled");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login/`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.access);

        if (response.data.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        }

        navigate("/chatbot");
      } else {
        throw new Error(
          response.data.message || t("loginError") || "Login failed"
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          t("loginError") ||
          "Email or password incorrect"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email || ""}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password || ""}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {"Don't have an account?"} <a href="/register">{"Sign up"}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
