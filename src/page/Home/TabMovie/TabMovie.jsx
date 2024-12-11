import { useEffect, useState, useCallback } from "react";
import { getMovieByTheater } from "../../../api/api";
import { Tabs, Spin } from "antd";
import moment from "moment";
import { placeholderImage } from "../../../constants/defaultValues";
import { useNavigate } from "react-router-dom";
import { imageUrlRegex } from "../../../constants/regex";

export default function TabMovie() {
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await getMovieByTheater();
      setDanhSachHeThongRap(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  const handleNavigate = useCallback(
    (lichChieuId) => {
      navigate(`/purchase/${lichChieuId}`);
    },
    [navigate]
  );

  const renderDsPhim = (dsPhim) => {
    return dsPhim.map((phim) => (
      <div key={phim.maPhim} className="flex space-x-5 p-3 items-center">
        <img
          alt=""
          src={
            imageUrlRegex.test(phim.hinhAnh) ? phim.hinhAnh : placeholderImage
          }
          onError={onImageError}
          className="w-20 h-32 object-cover"
        />
        <div>
          <p className="font-bold">{phim.tenPhim}</p>
          <div className="grid grid-cols-2 gap-3">
            {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu) => (
              <button
                key={lichChieu.maLichChieu}
                className="bg-red-500 text-white rounded shadow px-5 py-2 cursor-pointer hover:bg-red-700 duration-300"
                onClick={() => handleNavigate(lichChieu.maLichChieu)}
              >
                {moment(lichChieu.ngayChieuGioChieu).format(
                  "DD-MM-YYYY ~ HH:mm"
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  const handleHeThongRap = () => {
    return danhSachHeThongRap.map((heThongRap, index) => ({
      key: index,
      label: <img className="w-8 h-8 mx-auto" src={heThongRap.logo} alt="" />,
      children: (
        <>
          <div className="hidden lg:block">
            <Tabs
              className="h-full lg:h-96"
              tabPosition="left"
              defaultActiveKey="1"
              items={heThongRap.lstCumRap.map((cumRap) => ({
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-96 whitespace-normal">
                    <p className="text-green-800 font-medium">
                      {cumRap.tenCumRap}
                    </p>
                    <p className="text-green-800 hover:text-green-800 truncate">
                      {cumRap.diaChi}
                    </p>
                  </div>
                ),
                children: (
                  <div className="h-[390px] lg:h-96 overflow-y-scroll">
                    {renderDsPhim(cumRap.danhSachPhim)}
                  </div>
                ),
              }))}
            />
          </div>
          <div className="block lg:hidden">
            <Tabs
              className="h-full lg:h-96"
              centered
              defaultActiveKey="1"
              items={heThongRap.lstCumRap.map((cumRap) => ({
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-96 whitespace-normal">
                    <p className="text-green-800 font-medium">
                      {cumRap.tenCumRap}
                    </p>
                    <p className="text-green-800 hover:text-green-800 truncate">
                      {cumRap.diaChi}
                    </p>
                  </div>
                ),
                children: (
                  <div className="h-[390px] lg:h-96 overflow-y-scroll">
                    {renderDsPhim(cumRap.danhSachPhim)}
                  </div>
                ),
              }))}
            />
          </div>
        </>
      ),
    }));
  };

  if (loading) {
    return (
      <div className="container p-3 rounded border-2 border-l-black">
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="container p-3 rounded border-2 border-l-black">
      <div className="hidden lg:block">
        <Tabs
          className="h-full lg:h-96"
          tabPosition="left"
          defaultActiveKey="1"
          items={handleHeThongRap()}
        />
      </div>
      <div className="block lg:hidden">
        <Tabs
          className="h-full lg:h-96"
          centered
          defaultActiveKey="1"
          items={handleHeThongRap()}
        />
      </div>
    </div>
  );
}
