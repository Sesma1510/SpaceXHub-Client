import { Form, Link, redirect, useActionData } from "react-router-dom";
import authService from "../services/auth.service";

export const signupPageAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    await authService.signup({ email, password, name });
    return redirect("/login");
  } catch (error) {
    const {
      request: { response },
    } = error;
    const { message } = JSON.parse(response);
    return message;
  }
};

function SignupPage() {
  const errorMessage = useActionData();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      <Form
        className="w-120 mt-10 p-4 form-bg shadow-md rounded-lg border-p4"
        action="/signup"
        method="POST"
      >
        <label className="block text-white font-bold mb-2">Email:</label>
        <input
          className="border p-2 rounded w-full"
          type="email"
          name="email"
        />

        <label className="block text-white font-bold mt-4 mb-2">
          Password:
        </label>
        <input
          className="border p-2 rounded w-full"
          type="password"
          name="password"
        />

        <label className="block text-white font-bold mt-4 mb-2">Name:</label>
        <input className="border p-2 rounded w-full" type="text" name="name" />

        <button
          className="bg-gray-500 hover:bg-gray-700 font-bold text-white mt-4 px-4 py-2 rounded w-full"
          type="submit"
        >
          Sign Up
        </button>
      </Form>
      {errorMessage && (
        <p className="error-message text-center mt-4 text-red-500">
          {errorMessage}
        </p>
      )}

      <p className="mt-6 text-center">Already have an account?</p>
      <Link
        className="text-white hover:text-indigo-700 font-bold"
        to={"/login"}
      >
        Login
      </Link>
    </div>
  );
}

export default SignupPage;
