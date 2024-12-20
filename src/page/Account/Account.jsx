import Header from "../../component/Header/Header";
import { Button, Form, Input, Select, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo, putUserInfo, layUserTickets } from "../../api/api";
import { adminLocalStorage, userLocalStorage } from "../../api/localService";
import { MA_NHOM } from "../../api/config";
import { SET_INFO } from "../../redux/constant/user";
import { SET_INFO_ADMIN } from "../../redux/constant/admin";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { countryFormat } from "../../constants/defaultValues";

const SubmitButton = () => (
  <Button type="primary" className="bg-blue-500" htmlType="submit">
    Update
  </Button>
);

export default function Account() {
  const navigate = useNavigate();
  const { info, accessToken } = useSelector((state) => state.userReducer);
  const infoAdmin = useSelector((state) => state.adminReducer.info);
  const [ticketHistory, setTicketHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTicket, setLoadingTicket] = useState(true);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Check if user is logged in
  useEffect(() => {
    if (!info?.accessToken) {
      message.error("Please login first!");
      navigate("/login");
    } else {
      fetchUserInfo(info.taiKhoan);
      fetchTicketHistory(info.taiKhoan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const fetchUserInfo = async (taiKhoan) => {
    try {
      const res = await getUserInfo(taiKhoan);
      form.setFieldsValue({ ...res.data[0] });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTicketHistory = async (taiKhoan) => {
    try {
      const res = await layUserTickets(taiKhoan);
      setTicketHistory(res.data.thongTinDatVe);
      setLoadingTicket(false);
    } catch (err) {
      console.error(err);
    }
  };

  const onAccountTypeChange = (value) => {
    form.setFieldsValue({
      maLoaiNguoiDung: value === "QuanTri" ? "QuanTri" : "KhachHang",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Error!");
  };

  const onFinish = async (values) => {
    try {
      await putUserInfo({ ...values, maNhom: MA_NHOM }, accessToken);
      message.success("Update success!");
      userLocalStorage.set({ ...values, accessToken });
      dispatch({ type: SET_INFO, payload: { ...values, accessToken } });

      // Handle admin-specific logic
      if (infoAdmin.taiKhoan === info.taiKhoan) {
        adminLocalStorage.set({
          ...values,
          accessToken: infoAdmin.accessToken,
        });
        dispatch({
          type: SET_INFO_ADMIN,
          payload: { ...values, accessToken: infoAdmin.accessToken },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!info?.accessToken) return null;

  return (
    <div className="flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative">
      <div className="fixed min-w-full z-50">
        <Header />
      </div>
      <div className="flex flex-1 justify-center items-center mt-24 mb-7">
        {loading || loadingTicket ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 w-[80%]">
            <div className="p-3 m-2 bg-white rounded-lg">
              <div className="mb-3 border-b-2 pb-3">
                <h1 className="font-bold text-xl">Information</h1>
                <p>Info can be changed</p>
              </div>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      { required: true, message: "Please input your E-mail!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="taiKhoan"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Full name"
                    name="hoTen"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="soDt"
                    label="Phone number"
                    rules={[
                      {
                        pattern: new RegExp(/^0(?!0)\d{9}$/g),
                        message: "Wrong phone number format!",
                      },
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                <Form.Item
                  name="matKhau"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                {info.maLoaiNguoiDung !== "KhachHang" && (
                  <Form.Item
                    name="maLoaiNguoiDung"
                    label="Account type"
                    rules={[
                      { required: true, message: "Please choose account type" },
                    ]}
                  >
                    <Select
                      placeholder="Select account type"
                      onChange={onAccountTypeChange}
                    >
                      <Option value="KhachHang">Customer</Option>
                      <Option value="QuanTri">Administrator</Option>
                    </Select>
                  </Form.Item>
                )}

                <Form.Item className="flex justify-center">
                  <Space>
                    <SubmitButton />
                  </Space>
                </Form.Item>
              </Form>
            </div>

            <div className="p-3 m-2 bg-white rounded-lg">
              <div className="mb-3 border-b-2 pb-3">
                <h1 className="font-bold text-xl">Tickets history</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-96 overflow-y-auto">
                {ticketHistory.length > 0 ? (
                  ticketHistory.map((item, index) => (
                    <div key={index}>
                      <p className="font-semibold">
                        Booked date:{" "}
                        {moment(item.ngayDat).format("DD-MM-YYYY | hh:mm")}
                      </p>
                      <p className="font-bold text-xl text-[#fb4226]">
                        Film name: {item.tenPhim}
                      </p>
                      <p className="font-semibold">
                        Time: {item.thoiLuongPhim} minutes, Price:{" "}
                        {item.giaVe.toLocaleString(countryFormat)} VND
                      </p>
                      <p className="font-bold text-xl text-[#008000]">
                        {item.danhSachGhe[0].tenHeThongRap}
                      </p>
                      <p className="font-semibold">
                        {item.danhSachGhe[0].tenCumRap}, Seat:{" "}
                        {item.danhSachGhe.map((itemChild, indexChild) => (
                          <span key={indexChild}>
                            {itemChild.tenGhe}
                            {indexChild === item.danhSachGhe.length - 1
                              ? "."
                              : ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-semibold">No ticket data!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
