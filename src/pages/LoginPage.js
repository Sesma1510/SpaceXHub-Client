import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import authService from "../services/auth.service";

export const loginPageAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await authService.login({ email, password });
    return {
      authToken: data.authToken,
      error: null,
    };
  } catch (error) {
    const {
      request: { response },
    } = error;
    const { message } = JSON.parse(response);
    return { error: message, authToken: null };
  }
};

function LoginPage(a) {
  const navigate = useNavigate();
  const actionData = useActionData();

  const { storeToken, authenticateUser } = useOutletContext();

  const authToken = actionData?.authToken;
  const error = actionData?.error;

  if (authToken) {
    storeToken(authToken);
    authenticateUser();
    navigate("/");
  }

  return (
    <div className="LoginPage flex flex-col items-center justify-center h-screen rounded-lg border-p4">
      <h1 className="text-2xl font-bold text-white text-center">Login</h1>

      <Form
        className="w-1/3 h-1/3 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg  mt-10 rounded-lg flex flex-col items-center justify-center"
        action="/login"
        method="POST"
      >
        <label className="block text-white font-bold mb-2">Email:</label>
        <input
          className="border p-2 mb-5 rounded w-4/5"
          type="email"
          name="email"
        />

        <label className="block text-white font-bold mt-4 mb-2">
          Password:
        </label>
        <input
          className="border p-2 rounded mb-5 w-4/5"
          type="password"
          name="password"
        />

        <button
          className="bg-gray-500 hover:bg-gray-700 font-bold text-white mt-4 px-4 py-2 rounded w-4/5"
          type="submit"
        >
          Login
        </button>
      </Form>
      {error && (
        <p className="error-message text-center mt-4 text-red-500">{error}</p>
      )}

      <p className="mt-6 text-center text-white">Don't have an account yet?</p>
      <Link
        className="text-white hover:text-indigo-700 font-bold"
        to={"/signup"}
      >
        {" "}
        Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;
