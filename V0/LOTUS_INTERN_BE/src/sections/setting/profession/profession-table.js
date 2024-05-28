import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import ProfessionEdit from './profession-edit';
import ModalDetail from 'src/components/modal-detail';
import styles from '../../../style/index.module.scss'

const rows = [
  { id: 1, manganhnghe: '1', tennganhnghe: 'IT', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 2, manganhnghe: '2', tennganhnghe: 'Cơ khí', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 3, manganhnghe: '3', tennganhnghe: 'Du lịch', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 4, manganhnghe: '4', tennganhnghe: 'Vận Tải', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 5, manganhnghe: '5', tennganhnghe: 'Daenerys', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 6, manganhnghe: '6', tennganhnghe: null, thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 7, manganhnghe: '7', tennganhnghe: 'Ferrara', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 8, manganhnghe: '8', tennganhnghe: 'Rossini', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
  { id: 9, manganhnghe: '9', tennganhnghe: 'Harvey', thitruong: 'Nhật Bản', thongtinkhac: 'Test' },
];

export default function ProfessionTable() {
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  
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

  //SetView Data
  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);

    if (filterValue === 'Tất cả') {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter((row) => row.tennganhnghe === filterValue);
      setFilteredRows(filteredData);
    }
  };

  React.useEffect(() => {
    setActiveFilter('Tất cả');
  }, []);

  const columns = [
    { field: 'manganhnghe', headerName: 'Mã Ngành Nghề', width: 200 },
    { field: 'tennganhnghe', headerName: 'Tên Ngành Nghề', width: 200 },
    { field: 'thitruong', headerName: 'Thị Trường', width: 200 },
    {
      field: 'thongtinkhac',
      headerName: 'Thông Tin Khác',
      width: 300,
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
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{ margin: '12px 0px', width: '50%' }}
          label="Nhập nội dung tìm kiếm"
          size="small"
          variant="outlined"
        />
        <Button
          sx={{
            margin: '8px',
            backgroundColor: '#1C2536',
            color: 'white',
          }}
          size="small"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: '2px' }}>
        <Button
          onClick={() => handleFilterClick('Tất cả')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'Tất cả' ? styles.activeFilter : ''}`}
        >
          Tất cả
        </Button>
        <Button
          onClick={() => handleFilterClick('IT')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'IT' ? styles.activeFilter : ''}`}
        >
          IT
        </Button>
        <Button
          onClick={() => handleFilterClick('Cơ khí')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'Cơ khí' ? styles.activeFilter : ''}`}
        >
          Cơ Khí
        </Button>
        <Button
          onClick={() => handleFilterClick('Phu Ho')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'Phu Ho' ? styles.activeFilter : ''}`}
        >
          Phu Ho
        </Button>
        <Button
          onClick={() => handleFilterClick('Nông Nghiệp')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'Nông Nghiệp' ? styles.activeFilter : ''}`}
        >
          Nông Nghiệp
        </Button>
        <Button
          onClick={() => handleFilterClick('Kinh Doanh')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'Kinh Doanh' ? styles.activeFilter : ''}`}
        >
          Kinh Doanh
        </Button>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        sx={{
          marginTop: '3px !important',
          borderColor: 'rgb(224, 224, 224)',
          '& .MuiDataGrid-row': {
            border: '0.1px solid rgb(224, 224, 224) !important',
          },
          '& .MuiDataGrid-columnHeaders': {
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
      <ProfessionEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        selectedRow={selectedRow}
      />
    </>
  );
}