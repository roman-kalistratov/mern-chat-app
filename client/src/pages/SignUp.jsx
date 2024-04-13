import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import useSignup from "../hooks/useSignup";
import FormContainer from "../components/forms/FormContainer";

const SignUp = () => {
  const { loading, signup } = useSignup();

  const signupForm = useFormik({
    initialValues: {
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await signup(values);
      signupForm.resetForm();
    },
  });

  return (
    <FormContainer title="SignUp">
      <form
        onSubmit={signupForm.handleSubmit}
        className="p-5 px-5 flex flex-col justify-start gap-2"
      >
        <label className=" pb-0 pl-1">
          <span className="font-semibold text-dark2 label-text">Nickname</span>
        </label>

        <input
          type="text"
          placeholder="Enter nickname"
          className="p-2 px-3 rounded-sm outline-none text-sm text-dark placeholder:text-dark1 bg-inputDark"
          name="nickname"
          value={signupForm.values.nickname}
          onChange={signupForm.handleChange}
        />
        <label className=" pb-0 pl-1">
          <span className="font-semibold text-dark2 label-text">Password</span>
        </label>

        <input
          type="password"
          placeholder="Enter Password"
          className="p-2 px-3 rounded-sm outline-none text-sm text-dark placeholder:text-dark1 bg-inputDark"
          name="password"
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
        />
        <label className=" pb-0 pl-1">
          <span className="font-semibold text-dark2 label-text">
            Confirm Password
          </span>
        </label>

        <input
          type="password"
          placeholder="Confirm Password"
          className="p-2 px-3 rounded-sm outline-none text-sm text-dark placeholder:text-dark1 bg-inputDark"
          name="confirmPassword"
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
        />

        <Link
          to="/login"
          className="text-sm hover:underline text-green mt-2 inline-block"
        >
          Already have an account?
        </Link>

        <button
          type="submit"
          className="bg-icon hover:bg-iconHover text-dark p-2 px-3 text-sm rounded-md outline-none"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </FormContainer>
  );
};

export default SignUp;
