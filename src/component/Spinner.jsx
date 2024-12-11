import { useSelector } from "react-redux";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { ClipLoader } from "react-spinners";

export default function Spinner() {
  const { isLoading } = useSelector((state) => state.spinnerReducer);

  if (!isLoading) return null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)", // Slight opacity for a dark background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <RemoveScrollBar />
      <ClipLoader size={150} color="#36d7b7" speedMultiplier={3} />
    </div>
  );
}
