import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../Zustand/useAuthStore";
import { checkLogin, handleLogin } from "../../services/Auth/AuthApi";
import { toast } from "react-toastify";

const useCheckLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const jwt = localStorage.getItem("_token");

  const [emails, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { setLoggedIn, email, isLoggedIn, token } = useAuthStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleLogin(emails, password);
      localStorage.setItem("_token", response.data.token);

      setLoggedIn(true, response.data.token, emails);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        toast.info(error.response.data.message);
      }
      if (error.response.status === 500) {
        toast.error("Terjadi masalah pada server");
      }
    }
  };

  const verifyToken = async () => {
    setLoading(true);
    try {
      if (jwt) {
        const response = await checkLogin(jwt);
        console.log(response);
        setLoggedIn(true, response.data.token, response.data.email);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      if (err.response.status === 404) {
        localStorage.removeItem("_token");
        navigate("/login");
      }

      if (err.request) {
        setError(
          "IP telah diblok sementara karena terlalu banyak melakukan request, silahkan coba beberapa saat lagi"
        );
      } else {
        localStorage.removeItem("_token");
        navigate("/login");
        setError(err.response?.data?.message || "An error occurred.");
      }
      toast.info("Terjadi Masalah Pada server");
      localStorage.removeItem("_token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return {
    loading,
    error,
    showPassword,
    handleFormSubmit,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    password,
    emails,
    isLoggedIn,
    email,
    token,
  };
};

export default useCheckLogin;
