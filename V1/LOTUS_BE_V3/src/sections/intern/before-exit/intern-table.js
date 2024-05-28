import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, styled, Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import InternDetail from "../detail/intern-detail";
import InternEdit from "../edit/intern-edit";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#4b9949",
  borderRadius: "1px",
  "&:hover": {
    backgroundColor: "#4b9949",
    borderColor: "#4b9949",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "#1C2536",
  },
});

const rows = [
  {
    id: 1,
    stt: 1,
    maHoSo: "HS001",
    ngayDangKy: "2023-10-27",
    hoTen: "Nguyễn Bảo A",
    ngaySinh: "1990-05-15",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 2,
    stt: 2,
    maHoSo: "HS002",
    ngayDangKy: "2023-10-28",
    hoTen: "Trần Phương B",
    ngaySinh: "1995-02-20",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Hoàn thành",
  },
  {
    id: 3,
    stt: 3,
    maHoSo: "HS003",
    ngayDangKy: "2023-10-29",
    hoTen: "Lê Bảo C",
    ngaySinh: "1987-11-10",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 4,
    stt: 4,
    maHoSo: "HS004",
    ngayDangKy: "2023-10-30",
    hoTen: "Phạm Phương D",
    ngaySinh: "1998-09-05",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Hoàn thành",
  },
  {
    id: 5,
    stt: 5,
    maHoSo: "HS005",
    ngayDangKy: "2023-10-31",
    hoTen: "Vũ Bảo E",
    ngaySinh: "2001-03-25",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Hoàn thành",
  },
  {
    id: 6,
    stt: 6,
    maHoSo: "HS006",
    ngayDangKy: "2023-11-01",
    hoTen: "Nguyễn Phương F",
    ngaySinh: "1996-07-14",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Hoàn thành",
  },
  {
    id: 7,
    stt: 7,
    maHoSo: "HS007",
    ngayDangKy: "2023-11-02",
    hoTen: "Trần Bảo G",
    ngaySinh: "2000-01-30",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 8,
    stt: 8,
    maHoSo: "HS008",
    ngayDangKy: "2023-11-03",
    hoTen: "Lê Phương H",
    ngaySinh: "1993-04-19",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Lưu tạm",
  },
  {
    id: 9,
    stt: 9,
    maHoSo: "HS009",
    ngayDangKy: "2023-11-04",
    hoTen: "Phạm Bảo I",
    ngaySinh: "1991-08-09",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 10,
    stt: 10,
    maHoSo: "HS010",
    ngayDangKy: "2023-11-05",
    hoTen: "Vũ Phương K",
    ngaySinh: "1997-12-28",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Lưu tạm",
  },
  {
    id: 11,
    stt: 11,
    maHoSo: "HS0011",
    ngayDangKy: "2023-11-02",
    hoTen: "Trần Bảo G",
    ngaySinh: "2000-01-30",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 12,
    stt: 12,
    maHoSo: "HS0012",
    ngayDangKy: "2023-11-03",
    hoTen: "Lê Phương H",
    ngaySinh: "1993-04-19",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Lưu tạm",
  },
  {
    id: 13,
    stt: 13,
    maHoSo: "HS0013",
    ngayDangKy: "2023-11-04",
    hoTen: "Phạm Bảo I",
    ngaySinh: "1991-08-09",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 14,
    stt: 14,
    maHoSo: "HS0014",
    ngayDangKy: "2023-10-29",
    hoTen: "Lê Bảo C",
    ngaySinh: "1987-11-10",
    gioiTinh: "Nam",
    honNhan: "Đã kết hôn",
    trangThai: "Lưu tạm",
  },
  {
    id: 15,
    stt: 15,
    maHoSo: "HS0015",
    ngayDangKy: "2023-10-30",
    hoTen: "Phạm Phương D",
    ngaySinh: "1998-09-05",
    gioiTinh: "Nữ",
    honNhan: "Độc thân",
    trangThai: "Lưu tạm",
  },
];

export default function InternTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("Tất cả");

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
    setisDialogEditOpen(false);
  };

  const openDialogDetail = (params) => {
    setSelectedRow(params.row);
    setisDialogDetailOpen(true);
  };

  const closeDialogDetail = () => {
    setisDialogDetailOpen(false);
  };

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleFilter = (filterType) => {
    let filteredData = rows;

    setActiveFilter(filterType);

    switch (filterType) {
      case "Tất cả":
        filteredData = rows;
        break;
      case "Lưu tạm":
        filteredData = rows.filter((row) => row.gioiTinh === "Nam");
        break;
      case "Chưa sơ tuyển":
        filteredData = rows.filter((row) => row.gioiTinh === "Nữ");
        break;
      // Thêm các trường hợp lọc khác tại đây
      default:
        filteredData = rows;
        break;
    }
    setFilteredRows(filteredData);
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 70,
    },
    {
      field: "maHoSo",
      headerName: "Mã hồ sơ",
      width: 130,
    },
    {
      field: "ngayDangKy",
      headerName: "Ngày đăng ký",
      width: 130,
    },
    {
      field: "hoTen",
      headerName: "Họ và tên",
      width: 200,
    },
    {
      field: "ngaySinh",
      headerName: "Ngày sinh",
      width: 120,
    },
    {
      field: "gioiTinh",
      headerName: "Giới tính",
      width: 100,
    },
    {
      field: "honNhan",
      headerName: "Hôn nhân",
      width: 100,
    },
    { field: "trangThai", headerName: "Trạng thái", width: 100 },

    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <Tooltip title="Chi tiết">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                openDialogDetail(params);
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <ActionColumn
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="edit" // chỉ hiển thị nút "Chỉnh sửa"
          />
          <ActionColumn
            openDialogEdit={openDialogEdit}
            params={params}
            buttonType="delete" // chỉ hiển thị nút "Xóa"
          />
        </>
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    maHoSo: true,
    tienDo: true,
    gioHoc: false,
    loaiPhongHoc: false,
    phongHoc: false,
  });

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
      <Box>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tất cả")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tất cả" ? "#1C2536" : "#4b9949",
          }}
        >
          Tất cả
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Lưu tạm" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Lưu tạm")}
        >
          Lưu tạm
        </BootstrapButton>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Chưa sơ tuyển")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Chưa sơ tuyển" ? "#1C2536" : "#4b9949",
          }}
        >
          Chưa sơ tuyển
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Đang sơ tuyển" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Đang sơ tuyển")}
        >
          Đang sơ tuyển
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Chưa tiến cử" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Chưa tiến cử")}
        >
          Chưa tiến cử
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Ứng viên đơn hàng" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Ứng viên đơn hàng")}
        >
          Ứng viên đơn hàng
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Trúng tuyển" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Trúng tuyển")}
        >
          Trúng tuyển
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Hủy trúng tuyển" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Hủy trúng tuyển")}
        >
          Hủy trúng tuyển
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Trượt đơn hàng" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Trượt đơn hàng")}
        >
          Trượt đơn hàng
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Rút / hủy hồ sơ" ? "#1C2536" : "#6366f1",
          }}
          onClick={() => handleFilter("Rút / hủy hồ sơ")}
        >
          Rút / hủy hồ sơ
        </BootstrapButton>
      </Box>
      <DataGrid
        rows={filteredRows}
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
      <InternDetail
        open={isDialogDetailOpen}
        onClose={closeDialogDetail}
        id={selectedRow ? selectedRow.id : ""}
      />
      <InternEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
