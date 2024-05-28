import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import EditFormPresent from "./edit-present/edit-form-present";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { listPresentApi } from "src/contexts/api/schedule/api-present";
import { HANDLERS_PRESENT } from "src/contexts/reducer/schedule/reducer-present";
import { useApp } from "src/hooks/use-app";

const AvatarCell = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Avatar"
    style={{ width: 59, height: 38, borderRadius: 3 }}
  />
);

// const rows = [
//   {
//     id: 1,
//     stt: 1,
//     gift_name: "Rượu vang",
//     note: "Mua quà tặng khách hàng Nguyễn Thị Cẩm Tú",
//     logo_img: "https://cdn.tgdd.vn/Files/2021/12/23/1406317/thong-tin-tong-hop-ve-ruou-vang-cac-loai-ruou-vang-pho-bien-202112232218118787.jpg"
//   },
//   {
//     id: 2,
//     stt: 2,
//     gift_name: "Quần áo",
//     note: "Mua quà tặng khách hàng Nguyễn Thị Hằng, ghi chú: Quà tặng đặc biệt cho khách hàng thân thiết",
//     logo_img: "https://dosi-in.com/images/detailed/499/dosiin-dizi-clothing-ao-polo-nam-logo-dizi-thich-hop-cho-mac-hang-ngaythe-thaocong-so-lich-su-49499119.jpg"
//   },
//   {
//     id: 4,
//     stt: 4,
//     gift_name: "Áo khoác",
//     note: "Mua quà tặng khách hàng Trần Văn Cường, ghi chú: Áo khoác thời trang cho mùa đông",
//     logo_img: "https://www.chapi.vn/img/product/2023/8/30/ao-khoac-nam-3-lop-co-dung-bhg-11-500x500.jpg"
//   },
//   {
//     id: 5,
//     stt: 5,
//     gift_name: "Túi xách",
//     note: "Mua quà tặng khách hàng Nguyễn Thị Mai, ghi chú: Túi xách cao cấp thời trang",
//     logo_img: "https://www.gento.vn/wp-content/uploads/2023/05/tui-xach-nu-6-600x600.jpg"
//   },
//   {
//     id: 6,
//     stt: 6,
//     gift_name: "Áo sơ mi",
//     note: "Mua quà tặng khách hàng Lê Văn Tân, ghi chú: Áo sơ mi nam công sở",
//     logo_img: "https://pos.nvncdn.net/a36e05-151378/ps/20230704_yE3iQQyFwW.jpeg"
//   },
// ];

export default function TablePresent() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);

  const [state, dispatch] = useApp();
  const { present } = state;
  const { presents } = present;


  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditFormPresent = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditPresent(true);
  }

  const handleCloseEditPresent = () => {
    setIsOpenEditPresent(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "presentName", headerName: "Tên quà tặng", width: 250 },
    { field: "price", headerName: "Giá tiền", width: 150 },
    { field: "description", headerName: "Chú thích", width: 600 },
    {
      field: "logo_img",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => <AvatarCell imageUrl={params.row.logo_img} />,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormPresent}
          params={params}
        />

      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listPresentApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_PRESENT.LIST_PRESENT,
            payload: response.data
          })
        }

      } catch (error) {
        console.log("Đã xảy ra lỗi . Vui lòng kiểm tra lại");
      }
    }
    fetchData();
  }, [])

  // list dữ liệu thông qua mảng trong ruducer
  const PresentTable = Array.isArray(presents[0]) ? presents[0].map((pre, index) => ({
    ...pre,
    stt: index + 1,
    id: pre.presentId || index + 1,
  })) : []

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
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
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
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

      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={PresentTable}
          columns={columns}
          onRowClick={handleViewDetail}
          sx={{
            borderColor: 'rgb(224, 224, 224)',
            '& .MuiDataGrid-row': {
              border: '0.1px solid rgb(224, 224, 224) !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              borderBottom: '1px solid #ccc '
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
      </Box>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <EditFormPresent
        openEditFormPresent={isOpenEditFormPresent}
        closeEditFormPresent={handleCloseEditPresent}
        rowData={selectedRow}
      />
    </Stack>
  );
}
