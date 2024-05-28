import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";

// Dữ liệu mẫu
const rows = [
  { id: 1, stt: 1, tenChuyenNganh: "Chuyên ngành 1", thoiGianDaoTao: "4 năm" },
  { id: 2, stt: 2, tenChuyenNganh: "Chuyên ngành 2", thoiGianDaoTao: "3 năm" },
  { id: 3, stt: 3, tenChuyenNganh: "Chuyên ngành 3", thoiGianDaoTao: "5 năm" },
  { id: 4, stt: 4, tenChuyenNganh: "Chuyên ngành 4", thoiGianDaoTao: "4 năm" },
  { id: 5, stt: 5, tenChuyenNganh: "Chuyên ngành 5", thoiGianDaoTao: "3 năm" },
  { id: 6, stt: 6, tenChuyenNganh: "Chuyên ngành 6", thoiGianDaoTao: "5 năm" },
  { id: 7, stt: 7, tenChuyenNganh: "Chuyên ngành 7", thoiGianDaoTao: "4 năm" },
  { id: 8, stt: 8, tenChuyenNganh: "Chuyên ngành 8", thoiGianDaoTao: "3 năm" },
  { id: 9, stt: 9, tenChuyenNganh: "Chuyên ngành 9", thoiGianDaoTao: "5 năm" },
  { id: 10, stt: 10, tenChuyenNganh: "Chuyên ngành 10", thoiGianDaoTao: "4 năm" },
];

export default function DocumentTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

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

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "tenChuyenNganh",
      headerName: "Tên chuyên ngành",
      width: 200,
    },
    {
      field: "thoiGianDaoTao",
      headerName: "Thời gian đào tạo",
      width: 220,
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
              sx={{ color: "black" }}
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
              sx={{ color: "black" }}
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
          label="Nhập tên chuyên ngành"
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
