import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import EditFormProcess from "./process-edit";
import ActionColumn from "src/components/action-column ";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_PROCESS } from "src/contexts/reducer/schedule/reducer-process";
import { listProcessApi } from "src/contexts/api/schedule/api-process";

export default function ProcessTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormProcess, setIsOpenEditProcess] = useState(false);

  const [state, dispatch] = useApp();
  const { process } = state;
  const { processes } = process;

  // call api list Data
  useEffect(() => {
    const listData = async () => {
      const response = await listProcessApi();
      dispatch({
        type: HANDLERS_PROCESS.LIST_PROCESS,
        payload: response.data
      })
    }
    listData();
  }, [])

  const processTable = Array.isArray(processes[0]) ? processes[0].map((pro, index) => ({
    ...pro,
    stt: index + 1,
    id: pro.processId || index + 1,
  })) : [];

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
    { field: "stt", headerName: "STT", width: 70 },
    { field: "processTitle", headerName: "Tiêu đề", width: 300 },
    {
      field: "processNumber",
      headerName: "Tiến độ",
      width: 100,
      renderCell: (params) => (
        <div>{params.value}%</div>
      ),
    },
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
    { field: "description", headerName: "Ghi chú", width: 350 },
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
          rows={processTable}
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
        id={selectedRow ? selectedRow.id : ""}
      />
    </Stack>
  );
}
