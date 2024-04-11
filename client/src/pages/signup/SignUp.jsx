import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import useSignup from "../../hooks/useSignup";
import FormContainer from "../../components/forms/FormContainer";

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
        <label className="label pb-0">
          <span className="text-base label-text">Nickname</span>
        </label>
        <input
          type="text"
          placeholder="johndoe"
          className="w-full rounded-md p-2 px-3 outline-none border-none"
          name="nickname"
          value={signupForm.values.nickname}
          onChange={signupForm.handleChange}
        />

        <label className="label pb-0">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full rounded-md p-2 px-3 outline-none border-none"
          name="password"
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
        />

        <label className="label pb-0">
          <span className="text-base label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-md p-2 px-3 outline-none border-none"
          name="confirmPassword"
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
        />

        <Link
          to="/login"
          className="text-sm hover:underline hover:text-green mt-2 inline-block"
        >
          Already have an account?
        </Link>

        <div>
          <button
            type="submit"
            className="btn btn-block btn-success hover:text-dark btn-sm mt-2 border border-light bg-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default SignUp;
