import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import DepartmentEdit from "./department-edit";

// Dữ liệu mẫu
const rows = [
  {
    stt: 1,
    id: 1,
    congTy: "Công ty A",
    chiNhanh: "Chi nhánh A",
    tenPhongBan: "Phòng A1",
    maPhongBan: "PA1",
    soDienThoaiBan: "123456",
    nguoiPhuTrachChinh: "Người A1",
    tinhTrang: "Hoạt động",
    moTa: "Mô tả 1",
  },
  {
    stt: 2,
    id: 2,
    congTy: "Công ty A",
    chiNhanh: "Chi nhánh A",
    tenPhongBan: "Phòng A2",
    maPhongBan: "PA2",
    soDienThoaiBan: "789012",
    nguoiPhuTrachChinh: "Người A2",
    tinhTrang: "Ngừng hoạt động",
    moTa: "Mô tả 2",
  },
  {
    stt: 3,
    id: 3,
    congTy: "Công ty B",
    chiNhanh: "Chi nhánh B",
    tenPhongBan: "Phòng B1",
    maPhongBan: "PB1",
    soDienThoaiBan: "654321",
    nguoiPhuTrachChinh: "Người B1",
    tinhTrang: "Hoạt động",
    moTa: "Mô tả 3",
  },
  {
    stt: 4,
    id: 4,
    congTy: "Công ty B",
    chiNhanh: "Chi nhánh B",
    tenPhongBan: "Phòng B2",
    maPhongBan: "PB2",
    soDienThoaiBan: "987654",
    nguoiPhuTrachChinh: "Người B2",
    tinhTrang: "Ngừng hoạt động",
    moTa: "Mô tả 4",
  },
  {
    stt: 5,
    id: 5,
    congTy: "Công ty C",
    chiNhanh: "Chi nhánh C",
    tenPhongBan: "Phòng C1",
    maPhongBan: "PC1",
    soDienThoaiBan: "111222",
    nguoiPhuTrachChinh: "Người C1",
    tinhTrang: "Hoạt động",
    moTa: "Mô tả 5",
  },
  {
    stt: 6,
    id: 6,
    congTy: "Công ty C",
    chiNhanh: "Chi nhánh C",
    tenPhongBan: "Phòng C2",
    maPhongBan: "PC2",
    soDienThoaiBan: "333444",
    nguoiPhuTrachChinh: "Người C2",
    tinhTrang: "Ngừng hoạt động",
    moTa: "Mô tả 6",
  },
  {
    stt: 7,
    id: 7,
    congTy: "Công ty D",
    chiNhanh: "Chi nhánh D",
    tenPhongBan: "Phòng D1",
    maPhongBan: "PD1",
    soDienThoaiBan: "555666",
    nguoiPhuTrachChinh: "Người D1",
    tinhTrang: "Hoạt động",
    moTa: "Mô tả 7",
  },
  {
    stt: 8,
    id: 8,
    congTy: "Công ty D",
    chiNhanh: "Chi nhánh D",
    tenPhongBan: "Phòng D2",
    maPhongBan: "PD2",
    soDienThoaiBan: "777888",
    nguoiPhuTrachChinh: "Người D2",
    tinhTrang: "Ngừng hoạt động",
    moTa: "Mô tả 8",
  },
  {
    stt: 9,
    id: 9,
    congTy: "Công ty E",
    chiNhanh: "Chi nhánh E",
    tenPhongBan: "Phòng E1",
    maPhongBan: "PE1",
    soDienThoaiBan: "999000",
    nguoiPhuTrachChinh: "Người E1",
    tinhTrang: "Hoạt động",
    moTa: "Mô tả 9",
  },
  {
    stt: 0,
    id: 10,
    congTy: "Công ty E",
    chiNhanh: "Chi nhánh E",
    tenPhongBan: "Phòng E2",
    maPhongBan: "PE2",
    soDienThoaiBan: "121314",
    nguoiPhuTrachChinh: "Người E2",
    tinhTrang: "Ngừng hoạt động",
    moTa: "Mô tả 10",
  },
];

export default function DepartmentTable() {
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
    { field: "stt", headerName: "STT", width: 30 },
    {
      field: "congTy",
      headerName: "Công ty",
      width: 130,
    },
    {
      field: "chiNhanh",
      headerName: "Chi nhánh",
      width: 130,
    },
    {
      field: "tenPhongBan",
      headerName: "Tên phòng ban",
      width: 130,
    },
    {
      field: "maPhongBan",
      headerName: "Mã phòng ban",
      width: 130,
    },
    {
      field: "soDienThoaiBan",
      headerName: "Số điện thoại bàn",
      width: 130,
    },
    {
      field: "nguoiPhuTrachChinh",
      headerName: "Người phụ trách chính",
      width: 150,
    },
    {
      field: "tinhTrang",
      headerName: "Tình trạng",
      width: 150,
    },
    {
      field: "moTa",
      headerName: "Mô tả",
      width: 130,
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
    email: false,
    sdt: false,
    website: false,
    masothue: false,
    giakinhdoanh: false,
    logo: false,
    nguoidaidien: false,
    chinhanh: false,
    ngaythanhlap: false,
    moTa: false,
    ghiChu: false,
  });
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
      <DepartmentEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
