import { useSelector } from "react-redux";

export default function Dashboard() {
  const { info } = useSelector((state) => state.adminReducer);

  // Check if info is loaded
  if (!info) {
    return <p className="text-center">Loading...</p>;
  }

  return <p className="text-center">Welcome {info.hoTen} to the dashboard!</p>;
}
