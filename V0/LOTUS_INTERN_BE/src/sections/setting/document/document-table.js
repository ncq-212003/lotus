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
    loaiGiayTo: "Hộ chiếu",
    thuTu: "1",
  },
  {
    id: 2,
    stt: 2,
    loaiGiayTo: "Thẻ căn cước",
    thuTu: "2",
  },
  {
    id: 3,
    stt: 3,
    loaiGiayTo: "Hộ chiếu",
    thuTu: "3",
  },
  {
    id: 4,
    stt: 4,
    loaiGiayTo: "Thẻ căn cước",
    thuTu: "4",
  },
  {
    id: 5,
    stt: 5,
    loaiGiayTo: "Hộ chiếu",
    thuTu: "5",
  },
  {
    id: 6,
    stt: 6,
    loaiGiayTo: "Thẻ căn cước",
    thuTu: "6",
  },
  {
    id: 7,
    stt: 7,
    loaiGiayTo: "Hộ chiếu",
    thuTu: "7",
  },
  {
    id: 8,
    stt: 8,
    loaiGiayTo: "Thẻ căn cước",
    thuTu: "8",
  },
  {
    id: 9,
    stt: 9,
    loaiGiayTo: "Hộ chiếu",
    thuTu: "9",
  },
  {
    id: 10,
    stt: 10,
    loaiGiayTo: "Thẻ căn cước",
    thuTu: "10",
  },
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

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "loaiGiayTo",
      headerName: "Loại giấy tờ",
      width: 200,
    },
    {
      field: "thuTu",
      headerName: "Thứ tự",
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
          label="Nhập loại giấy tờ"
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
