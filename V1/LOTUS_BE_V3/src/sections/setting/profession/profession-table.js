import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useApp } from 'src/hooks/use-app';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import ProfessionEdit from './profession-edit';
import ModalDetail from 'src/components/modal-detail';
import styles from '../../../style/index.module.scss';
import { ListProfession } from 'src/contexts/api/setting/api-profession';
import { HANDLERS_PROFESSION } from 'src/contexts/reducer/setting/reducer-profession';

const rows = [];

export default function ProfessionTable() {
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [state, dispatch] = useApp();
  const { profession } = state;
  const { professions } = profession;

    useEffect(() => {
        const listData = async () => {
            const res = await ListProfession();
            dispatch({
                type: HANDLERS_PROFESSION.LIST_PROFESSION,
                payload: res.data,
            });
        };
        listData();
    }, []);

    const dataProfessions = Array.isArray(professions) ? professions.map((profession, index) => ({
      ...profession,
      stt: index + 1,
      id: profession.id || index + 1,
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

  //SetView Data
  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);

    if (filterValue === 'Tất cả') {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter((row) => row.linhvuc === filterValue);
      setFilteredRows(filteredData);
    }
  };

  React.useEffect(() => {
    setActiveFilter('Tất cả');
  }, []);

  const columns = [
    { field: 'code', headerName: 'Mã Ngành Nghề', width: 200 },
    { field: 'jobName', headerName: 'Tên Ngành Nghề', width: 200 },
    { field: 'fieldMarket', headerName: 'Lĩnh Vực', width: 200 },
    // { field: 'fieldMarket', headerName: 'Thị Trường', width: 200 },
    {
      field: 'description',
      headerName: 'Thông Tin Khác',
      width: 200,
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
          className={styles.btn}
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
          onClick={() => handleFilterClick('CNTT')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'CNTT' ? styles.activeFilter : ''}`}
        >
          CNTT
        </Button>
        <Button
          onClick={() => handleFilterClick('Cơ Khí')}
          variant="outlined"
          className={`${styles.itemFilter} ${activeFilter === 'Cơ Khí' ? styles.activeFilter : ''}`}
        >
          Cơ Khí
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
        rows={dataProfessions}
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
        id={selectedRow ? selectedRow.id : null}
      />
    </>
  );
}