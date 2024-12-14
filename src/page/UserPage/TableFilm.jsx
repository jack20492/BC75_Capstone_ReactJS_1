import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
  ConfigProvider,
  Form,
  Select,
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  FieldTimeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { chooseTrailer } from "../../redux/action/user";
import { CHOOSE_TRAILER } from "../../redux/constant/user";
import PlayVideo from "../../component/PlayVideo";
import { BASE_URL, MA_NHOM, https, httpsNoLoading } from "../../api/config";
import { imageUrlRegex, trailerUrlRegex } from "../../constants/regex";
import ModalVideo from "react-modal-video";

// Định nghĩa hình ảnh mặc định
const placeholderImage = "https://via.placeholder.com/150";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function TableFilm(props) {
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [chonHeThongRap, setChonHeThongRap] = useState(null);
  const [chonRap, setChonRap] = useState(null);
  const [hinhAnh, setHinhAnh] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const { listMovie, fetchListMovie } = props;

  useEffect(() => {
    https
      .get(`${BASE_URL}/QuanLyRap/LayThongTinHeThongRap`)
      .then((res) => {
        const newArray = res.data.map((item) => ({
          value: item.maHeThongRap,
          label: item.tenHeThongRap.toUpperCase(),
        }));
        setHeThongRap([...newArray]);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  }, []);

  useEffect(() => {
    if (chonHeThongRap !== null) {
      httpsNoLoading
        .get(
          `${BASE_URL}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${chonHeThongRap}`
        )
        .then((res) => {
          const newArray = res.data.flatMap((item) =>
            item.danhSachRap.map((rapItem) => ({
              value: rapItem.maRap,
              label: item.tenCumRap + ": " + rapItem.tenRap,
            }))
          );
          setCumRap([...newArray]);
        })
        .catch((err) => {
          message.error(err.response.data);
        });
    }
  }, [chonHeThongRap]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  const handleChooseTrailer = (trailer) => {
    let videoId = "";
    if (trailerUrlRegex.test(trailer) || trailer.includes("embed")) {
      const parts = trailer.split("/");
      videoId = parts[parts.length - 1];
    } else {
      const url = new URL(trailer);
      videoId = url.searchParams.get("v");
    }
    dispatch(chooseTrailer(videoId));
  };

  const deleteFilm = (maPhim) => {
    https
      .delete(`${BASE_URL}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
      .then(() => {
        message.success("Delete successfully!");
        fetchListMovie();
      })
      .catch((err) => {
        message.error(err.response.data ?? err.message);
      });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
            size="small"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

  const columnsHeader = [
    {
      title: "Film Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      render: (text) => <a href={text}>Watch Trailer</a>,
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => (
        <img
          src={imageUrlRegex.test(text) ? text : placeholderImage}
          alt="poster"
          className="w-20 h-20 object-cover"
          onError={onImageError}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Popconfirm
          title={`Sure to delete film ${item.tenPhim}?`}
          onConfirm={() => deleteFilm(item.maPhim)}
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={listMovie.map((movie) => ({ ...movie, key: movie.maPhim }))}
        columns={columnsHeader}
      />
    </>
  );
}
