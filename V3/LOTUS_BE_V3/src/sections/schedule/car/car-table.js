import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditCar from "./car-edit";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { listCarApi } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { findCarByIdApi } from "src/contexts/api/schedule/api-car";
import { SearchName } from "src/components/search-name";

const AvatarCell = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Avatar"
    style={{ width: 59, height: 38, borderRadius: 3 }}
  />
);

export default function TableCar() {
  const [openEditCar, setOpenEditCar] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [state, dispatch] = useApp();
  const { car } = state;
  const { cars } = car;

  const handleOpenEditCar = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setOpenEditCar(true);
  };

  const handleCloseEditCar = () => {
    setOpenEditCar(false);
  }

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "companyName", headerName: "Thuộc công ty", width: 400 },
    { field: "carName", headerName: "Tên xe", width: 250 },
    {
      field: "avatar",
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
    { field: "numberSeats", headerName: "Số ghế", width: 150 },
    { field: "carNumber", headerName: "Biển số xe", width: 200 },
    { field: "employeeIdMain", headerName: "Phụ trách chính", width: 200 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditCar}
          params={params}
        />
      ),
    },
  ];

  // call api list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCarApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_CAR.LIST_CAR,
            payload: response.data
          })
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi !!!", error)
      }
    };
    fetchData();
  }, [])

  // listCompanyName theo id 
  useEffect(() => {
    const listCompanyName = async () => {
      const response = await listCompanyApi();
      if (Array.isArray(response.data) && response.data.length > 0) {
        const companies = response.data.map((com) => ({
          companyName: com.companyName,
          companyId: com.companyId
        }))
        setCompanyNameOption(companies);
      }
    }
    listCompanyName();
  }, []);

  const carTable = Array.isArray(cars[0]) ? cars[0].map((car, index) => ({
    ...car,
    stt: index + 1,
    id: car.carId || index + 1,
    companyName: companyNameOption.find((com) => com.companyId === car.companyId)?.companyName,
  })) : [];


  useEffect(() => {
    const finData = async () => {
      const response = await findCarByIdApi(1);
      if (response.status === 200) {
        console.log(response.data);
      } else {
        alert("lỗi");
      }
    }
    finData();
  }, [])

  const onchange1 = (tiems) => {
    console.log("checkkk", tiems)
  }

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
      <SearchName
        name="Xe"
        listData={carTable}
        optionName="carName"
        onSearch={onchange1}
      />
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={carTable}
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

      <EditCar
        openEditCar={openEditCar}
        closeEditCar={handleCloseEditCar}
        id={selectedRow ? selectedRow.id : ""}
      />
    </Stack>
  );
}
