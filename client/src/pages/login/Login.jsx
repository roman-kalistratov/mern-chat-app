import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import FormContainer from "../../components/forms/FormContainer";

const Login = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

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
        <label className="label p-2">
          <span className="text-base label-text">Nickname</span>
        </label>
        <input
          type="text"
          placeholder="Enter nickname"
          className="w-full rounded-md p-2 px-3 outline-none border-none"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full rounded-md p-2 px-3 outline-none border-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link
          to="/signup"
          className="text-sm hover:underline hover:text-green mt-2 inline-block"
        >
          {"Don't"} have an account?
        </Link>

        <div>
          <button
            className="btn btn-block btn-success hover:text-dark btn-sm mt-2 border border-light bg-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner "></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};
export default Login;
