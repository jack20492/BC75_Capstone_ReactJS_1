import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailMovieShow } from "../../api/api";
import { Progress, Tabs, Spin } from "antd";
import { placeholderImage } from "../../constants/defaultValues";
import { imageUrlRegex } from "../../constants/regex";
import moment from "moment/moment";

export default function DetailMovie() {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();
  const navigate = useNavigate();

  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch movie details with error handling
    const fetchMovieDetails = async () => {
      try {
        const res = await getDetailMovieShow(id);
        setDetail(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" spinning={loading} />
      </div>
    );
  }

  return (
    <div className="bg-[#0a2029] pt-[50px]">
      <div className="flex justify-center items-center container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12 my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12">
            <div>
              <img
                className="mx-auto w-96 h-96 object-cover rounded-lg"
                alt=""
                src={
                  imageUrlRegex.test(detail.hinhAnh)
                    ? detail.hinhAnh
                    : placeholderImage
                }
                onError={onImageError}
              />
            </div>
            <div className="text-white space-y-3 text-center md:text-left">
              <p>{moment(detail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
              <p className="font-bold text-xl">{detail.tenPhim}</p>
              <p>120 minutes</p>
            </div>
          </div>
          <Progress
            size={150}
            strokeWidth={10}
            trailColor={"white"}
            format={(percent) => (
              <span className="text-white font-medium block">
                {percent / 10} / 10
              </span>
            )}
            type="circle"
            percent={detail.danhGia * 10}
            className="mx-auto"
          />
        </div>
      </div>
      {detail?.heThongRapChieu?.length > 0 ? (
        <div className="pb-12">
          <div className="container bg-white">
            <Tabs
              tabPosition="left"
              defaultActiveKey="1"
              items={detail?.heThongRapChieu?.map((item, index) => {
                const id = String(index + 1);
                return {
                  label: <img className="w-16 h-16" src={item.logo} alt="" />,
                  key: id,
                  children: item.cumRapChieu.map((itemChild, indexChild) => (
                    <div key={indexChild} className="my-6 space-y-3 mr-6">
                      <p className="font-bold text-[#8cc34a] text-xl">
                        {itemChild.tenCumRap}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {itemChild.lichChieuPhim.map(
                          (itemLichChieu, indexLichChieu) => (
                            <button
                              className="bg-red-500 text-white rounded shadow px-6 py-2 cursor-pointer hover:bg-red-700 duration-300"
                              onClick={() =>
                                navigate(
                                  `/purchase/${itemLichChieu.maLichChieu}`
                                )
                              }
                              key={indexLichChieu}
                            >
                              <span className="text-normal">
                                {moment(itemLichChieu.ngayChieuGioChieu).format(
                                  "DD-MM-YYYY"
                                )}
                              </span>
                              <span className="text-normal">
                                {moment(itemLichChieu.ngayChieuGioChieu).format(
                                  " ~ HH:mm"
                                )}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )),
                };
              })}
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-white pb-12 text-2xl">
          No ticket data available!
        </p>
      )}
    </div>
  );
}
