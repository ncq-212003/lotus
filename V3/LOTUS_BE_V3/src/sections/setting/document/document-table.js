import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { useApp } from "src/hooks/use-app";
import { ListDocumentApi } from "src/contexts/api/setting/api-document";
import { HANDLERS_DOCUMENT } from "src/contexts/reducer/setting/reducer-document";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import EditDocument from "./document-edit";

export default function DocumentTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [state, dispatch] = useApp();
  const { document } = state;
  const { documents } = document;

  const [paper, setPaper] = useState([
    { id: 1, name: "Căn cước công dân/ CMND" },
    { id: 2, name: "Giấy xác nhận" },
    { id: 3, name: "Loại thông báo" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ListDocumentApi();
        if (response.status == 200) {
          dispatch({
            type: HANDLERS_DOCUMENT.LIST_DOCUMENTS,
            payload: response.data,
          });
        }
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
  }, []);

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
    { field: "stt", headerName: "STT", width: 50 },
    { field: "typePaper", headerName: "Loại giấy tờ", width: 250 },
    { field: "paperName", headerName: "Tên giấy tờ", width: 200 },
    { field: "paperOrder", headerName: "Thứ tự", width: 100 },
    { field: "code", headerName: "Mã giấy tờ", width: 150 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
        />
      ),
    },
  ];

  const rowData = Array.isArray(documents[0]) ? documents[0].map((doc, index) => ({
    ...doc,
    stt: index + 1,
    id: doc.id || index + 1,
    typePaper: paper.find(items => items.id === (parseInt(doc.field1) || 0))?.name
  })) : []

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
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowData}
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
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <EditDocument
        openEdit={isDialogEditOpen}
        onCloseEdit={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
