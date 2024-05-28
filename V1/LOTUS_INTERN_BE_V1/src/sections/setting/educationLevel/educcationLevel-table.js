import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import EducationLevelEdit from './educationLevel-edit';
import ModalDetail from 'src/components/modal-detail';
import styles from '../../../style/index.module.scss'
  
const rows = [
  { id: 1,matrinhdo: 1, tentrinhdo: 'Snow', motachitiet: 'Jon' },
  { id: 2,matrinhdo: 2, tentrinhdo: 'Lannister', motachitiet: 'Cersei' },
  { id: 3,matrinhdo: 3, tentrinhdo: 'Lannister', motachitiet: 'Jaime' },
  { id: 4,matrinhdo: 4, tentrinhdo: 'Stark', motachitiet: 'Arya' },
  { id: 5,matrinhdo: 5, tentrinhdo: 'Targaryen', motachitiet: 'Daenerys' },
  { id: 6,matrinhdo: 6, tentrinhdo: 'Melisandre', motachitiet: null },
  { id: 7,matrinhdo: 7, tentrinhdo: 'Clifford', motachitiet: 'Ferrara' },
  { id: 8,matrinhdo: 8, tentrinhdo: 'Frances', motachitiet: 'Rossini' },
  { id: 9,matrinhdo: 9, tentrinhdo: 'Roxie', motachitiet: 'Harvey' },
];

export default function EducationLevelTable() {
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
    { field: 'matrinhdo', headerName: 'Mã Trình Độ Văn Hóa', width: 200 },
    { field: 'tentrinhdo', headerName: 'Tên Trình Độ Văn Hóa', width: 200 },
    { field: 'motachitiet', headerName: 'Mô Tả Chi Tiết', width: 200 },
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
          variant="outlined"
          size='small'
          label="Nhập nội dung tìm kiếm"
        />
        <Button
          className={styles.btn}
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
      <EducationLevelEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        selectedRow={selectedRow}
      />
    </>
  );
}
