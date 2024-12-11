import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="text-center text-3xl text-red-500 animate-bounce mt-20">
      404 Page Not Found
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
