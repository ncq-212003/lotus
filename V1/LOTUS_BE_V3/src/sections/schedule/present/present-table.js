import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditFormPresent from "./present-form-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { listPresentApi } from "src/contexts/api/schedule/api-present";
import { HANDLERS_PRESENT } from "src/contexts/reducer/schedule/reducer-present";
import { useApp } from "src/hooks/use-app";

const AvatarCell = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Avatar"
    style={{ width: 59, height: 38, borderRadius: 3 }}
  />
);

export default function TablePresent() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);

  const [state, dispatch] = useApp();
  const { present } = state;
  const { presents } = present;


  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditFormPresent = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditPresent(true);
  }

  const handleCloseEditPresent = () => {
    setIsOpenEditPresent(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "presentName", headerName: "Tên quà tặng", width: 250 },
    { field: "description", headerName: "Ghi chú", width: 600 },
    {
      field: "logo_img",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => <AvatarCell imageUrl={params.row.logo_img} />,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormPresent}
          params={params}
        />

      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listPresentApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_PRESENT.LIST_PRESENT,
            payload: response.data
          })
        }

      } catch (error) {
        console.log("Đã xảy ra lỗi . Vui lòng kiểm tra lại");
      }
    }
    fetchData();
  }, [])

  // list dữ liệu thông qua mảng trong ruducer
  const PresentTable = Array.isArray(presents[0]) ? presents[0].map((pre, index) => ({
    ...pre,
    stt: index + 1,
    id: pre.presentId || index + 1,
  })) : []

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

      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={PresentTable}
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
      </Box>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <EditFormPresent
        openEditFormPresent={isOpenEditFormPresent}
        closeEditFormPresent={handleCloseEditPresent}
        id={selectedRow ? selectedRow.id : ""}
      />
    </Stack>
  );
}
