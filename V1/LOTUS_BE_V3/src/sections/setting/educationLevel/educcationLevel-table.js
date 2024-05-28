import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import EducationLevelEdit from './educationLevel-edit';
import ModalDetail from 'src/components/modal-detail';
import styles from '../../../style/index.module.scss'
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_EDUCATIONLEVEL } from 'src/contexts/reducer/setting/reducer-educationlevel';
import { ListEducationLevel } from 'src/contexts/api/setting/api-educationlevel';

export default function EducationLevelTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [state, dispatch] = useApp();
  const { educationLevel } = state;
  const { educationlevels } = educationLevel;

  useEffect(() => {
    const listData = async () => {
      const res = await ListEducationLevel();
      dispatch({
        type: HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL,
        payload: res.data,
      });
    };
    listData();
  }, []);

  const dataEducation = Array.isArray(educationlevels) ? educationlevels.map((educationlevel, index) => ({
    ...educationlevel,
    stt: index + 1,
    id: educationlevels.id || index + 1,
  })) : [];

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
    { field: 'educationLevelId', headerName: 'ID', width: 70 },
    { field: 'code', headerName: 'Mã Trình Độ Văn Hóa', width: 200 },
    { field: 'name', headerName: 'Tên Trình Độ Văn Hóa', width: 200 },
    { field: 'description', headerName: 'Mô Tả Chi Tiết', width: 200 },
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
        rows={dataEducation}
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
        id={selectedRow ? selectedRow.id : ''}
      />
    </>
  );
}
