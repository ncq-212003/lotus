import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import MarketEdit from './market-edit';
import ModalDetail from 'src/components/modal-detail';

const rows = [
  { id: 1, manuoc: '1', tennuoc: 'Jon', gioithieu: 'abcdef' },
  { id: 2, manuoc: '2', tennuoc: 'Cersei', gioithieu: 'abcdef' },
  { id: 3, manuoc: '3', tennuoc: 'Jaime', gioithieu: 'abcdef' },
  { id: 4, manuoc: '4', tennuoc: 'Arya', gioithieu: 'abcdef' },
  { id: 5, manuoc: '5', tennuoc: 'Daenerys', gioithieu: 'abcdef' },
  { id: 6, manuoc: '6', tennuoc: null, gioithieu: 'abcdef' },
  { id: 7, manuoc: '7', tennuoc: 'Ferrara', gioithieu: 'abcdef' },
  { id: 8, manuoc: '8', tennuoc: 'Rossini', gioithieu: 'abcdef' },
  { id: 9, manuoc: '9', tennuoc: 'Harvey', gioithieu: 'abcdef' },
];

export default function MarketTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
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

  //Search
  const handleSeach = () => {
    const dataSearch = rows.filter(
      (row) =>
        row.manuoc.includes(searchValue) ||
        (row.tennuoc ?? '').includes(searchValue) ||
        row.gioithieu.includes(searchValue)
    );
    setFilteredRows(dataSearch)
  }

  //Enter Press
  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSeach()
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'manuoc', headerName: 'Mã Nước', width: 90 },
    { field: 'tennuoc', headerName: 'Tên Nước', width: 130 },
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <Button
          sx={{
            margin: '8px',
            backgroundColor: '#1C2536',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0c4da2',
            },
          }}
          size='small'
          variant="contained"
          onClick={handleSeach}
        >Tìm kiếm</Button>
      </Box>
      {filteredRows.length === 0 ? (
        <h2>No Data</h2>
      ) : (
        <DataGrid
          rows={filteredRows}
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
      )}
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