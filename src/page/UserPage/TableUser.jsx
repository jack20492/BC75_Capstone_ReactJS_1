import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { userServ } from "../../api/api";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
  ConfigProvider,
  Form,
} from "antd";
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { BASE_URL, MA_NHOM, https } from "../../api/config";

const waitTime = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time));

export default function TableUser({ listUser, fetchListUser }) {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            className="bg-blue-500"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) =>
      visible && setTimeout(() => searchInput.current?.select(), 100),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const deleteUser = (taiKhoan) => {
    userServ
      .deleteUser(taiKhoan)
      .then(() => {
        message.success("Delete successfully!");
        fetchListUser();
      })
      .catch((err) => {
        message.error(err.response?.data ?? err.message);
      });
  };

  const columnsHeader = [
    {
      title: "No.",
      dataIndex: "stt",
      render: (_, record) => listUser.indexOf(record) + 1,
    },
    {
      title: "Username",
      dataIndex: "taiKhoan",
      ...getColumnSearchProps("taiKhoan"),
      render: (taiKhoan) => <p className="truncate">{taiKhoan}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      render: (email) => (
        <p className="truncate">
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      ),
    },
    {
      title: "Full name",
      dataIndex: "hoTen",
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Account type",
      dataIndex: "maLoaiNguoiDung",
      filters: [
        { text: "Admin", value: "QuanTri" },
        { text: "Customer", value: "KhachHang" },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
      render: (tag) => (
        <Tag color={tag === "QuanTri" ? "volcano" : "geekblue"}>
          {tag === "QuanTri" ? "Admin" : "Customer"}
        </Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "soDt",
      ...getColumnSearchProps("soDt"),
      render: (soDt) => (
        <p className="truncate">
          <a href={`tel:${soDt}`}>{soDt}</a>
        </p>
      ),
    },
    {
      title: "Action",
      render: (item) => (
        <Space size="middle">
          <ConfigProvider button={{ className: "bg-blue-500" }}>
            <ModalForm
              submitter={{
                searchConfig: { resetText: "Reset", submitText: "Submit" },
                resetButtonProps: { style: { display: "none" } },
              }}
              title={`Edit account ${item.taiKhoan}`}
              trigger={
                <FormOutlined
                  className="text-xl text-yellow-500 hover:text-yellow-300"
                  onClick={() => form.setFieldsValue({ ...item })}
                />
              }
              form={form}
              autoFocusFirstInput
              modalProps={{ destroyOnClose: true }}
              submitTimeout={2000}
              onFinish={async (values) => {
                await waitTime(2000);
                https
                  .put(`${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
                    ...values,
                    maNhom: MA_NHOM,
                    taiKhoan: item.taiKhoan,
                  })
                  .then(() => {
                    message.success(
                      `Edit account ${item.taiKhoan} successfully!`
                    );
                    fetchListUser();
                  })
                  .catch((err) => message.error(err.response?.data));
                return true;
              }}
            >
              <ProForm.Group>
                <ProFormText
                  name="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  rules={[
                    { type: "email", message: "Invalid E-mail!" },
                    { required: true, message: "Please input E-mail!" },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  name="hoTen"
                  label="Full name"
                  placeholder="John Doe"
                  rules={[
                    { required: true, message: "Please input full name!" },
                    {
                      pattern: /^[\p{L}\s'-]+$/u,
                      message: "Invalid full name format!",
                    },
                  ]}
                />
                <ProFormText
                  name="soDt"
                  label="Phone number"
                  placeholder="0903123123"
                  rules={[
                    {
                      pattern: /^0(?!0)\d{9}$/,
                      message: "Wrong phone number format!",
                    },
                    { required: true, message: "Please input phone number!" },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText.Password
                  name="matKhau"
                  type="password"
                  label="Password"
                  placeholder="Enter password..."
                  rules={[
                    { required: true, message: "Please input password!" },
                    { min: 6, message: "At least 6 characters" },
                  ]}
                />
                <ProFormSelect
                  request={async () => [
                    { value: "QuanTri", label: "Admin" },
                    { value: "KhachHang", label: "Customer" },
                  ]}
                  name="maLoaiNguoiDung"
                  label="Account type"
                  placeholder="Select account type"
                  rules={[
                    { required: true, message: "Please choose account type" },
                  ]}
                />
              </ProForm.Group>
            </ModalForm>
          </ConfigProvider>
          <Popconfirm
            title={`Sure to delete account ${item.taiKhoan}?`}
            okButtonProps={{ className: "bg-blue-500" }}
            onConfirm={() => deleteUser(item.taiKhoan)}
          >
            <DeleteOutlined className="text-xl text-red-500 hover:text-red-300" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      scroll={{ y: 390, x: 1200 }}
      dataSource={listUser}
      columns={columnsHeader}
    />
  );
}
