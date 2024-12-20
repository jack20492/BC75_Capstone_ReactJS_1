import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { message } from "antd";

export default function Login() {
  // Access user info from Redux store
  const { info } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, show a warning and redirect
    if (info?.accessToken) {
      message.warning("You've already logged in!");
      navigate("/"); // Redirect to homepage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, navigate]);

  // If user is logged in, render nothing or a loading component
  if (info?.accessToken) {
    return null; // Optionally, render a loading component here
  }

  return (
    <div className="flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative">
      <div className="flex flex-1 justify-center items-center">
        <div className="p-3 m-2 bg-white rounded-lg w-2/3 md:w-1/3">
          <h1 className="mb-3 font-bold text-2xl text-center">Login</h1>
          {/* Render the Form component here */}
          <Form />

          {/* Registration and navigation links */}
          <p className="text-right text-red-500">
            {"Don't have an account? "}
            <Link
              to="/register"
              className="font-bold text-red-500 hover:text-red-400 duration-300"
            >
              Register
            </Link>
          </p>
          <p className="text-right text-red-500">
            <Link
              to="/"
              className="font-bold text-red-500 hover:text-red-400 duration-300"
            >
              Back to homepage
            </Link>
          </p>
          <p className="text-right text-red-500">
            <Link
              to="/admin/auth"
              className="font-bold text-red-500 hover:text-red-400 duration-300"
            >
              Login as admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
