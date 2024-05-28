import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import MarketEdit from './market-edit';
import ModalDetail from 'src/components/modal-detail';

const rows = [
  { id: 1, manuoc: '1', tennuoc: 'Jon', phimoigioi: 35,gioithieu:'abcdef' },
  { id: 2, manuoc: '2', tennuoc: 'Cersei', phimoigioi: 42,gioithieu:'abcdef' },
  { id: 3, manuoc: '3', tennuoc: 'Jaime', phimoigioi: 45,gioithieu:'abcdef' },
  { id: 4, manuoc: '4', tennuoc: 'Arya', phimoigioi: 16,gioithieu:'abcdef' },
  { id: 5, manuoc: '5', tennuoc: 'Daenerys', phimoigioi: 35,gioithieu:'abcdef' },
  { id: 6, manuoc: '6', tennuoc: null, phimoigioi: 150,gioithieu:'abcdef' },
  { id: 7, manuoc: '7', tennuoc: 'Ferrara', phimoigioi: 44,gioithieu:'abcdef' },
  { id: 8, manuoc: '8', tennuoc: 'Rossini', phimoigioi: 36,gioithieu:'abcdef' },
  { id: 9, manuoc: '9', tennuoc: 'Harvey', phimoigioi: 65,gioithieu:'abcdef' },
];

export default function MarketTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'manuoc', headerName: 'Mã Nước', width: 90 },
    { field: 'tennuoc', headerName: 'Tên Nước', width: 130 },
    {
      field: 'phimoigioi',
      headerName: 'Phí Môi Giới',
      width: 200,
    },
    { field: 'gioithieu', headerName: 'Giới Thiệu Chi Tiết', width: 130 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
        />
      ),
    },
  ];

  return (
    <>
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
          variant="outlined"
          label="Nhập nội dung tìm kiếm"
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
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderColor: 'rgb(224, 224, 224)',
          '& .MuiDataGrid-row': {
            border: '0.1px solid rgb(224, 224, 224) !important',
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
      <MarketEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        selectedRow={selectedRow}  
      />
    </>
  );
}