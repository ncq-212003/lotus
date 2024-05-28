import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";

// Dữ liệu mẫu
const rows = [
  {
    id: 1,
    stt: 1,
    quocGia: "Việt Nam",
    tenTruong: "Đại học ABC",
    diaChi: "123 Đường XYZ, Quận 1, TP.HCM",
    website: "https://www.abc.edu.vn",
    email: "info@abc.edu.vn",
    soDienThoai: "0123456789",
  },
  {
    id: 2,
    stt: 2,
    quocGia: "Mỹ",
    tenTruong: "University of XYZ",
    diaChi: "456 University Drive, XYZ City",
    website: "https://www.xyzuniversity.edu",
    email: "info@xyzuniversity.edu",
    soDienThoai: "9876543210",
  },
  {
    id: 3,
    stt: 3,
    quocGia: "Anh",
    tenTruong: "London School of ABC",
    diaChi: "789 Oxford Street, London",
    website: "https://www.londonschoolabc.ac.uk",
    email: "info@londonschoolabc.ac.uk",
    soDienThoai: "02012345678",
  },
  {
    id: 4,
    stt: 4,
    quocGia: "Pháp",
    tenTruong: "Université de XYZ",
    diaChi: "101 Rue de l Education, Paris",
    website: "https://www.universitexyz.fr",
    email: "info@universitexyz.fr",
    soDienThoai: "0145678901",
  },
  {
    id: 5,
    stt: 5,
    quocGia: "Đức",
    tenTruong: "Hochschule ABC",
    diaChi: "202 Straße der Wissenschaft, Berlin",
    website: "https://www.hochschuleabc.de",
    email: "info@hochschuleabc.de",
    soDienThoai: "030123456789",
  },
  {
    id: 6,
    stt: 6,
    quocGia: "Nhật Bản",
    tenTruong: "University of XYZ Japan",
    diaChi: "303 University Avenue, Tokyo",
    website: "https://www.xyzuniversity.jp",
    email: "info@xyzuniversity.jp",
    soDienThoai: "0369852147",
  },
  {
    id: 7,
    stt: 7,
    quocGia: "Trung Quốc",
    tenTruong: "北京大学 (Peking University)",
    diaChi: "404 北京大学路, Beijing",
    website: "https://www.pku.edu.cn",
    email: "info@pku.edu.cn",
    soDienThoai: "0956732148",
  },
  {
    id: 8,
    stt: 8,
    quocGia: "Hàn Quốc",
    tenTruong: "서울대학교 (Seoul National University)",
    diaChi: "505 Gwanak-ro, Gwanak-gu, Seoul",
    website: "https://www.snu.ac.kr",
    email: "info@snu.ac.kr",
    soDienThoai: "0321456879",
  },
  {
    id: 9,
    stt: 9,
    quocGia: "Úc",
    tenTruong: "University of ABC Australia",
    diaChi: "606 University Drive, Sydney",
    website: "https://www.abcuniversity.edu.au",
    email: "info@abcuniversity.edu.au",
    soDienThoai: "0658794213",
  },
  {
    id: 10,
    stt: 10,
    quocGia: "Canada",
    tenTruong: "University of XYZ Canada",
    diaChi: "707 University Street, Toronto",
    website: "https://www.xyzuniversity.ca",
    email: "info@xyzuniversity.ca",
    soDienThoai: "0147896325",
  },
];

export default function SchoolTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "quocGia",
      headerName: "Quốc gia",
      width: 80,
    },
    {
      field: "tenTruong",
      headerName: "Tên trường",
      width: 200,
    },
    {
      field: "diaChi",
      headerName: "Địa chỉ",
      width: 220,
    },
    {
      field: "website",
      headerName: "Website",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "soDienThoai",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip title="Chi tiết">
            <IconButton
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                handleViewDetail(params);
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sửa">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleEdit(params.id);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleDelete(params.id);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    stt: true,
    quocGia: true,
    tenTruong: true,
    diaChi: true,
    email: true,
    website: false,
    soDienThoai: true,
  });

  const handleDelete = (index) => {
    const updateUnions = [...rows];

    const deletedUnion = updateUnions.splice(index, 1);

    if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
      console.log("Xóa thông tin của:", deletedUnion[0]);
    }
  };

  const handleEdit = (index) => {
    const updateUnions = [...rows];
    console.log("Chỉnh sửa thông tin của:", updateUnions[index]);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc ",
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
    </div>
  );
}
