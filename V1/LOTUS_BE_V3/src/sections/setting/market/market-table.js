import * as React from 'react';
import { useEffect } from 'react';
import { useApp } from 'src/hooks/use-app';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ActionColumn from 'src/components/action-column ';
import MarketEdit from './market-edit';
import ModalDetail from 'src/components/modal-detail';
import { HANDLERS_MARKET } from 'src/contexts/reducer/setting/reducer-market';
import { ListMarket } from 'src/contexts/api/setting/api-market';

const rows = [];

export default function MarketTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [state, dispatch] = useApp();
  const {market} = state;
  const {markets} = market;

  useEffect(() => {
    const listData = async () => {
        const res = await ListMarket();
        dispatch({
            type: HANDLERS_MARKET.LIST_MARKET,
            payload: res.data,
        });
    };
    listData();
}, []);
const dataMarket = Array.isArray(markets) ? markets.map((market, index) => ({
  ...market,
  stt: index + 1,
  id: markets.marketId || index + 1,
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
    { field: 'stt', headerName: 'ID', width: 90 },
    { field: 'marketId', headerName: 'Mã Nước', width: 90 },
    { field: 'marketName', headerName: 'Tên Nước', width: 130 },
    { field: 'avatar', headerName: 'Avatar', width: 130 },
    { field: 'status', headerName: 'Trạng Thái', width: 130 },
    { field: 'description', headerName: 'Giới Thiệu Chi Tiết', width: 180 },
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
      {dataMarket.length === 0 ? (
        <h2>No Data</h2>
      ) : (
        <DataGrid
          rows={dataMarket}
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
        id={selectedRow ? selectedRow.marketId : null}
      />
    </>
  );
}