import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";
import ActionColumn from "src/components/action-column ";

// Dữ liệu mẫu
const rows = [
  {
    id: 1,
    stt: 1,
    tenCongTy: "Công ty ABC",
    tenGiaoDich: "ABC Corp",
    loaiHinhDoanhNghiep: "Công ty Cổ phần",
    tinhDatTruSo: "Hà Nội",
    diaChi: "123 Đường XYZ, Quận 1, TP.HCM",
    email: "info@abccorp.com",
    soDienThoai: "0123456789",
  },
  {
    id: 2,
    stt: 2,
    tenCongTy: "Công ty XYZ",
    tenGiaoDich: "XYZ Ltd",
    loaiHinhDoanhNghiep: "Công ty Trách nhiệm hữu hạn",
    tinhDatTruSo: "TP.HCM",
    diaChi: "456 Đường ABC, Quận 2, TP.HCM",
    email: "info@xyzltd.com",
    soDienThoai: "0987654321",
  },
  {
    id: 3,
    stt: 3,
    tenCongTy: "Công ty DEF",
    tenGiaoDich: "DEF Inc",
    loaiHinhDoanhNghiep: "Công ty TNHH",
    tinhDatTruSo: "Đà Nẵng",
    diaChi: "789 Đường MNO, Quận 3, TP.HCM",
    email: "info@definc.com",
    soDienThoai: "0369852147",
  },
  {
    id: 4,
    stt: 4,
    tenCongTy: "Công ty GHI",
    tenGiaoDich: "GHI Corporation",
    loaiHinhDoanhNghiep: "Công ty Cổ phần",
    tinhDatTruSo: "Hải Phòng",
    diaChi: "101 Đường PQR, Quận 4, TP.HCM",
    email: "info@ghicorp.com",
    soDienThoai: "0598712346",
  },
  {
    id: 5,
    stt: 5,
    tenCongTy: "Công ty LMN",
    tenGiaoDich: "LMN Group",
    loaiHinhDoanhNghiep: "Công ty TNHH",
    tinhDatTruSo: "Cần Thơ",
    diaChi: "202 Đường STU, Quận 5, TP.HCM",
    email: "info@lmngroup.com",
    soDienThoai: "0287469513",
  },
  {
    id: 6,
    stt: 6,
    tenCongTy: "Công ty KOP",
    tenGiaoDich: "KOP Ltd",
    loaiHinhDoanhNghiep: "Công ty Cổ phần",
    tinhDatTruSo: "Bắc Giang",
    diaChi: "303 Đường WXY, Quận 6, TP.HCM",
    email: "info@kopltd.com",
    soDienThoai: "0712369845",
  },
  {
    id: 7,
    stt: 7,
    tenCongTy: "Công ty TUV",
    tenGiaoDich: "TUV Group",
    loaiHinhDoanhNghiep: "Công ty TNHH",
    tinhDatTruSo: "Long An",
    diaChi: "404 Đường EFG, Quận 7, TP.HCM",
    email: "info@tuvgroup.com",
    soDienThoai: "0956732148",
  },
  {
    id: 8,
    stt: 8,
    tenCongTy: "Công ty WZA",
    tenGiaoDich: "WZA Corporation",
    loaiHinhDoanhNghiep: "Công ty Cổ phần",
    tinhDatTruSo: "Lâm Đồng",
    diaChi: "505 Đường HIJ, Quận 8, TP.HCM",
    email: "info@wzacorp.com",
    soDienThoai: "0321456879",
  },
  {
    id: 9,
    stt: 9,
    tenCongTy: "Công ty PQR",
    tenGiaoDich: "PQR Inc",
    loaiHinhDoanhNghiep: "Công ty TNHH",
    tinhDatTruSo: "Ninh Bình",
    diaChi: "606 Đường UVW, Quận 9, TP.HCM",
    email: "info@pqrinc.com",
    soDienThoai: "0658794213",
  },
  {
    id: 10,
    stt: 10,
    tenCongTy: "Công ty UVX",
    tenGiaoDich: "UVX Ltd",
    loaiHinhDoanhNghiep: "Công ty Cổ phần",
    tinhDatTruSo: "Thái Bình",
    diaChi: "707 Đường KLM, Quận 10, TP.HCM",
    email: "info@uvxltd.com",
    soDienThoai: "0147896325",
  },
];

export default function ProfessionalCertificationTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
      setisDialogEditOpen(false);
  };

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
      field: "tenCongTy",
      headerName: "Công ty",
      width: 150,
    },
    {
      field: "tenGiaoDich",
      headerName: "Tên giao dịch",
      width: 130,
    },
    {
      field: "loaiHinhDoanhNghiep",
      headerName: "Loại hình doanh nghiệp",
      width: 210,
    },
    {
      field: "tinhDatTruSo",
      headerName: "Tỉnh đặt trụ sở",
      width: 120,
    },
    {
      field: "diaChi",
      headerName: "Địa chỉ",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "soDienThoai",
      headerName: "Số điện thoại",
      width: 120,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
        />
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    tenCongTy: true,
    tenGiaoDich: true,
    loaiHinhDoanhNghiep: true,
    tinhDatTruSo: true,
    diaChi: true,
    email: false,
    nguoidaidien: true,
    chinhanh: true,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
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
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
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
