import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import FormContainer from "../components/forms/FormContainer";

const Login = () => {
  const [nickname, setNickname] = useState("HarryPotter");
  const [password, setPassword] = useState("123");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(nickname, password);
  };

  return (
    <FormContainer title="Login">
      <form
        onSubmit={handleSubmit}
        className="p-5 px-5 flex flex-col justify-start gap-2"
      >
        <label className=" pb-0 pl-1">
          <span className="font-semibold text-dark2 label-text">Nickname</span>
        </label>

        <input
          type="text"
          placeholder="Enter nickname"
          className="p-2 px-3 rounded-sm outline-none text-sm text-dark placeholder:text-dark1 bg-inputDark"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label className="pb-0 pl-1">
          <span className="font-semibold text-dark2 label-text">Password</span>
        </label>

        <input
          type="password"
          placeholder="Enter Password"
          className="p-2 px-3 rounded-sm outline-none text-sm text-dark placeholder:text-dark1 bg-inputDark"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link
          to="/signup"
          className="text-sm hover:underline text-green mt-2 inline-block"
        >
          {"Don't"} have an account?
        </Link>

        <button
          className="bg-icon hover:bg-iconHover text-dark p-2 px-3 text-sm rounded-md outline-none"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </FormContainer>
  );
};
export default Login;
