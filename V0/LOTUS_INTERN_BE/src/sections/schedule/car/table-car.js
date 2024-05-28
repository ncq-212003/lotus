import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditCar from "./edit-car";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const AvatarCell = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Avatar"
    style={{ width: 59, height: 38, borderRadius: 3 }}
  />
);

const rows = [
  { id: 1, stt: 1, carName: "Lamborghini Veneno", companies: "Công ty Hưng Thịnh", numberOfSeats: "42", licensePlate: "30A-12345", mainSupervisor: "Nguyễn Văn Thảo", avatar: "https://cafefcdn.com/203337114487263232/2023/3/23/av-1679541360549-1679541360687772865104.png" },
  { id: 2, stt: 2, carName: "McLaren Speedtail", companies: "Công ty Hoàng Lâm", numberOfSeats: "34", licensePlate: "51B-67890", mainSupervisor: "Phạm Danh Nam", avatar: "https://vulinhauto.com/wp-content/uploads/2018/11/image008-2.jpg" },
  { id: 3, stt: 3, carName: "Pagani Zonda HP Barchetta", companies: "Công ty Sơn Hà", numberOfSeats: "27", licensePlate: "92C-45678", mainSupervisor: "Nguyễn Công Quyết", avatar: "https://cdnphoto.dantri.com.vn/CLcU5991cxoZFn2UZFkpDgq-Du8=/zoom/1200_630/2023/04/14/cac-cach-goi-xe-taxi-dien-xanh-sm-anh2-crop-1681461555438.jpeg" },
  { id: 4, stt: 4, carName: "Bugatti La Voiture Noire", companies: "Công ty Minh Tâm", numberOfSeats: "34", licensePlate: "43H-98765", mainSupervisor: "Phùng Văn Tiến", avatar: "https://static.automotor.vn/images/upload/2022/08/09/2023-toyota-vios-thailand-autonews.jpeg" },
  { id: 5, stt: 5, carName: "Tesla Model S", companies: "Công ty Đại Phát", numberOfSeats: "18", licensePlate: "43H-98765", mainSupervisor: "Phùng Văn Tiến", avatar: "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1689934611/autoexpress/2023/07/Tesla%20Model%20S%20Plaid%20001_yujihf.jpg" },
  { id: 6, stt: 6, carName: "taxi Thịnh Hưng", companies: "Công ty Đại Phát", numberOfSeats: "51", licensePlate: "14A-246813", mainSupervisor: "Nguyễn Văn Thảo", avatar: "https://taxithinhhung.vn/wp-content/uploads/2018/12/f92c2cae26f5c7ab9ee4.jpg" }
];

export default function TableCar() {
  const [openEditCar, setOpenEditCar] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
    { field: "stt", headerName: "Stt", width: 70 },
    { field: "companies", headerName: "Thuộc công ty", width: 250 },
    { field: "carName", headerName: "Tên xe", width: 250 },
    {
      field: "avatar",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => <AvatarCell imageUrl={params.row.avatar} />,
    },
    { field: "numberOfSeats", headerName: "Số ghế", width: 150 },
    { field: "licensePlate", headerName: "Biển số xe", width: 200 },
    { field: "mainSupervisor", headerName: "Phụ trách chính", width: 200 },
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
        rowData={selectedRow}
      />
    </Stack>
  );
}
