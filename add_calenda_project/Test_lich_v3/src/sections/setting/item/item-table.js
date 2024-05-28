import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import ActionColumn from 'src/components/action-column ';
import styles from '../../../style/index.module.scss';
import ItemEdit from './item-edit';
import ModalDetail from 'src/components/modal-detail';
import ListItem from '../../../contexts/api/setting/api-item';

const ItemTable = forwardRef(({ onExport }, ref) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ListItem();
        setFilteredRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = filteredRows.filter(
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
      field: 'action',
      headerName: 'Thao tác',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
        />
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

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
            margin: '12px 0px',
            width: '50%',
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
            },
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        sx={{
          borderColor: 'rgb(224, 224, 224)',
          '& .MuiDataGrid-row': {
            border: '0.1px solid rgb(224, 224, 224) !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ccc ',
            backgroundColor: '#f0f0f0',
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
      <ItemEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        selectedRow={selectedRow}
      />
    </>
  );
});

export default ItemTable;
