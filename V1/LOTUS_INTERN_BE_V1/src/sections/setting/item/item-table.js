import React, { forwardRef, useImperativeHandle } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import ActionColumn from 'src/components/action-column ';
import styles from '../../../style/index.module.scss'
import ItemEdit from './item-edit';
import ModalDetail from 'src/components/modal-detail';
import * as XLSX from 'xlsx';

const rows = [
  { id: 1, maphong: 1, mataisan: 'Mã Tài Sản 9', tentaisan: 'Jon' },
  { id: 2, maphong: 2, mataisan: 'Mã Tài Sản 1', tentaisan: 'Cersei' },
  { id: 3, maphong: 3, mataisan: 'Mã Tài Sản 2', tentaisan: 'Jaime' },
  { id: 4, maphong: 4, mataisan: 'Mã Tài Sản 3', tentaisan: 'Arya' },
  { id: 5, maphong: 5, mataisan: 'Mã Tài Sản 4', tentaisan: 'Daenerys' },
  { id: 6, maphong: 6, mataisan: 'Mã Tài Sản 5', tentaisan: null },
  { id: 7, maphong: 7, mataisan: 'Mã Tài Sản 6', tentaisan: 'Ferrara' },
  { id: 8, maphong: 8, mataisan: 'Mã Tài Sản 7', tentaisan: 'Rossini' },
  { id: 9, maphong: 9, mataisan: 'Mã Tài Sản 8', tentaisan: 'Harvey' },
];

const ItemTable = forwardRef(({ onExport }, ref) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = React.useState(rows);

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

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = rows.filter(
      (row) =>
        row.maphong.toString().toLowerCase().includes(searchTerm) ||
        row.mataisan.toLowerCase().includes(searchTerm) ||
        (row.tentaisan && row.tentaisan.toLowerCase().includes(searchTerm))
    );
    setFilteredRows(filteredData);
  };

  const columns = [
    { field: 'maphong', headerName: 'Mã Phòng', width: 160 },
    { field: 'mataisan', headerName: 'Mã Tài Sản - Vật Dụng', width: 200 },
    { field: 'tentaisan', headerName: 'Tên Tài Sản - Vật Dụng', width: 200 },
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
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{
            margin: '12px 0px', width: '50%'
          }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
          onChange={handleSearch}
        />
        <Button
          className={styles.btn}
          size="small"
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: '#0c4da2',
            }
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderColor: 'rgb(224, 224, 224)',
          '& .MuiDataGrid-row': {
            border: '0.1px solid rgb(224, 224, 224) !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ccc ',
            backgroundColor: '#f0f0f0',
          }
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
      <ItemEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        selectedRow={selectedRow}
      />
    </>
  );
})

export default ItemTable;
