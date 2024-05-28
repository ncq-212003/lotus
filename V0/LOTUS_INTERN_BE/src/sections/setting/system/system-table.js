import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import SystemEdit from './system-edit';
import ModalDetail from 'src/components/modal-detail';

const rows = [
  { id: 1, tencauhinh: 'Snow', alias: 'Jon', key: 35,value:'Demo',group:'Test' },
  { id: 2, tencauhinh: 'Lannister', alias: 'Cersei', key: 42,value:'Demo',group:'Test' },
  { id: 3, tencauhinh: 'Lannister', alias: 'Jaime', key: 45,value:'Demo',group:'Test' },
  { id: 4, tencauhinh: 'Stark', alias: 'Arya', key: 16,value:'Demo',group:'Test' },
  { id: 5, tencauhinh: 'Targaryen', alias: 'Daenerys', key: 35,value:'Demo',group:'Test' },
  { id: 6, tencauhinh: 'Melisandre', alias: null, key: 150,value:'Demo',group:'Test' },
  { id: 7, tencauhinh: 'Clifford', alias: 'Ferrara', key: 44,value:'Demo',group:'Test' },
  { id: 8, tencauhinh: 'Frances', alias: 'Rossini', key: 36,value:'Demo',group:'Test' },
  { id: 9, tencauhinh: 'Roxie', alias: 'Harvey', key: 65,value:'Demo',group:'Test' },
];

export default function SystemTable() {
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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'tencauhinh', headerName: 'Tên Cấu Hình', width: 130 },
    { field: 'alias', headerName: 'Alias', width: 130 },
    { field: 'key', headerName: 'Key', width: 130 },
    {
      field: 'value',
      headerName: 'Value',
      width: 90,
    },
    {
      field: 'group',
      headerName: 'Group',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
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
          variant='outlined'
          size='small'
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
      <SystemEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        selectedRow={selectedRow}
      />
    </>
  );
}