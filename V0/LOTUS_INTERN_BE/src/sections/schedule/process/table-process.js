import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import EditFormProcess from "./edit-process";
import ActionColumn from "src/components/action-column ";

const rows = [
  { id: 1, stt: 1, title: "Làm việc nhóm", progress: "10%", color: "Red", image: "Hình ảnh 1" },
  { id: 2, stt: 2, title: "Quản lý dự án", progress: "20%", color: "Green", image: "Hình ảnh 2" },
  { id: 3, stt: 3, title: "Báo cáo tiến độ", progress: "60%", color: "Blue", image: "Hình ảnh 3" },
  { id: 4, stt: 4, title: "Phân công nhiệm vụ", progress: "70%", color: "Yellow", image: "Hình ảnh 4" },
  { id: 5, stt: 5, title: "Performance Review", progress: "90%", color: "Orange", image: "Hình ảnh 5" },
  { id: 6, stt: 6, title: "Kết luận dự án", progress: "100%", color: "Purple", image: "Hình ảnh 6" }
];

export default function ProcessTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormProcess, setIsOpenEditProcess] = useState(false);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditFormProcess = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditProcess(true);
  }

  const handleCloseEditProcess = () => {
    setIsOpenEditProcess(false);
  }

  const columns = [
    { field: "stt", headerName: "Stt", width: 70 },
    { field: "title", headerName: "Tiêu đề", width: 200 },
    { field: "progress", headerName: "Tiến trình", width: 100 },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: params.value,
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      ),
    },
    { field: "image", headerName: "Hình ảnh", width: 150 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormProcess}
          params={params}
        />
      ),
    },
  ];

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center'
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: '50%' }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
        />
        <Button
          sx={{
            margin: '8px',
            backgroundColor: '#1C2536',
            color: 'white'
          }}
          size='small'
          variant="contained"
        >Tìm kiếm</Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleViewDetail}
          sx={{
            borderColor: 'rgb(224, 224, 224)',
            '& .MuiDataGrid-row': {
              border: '0.1px solid rgb(224, 224, 224) !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              borderBottom: '1px solid #ccc '
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
      </div>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <EditFormProcess
        openEditFormProcess={isOpenEditFormProcess}
        closeEditFormProcess={handleCloseEditProcess}
        rowData={selectedRow}
      />
    </Stack>
  );
}
