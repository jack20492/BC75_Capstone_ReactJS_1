import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { info } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!info) {
      // If no info is available, show loading and wait for the information
      setLoading(true);
    } else if (info?.maLoaiNguoiDung !== "QuanTri") {
      // If the user is not an admin, redirect and show message
      message.error("Please login first, admin!");
      navigate("/admin/auth");
    } else {
      // If the user is an admin, allow the route and stop loading
      setLoading(false);
    }
  }, [info, navigate]);

  // Show a spinner until we determine whether the user is an admin
  if (loading) {
    return <Spin size="large" />;
  }

  // If the user is authorized, render the children
  return children;
}
