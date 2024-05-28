import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import BranchEdit from "./branch-edit";

// Dữ liệu mẫu
const rows = [
  {
    stt: 1,
    id: 1,
    tenCongTy: "Công ty A",
    tenPhongBan: "Phòng A1",
    diaChi: "Địa chỉ A1",
    soDienThoai: "123456789",
    nguoiPhuTrach: "Người A1",
    quocGia: "Việt Nam",
  },
  {
    stt: 2,
    id: 2,
    tenCongTy: "Công ty A",
    tenPhongBan: "Phòng A2",
    diaChi: "Địa chỉ A2",
    soDienThoai: "987654321",
    nguoiPhuTrach: "Người A2",
    quocGia: "Việt Nam",
  },
  {
    stt: 3,
    id: 3,
    tenCongTy: "Công ty B",
    tenPhongBan: "Phòng B1",
    diaChi: "Địa chỉ B1",
    soDienThoai: "111222333",
    nguoiPhuTrach: "Người B1",
    quocGia: "Việt Nam",
  },
  {
    stt: 4,
    id: 4,
    tenCongTy: "Công ty B",
    tenPhongBan: "Phòng B2",
    diaChi: "Địa chỉ B2",
    soDienThoai: "444555666",
    nguoiPhuTrach: "Người B2",
    quocGia: "Việt Nam",
  },
  {
    stt: 5,
    id: 5,
    tenCongTy: "Công ty C",
    tenPhongBan: "Phòng C1",
    diaChi: "Địa chỉ C1",
    soDienThoai: "777888999",
    nguoiPhuTrach: "Người C1",
    quocGia: "Việt Nam",
  },
  {
    stt: 6,
    id: 6,
    tenCongTy: "Công ty C",
    tenPhongBan: "Phòng C2",
    diaChi: "Địa chỉ C2",
    soDienThoai: "123123123",
    nguoiPhuTrach: "Người C2",
    quocGia: "Việt Nam",
  },
  {
    stt: 7,
    id: 7,
    tenCongTy: "Công ty D",
    tenPhongBan: "Phòng D1",
    diaChi: "Địa chỉ D1",
    soDienThoai: "456456456",
    nguoiPhuTrach: "Người D1",
    quocGia: "Việt Nam",
  },
  {
    stt: 8,
    id: 8,
    tenCongTy: "Công ty D",
    tenPhongBan: "Phòng D2",
    diaChi: "Địa chỉ D2",
    soDienThoai: "789789789",
    nguoiPhuTrach: "Người D2",
    quocGia: "Việt Nam",
  },
  {
    stt: 9,
    id: 9,
    tenCongTy: "Công ty E",
    tenPhongBan: "Phòng E1",
    diaChi: "Địa chỉ E1",
    soDienThoai: "111111111",
    nguoiPhuTrach: "Người E1",
    quocGia: "Việt Nam",
  },
  {
    stt: 10,
    id: 10,
    tenCongTy: "Công ty E",
    tenPhongBan: "Phòng E2",
    diaChi: "Địa chỉ E2",
    soDienThoai: "222222222",
    nguoiPhuTrach: "Người E2",
    quocGia: "Việt Nam",
  },
];

export default function BranchTable() {
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
    { field: "stt", headerName: "STT", width: 70 },
    {
      field: "tenCongTy",
      headerName: "Tên công ty",
      width: 130,
    },
    {
      field: "tenPhongBan",
      headerName: "Tên phòng ban",
      width: 130,
    },
    {
      field: "diaChi",
      headerName: "Địa chỉ",
      width: 130,
    },
    {
      field: "soDienThoai",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "nguoiPhuTrach",
      headerName: "Người phụ trách chính",
      width: 200,
    },
    {
      field: "quocGia",
      headerName: "Quốc gia",
      width: 150,
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
    fanpageCty: false,
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
      <BranchEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
