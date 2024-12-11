import { useEffect, useState } from "react";
import { getSeatListByFilm, postTickets } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { countryFormat } from "../../constants/defaultValues";

export default function Purchase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const { info } = useSelector((state) => {
    return state.userReducer;
  });

  const [filmSeats, setFilmSeats] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [totalGiaVe, setTotalGiaVe] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateTotalGiaVe = () => {
    const total = chosenSeats.reduce((acc, obj) => acc + obj.giaVe, 0);
    setTotalGiaVe(total);
  };

  useEffect(() => {
    calculateTotalGiaVe();
  }, [chosenSeats]);

  useEffect(() => {
    getSeatListByFilm(id)
      .then((res) => {
        setFilmSeats(res.data);
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const addSeat = (item) => {
    setChosenSeats((prevChosenSeats) => {
      const isAlreadyChosen = prevChosenSeats.includes(item);
      return isAlreadyChosen
        ? prevChosenSeats.filter((seat) => seat.maGhe !== item.maGhe)
        : [...prevChosenSeats, item];
    });
  };

  const { confirm, error, success } = Modal;

  const showConfirmLogin = () => {
    confirm({
      title: "You've not logged in",
      content: "Please login!",
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        setTimeout(() => navigate("/login"), 100);
      },
    });
  };

  const showNoSeatMessage = () => {
    error({
      title: "You've not chosen seats",
      content: "Please choose seats!",
      okButtonProps: {
        className: "bg-blue-500",
      },
    });
  };

  const showError = () => {
    error({
      title: "Error",
      content: "Error! Please try again!",
      okButtonProps: {
        className: "bg-blue-500",
      },
    });
  };

  const showSuccess = () => {
    success({
      title: "Successfully",
      content: "You've booked seats successfully!",
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        // Handle success (e.g., redirect to another page or reset state)
      },
    });
  };

  const handleUpdateArray = () => {
    const updatedArray = filmSeats.danhSachGhe.map((item) => ({
      ...item,
      daDat: chosenSeats.includes(item) ? true : item.daDat,
    }));
    setFilmSeats({ ...filmSeats, danhSachGhe: updatedArray });
  };

  const askBuyTickets = () => {
    if (chosenSeats.length === 0) {
      showNoSeatMessage();
    } else {
      confirm({
        title: "Are you sure?",
        content: "Do you want to buy tickets?",
        okButtonProps: {
          className: "bg-blue-500",
        },
        onOk() {
          buyTickets();
        },
      });
    }
  };

  const buyTickets = () => {
    if (!info) {
      showConfirmLogin();
    } else if (chosenSeats.length === 0) {
      showNoSeatMessage();
    } else {
      postTickets(id, chosenSeats, info)
        .then(() => {
          showSuccess();
          handleUpdateArray();
          setTotalGiaVe(0);
          setChosenSeats([]);
        })
        .catch(() => showError());
    }
  };

  if (loading) {
    return (
      <div className="container min-h-screen text-center pt-[80px]">
        <img
          alt=""
          src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
          className="w-fit m-auto"
        />
      </div>
    );
  }

  if (!filmSeats)
    return (
      <div className="container min-h-screen text-center pt-[140px]">
        No data!
      </div>
    );

  return (
    <div className="container min-h-screen pt-[48px]">
      {/* Seat Selection UI */}
      <div className="lg:flex flex-row py-12 gap-6 space-y-6">
        <div className="basis-2/3">
          {/* Seat Grid */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-16 gap-3 w-[1000px] lg:w-full py-3">
              {filmSeats.danhSachGhe.map((item, index) => (
                <button
                  onClick={() => addSeat(item)}
                  key={index}
                  disabled={item.daDat}
                  className={`p-3 ${
                    item.daDat
                      ? "bg-[#767676]"
                      : chosenSeats.includes(item)
                      ? "bg-[#008000]"
                      : item.loaiGhe === "Vip"
                      ? "bg-[#ffa500]"
                      : "bg-[#e9e9e9]"
                  } ${
                    !item.daDat && !chosenSeats.includes(item)
                      ? "hover:bg-gray-300"
                      : ""
                  } duration-300 ${
                    item.daDat ? "cursor-not-allowed" : "cursor-pointer"
                  } text-center rounded-lg flex justify-center items-center w-auto h-auto lg:w-9 lg:h-9`}
                >
                  {!item.daDat ? item.stt : "X"}
                </button>
              ))}
            </div>
          </div>

          {/* Seat Legend */}
          <div className="flex flex-row justify-center items-center gap-12 mt-6">
            {/* Add Legend UI */}
          </div>
        </div>

        {/* Ticket Summary */}
        <div className="border-0 lg:border-l-2 px-3 space-y-3 basis-1/3">
          <p className="text-center text-3xl font-bold text-[#8cc34a]">
            {totalGiaVe.toLocaleString(countryFormat)} VND
          </p>
          {/* Other movie details */}
          <div className="w-full flex justify-center items-center">
            <button
              className="py-3 mt-3 w-1/2 mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300"
              onClick={askBuyTickets}
            >
              Buy tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
