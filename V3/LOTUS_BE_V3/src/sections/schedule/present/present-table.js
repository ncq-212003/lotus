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
import { SearchName } from "src/components/search-name";

export default function TablePresent() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);
  //hàm search
  const [filteredName, setFilteredName] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);

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
      field: "field1",
      headerName: "Hình ảnh",
      width: 120,
      renderCell: (params) => (
        <img
          src={'https://lotus.i.tisbase.online' + params.value}
          alt="Hinhanh"
          style={{
            height: 40,
            width: 40,
            borderRadius: '50%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      )
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
        setIsLoadData(true); // thêm true
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

  // Tìm kiếm 
  const handleSearch = (searchValue) => {
    if (searchValue === null) {
      setFilteredName(PresentTable);
    } else {
      const filteredData = PresentTable.filter((item) =>
        item.presentName.toLowerCase() === searchValue.toLowerCase()
      );
      setFilteredName(filteredData);
    }
  };

  useEffect(() => {
    if (isLoadData === true) {
      setFilteredName(PresentTable);
    }
  }, [isLoadData])

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >

      <SearchName
        name="Quà tặng"
        listData={PresentTable}
        optionName="presentName"
        onSearch={handleSearch}
      />

      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredName}
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
