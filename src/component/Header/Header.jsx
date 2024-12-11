import { useDispatch, useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, message } from "antd";
import { SET_INFO } from "../../redux/constant/user";
import { defaultAvatar } from "../../constants/defaultValues";

export default function Header({
  scrollIntoShowTimesRef,
  scrollIntoCinemasRef,
  scrollIntoNewsRef,
  scrollIntoAppRef,
}) {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  // Handle user actions
  const handleLogout = () => {
    message.success("Logout successfully!");
    navigate("/");
    userLocalStorage.remove();
    dispatch({ type: SET_INFO, payload: null });
  };

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleAccount = () => navigate("/account");

  // Menu items for the dropdown
  const items = [
    {
      key: "1",
      label: info ? (
        <Link to="/account" className="text-black font-medium">
          {info.hoTen}
        </Link>
      ) : (
        <Link to="/login" className="text-black font-medium">
          Login
        </Link>
      ),
    },
    {
      key: "2",
      label: info ? (
        <a onClick={handleLogout} className="text-red-500 font-medium">
          Logout
        </a>
      ) : (
        <Link to="/register" className="text-black font-medium">
          Register
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={scrollIntoShowTimesRef}
          className="text-black hover:text-gray-700 duration-300"
        >
          Showtimes
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          onClick={scrollIntoCinemasRef}
          className="text-black hover:text-gray-700 duration-300"
        >
          Cinemas
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          onClick={scrollIntoNewsRef}
          className="text-black hover:text-gray-700 duration-300"
        >
          News
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a
          onClick={scrollIntoAppRef}
          className="text-black hover:text-gray-700 duration-300"
        >
          App
        </a>
      ),
    },
  ];

  // Render user navigation
  const renderUserNav = () => {
    const buttonClass =
      "border-2 border-transparent rounded-lg px-6 py-2 text-white text-lg transition-all duration-300 transform hover:scale-105";

    if (info) {
      return (
        <div className="flex justify-center items-center gap-x-4">
          <div
            className="cursor-pointer flex justify-center items-center gap-x-2 group"
            onClick={handleAccount}
          >
            <img
              src={defaultAvatar}
              className="w-8 h-8 rounded-full"
              alt="Avatar"
            />
            <span className="text-black font-medium group-hover:text-gray-500 duration-300">
              {info.hoTen.toUpperCase()}
            </span>
          </div>
          <button
            className={`${buttonClass} bg-red-600 hover:bg-red-700 shadow-lg`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center gap-4">
          <button
            className={`${buttonClass} bg-blue-600 hover:bg-blue-700 shadow-lg`}
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <button
            className={`${buttonClass} bg-green-600 hover:bg-green-700 shadow-lg`}
            onClick={handleRegister}
          >
            Đăng ký
          </button>
          <button className="block md:hidden text-white">Menu</button>
        </div>
      );
    }
  };

  return (
    <div className="bg-white flex items-center justify-between shadow-lg px-20 py-3 gap-6 fixed z-50 w-full">
      {/* Logo and Link */}
      <p className="text-3xl font-medium text-red-600 animate-pulse text-center">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <img
            alt="logo"
            src="https://images.vexels.com/media/users/3/299367/isolated/preview/50ac129fb016f89f1a7737d44729d187-theater-movie-tickets.png"
            className="h-12 transition-transform transform hover:scale-110 duration-300"
          />
        </Link>
      </p>

      {/* Navigation links for homepage */}
      {location.pathname === "/" && (
        <div className="text-xl font-medium gap-4 lg:gap-12 text-center hidden md:flex justify-center items-center">
          <button
            onClick={scrollIntoShowTimesRef}
            className="text-black hover:text-red-600 duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-calendar-day"></i>{" "}
            {/* Example icon for Showtimes */}
            <span className="font-semibold">Lịch chiếu</span>
          </button>

          <button
            onClick={scrollIntoCinemasRef}
            className="text-black hover:text-red-600 duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-film"></i> {/* Example icon for Cinemas */}
            <span className="font-semibold">Hệ thống rạp</span>
          </button>

          <button
            onClick={scrollIntoNewsRef}
            className="text-black hover:text-red-600 duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-newspaper"></i> {/* Example icon for News */}
            <span className="font-semibold">Tin tức</span>
          </button>

          <button
            onClick={scrollIntoAppRef}
            className="text-black hover:text-red-600 duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-cogs"></i> {/* Example icon for App */}
            <span className="font-semibold">Ứng dụng</span>
          </button>
        </div>
      )}

      {/* User navigation and menu button */}
      <div className="space-x-5">
        <div className="hidden md:block">{renderUserNav()}</div>
        <div className="block md:hidden">
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button className="text-white bg-blue-600 hover:bg-blue-700 duration-300 shadow-lg rounded-md px-6 py-2">
              Menu
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
