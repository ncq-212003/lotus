import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from '../../../style/index.module.scss';
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
  {
    id: 1,
    stt: 1,
    loailich: "Lịch công tác",
    tenkhachhang: "Nguyễn Bảo Trâm",
    diadiem: "25 Hoàng Cầu ,Láng Hạ",
    ngaybatdau: "20/9/2023",
    ngayketthuc: "21/9/2023",
    noidungcongviec: "Có việc làm quen với khách hàng",
    nguoithamgia: "Phạm thị Tâm, Nguyễn Văn thắng",
    nguoiphutrach: "Phạm Bảo Nam",
    quatang: "Hoa, quần áo",
    tiendo: "10%",
  },
  {
    id: 2,
    stt: 2,
    loailich: "Lịch đón khách",
    tenkhachhang: "Nguyễn Đắc Nam",
    diadiem: "36 Xuân Hòa ,Đống Đa",
    ngaybatdau: "30/10/2023",
    ngayketthuc: "32/10/2023",
    noidungcongviec: "Dón khách sân bay",
    nguoithamgia: "Phạm Hải Nam, Nguyễn Văn thắng",
    nguoiphutrach: "Phạm Bảo Nam",
    quatang: "Hoa, Rượu vang",
    tiendo: "20%",
  },
  {
    id: 3,
    stt: 3,
    loailich: "Lịch họp",
    tenkhachhang: "Trần Thị Hương",
    diadiem: "10 Nguyễn Thị Định, Cầu Giấy",
    ngaybatdau: "5/10/2023",
    ngayketthuc: "5/10/2023",
    noidungcongviec: "Họp đánh giá kế hoạch",
    nguoithamgia: "Nguyễn Văn A, Trần Thị B",
    nguoiphutrach: "Lê Văn C",
    quatang: "Không có",
    tiendo: "100%",
  },
  {
    id: 4,
    stt: 4,
    loailich: "Lịch sinh nhật",
    tenkhachhang: "Nguyễn Thị Linh",
    diadiem: "15 Lê Văn Lương, Thanh Xuân",
    ngaybatdau: "12/11/2023",
    ngayketthuc: "12/11/2023",
    noidungcongviec: "Tổ chức tiệc sinh nhật",
    nguoithamgia: "Nguyễn Văn D, Trần Thị E",
    nguoiphutrach: "Lê Văn F",
    quatang: "Quà bất ngờ",
    tiendo: "50%",
  },
  {
    id: 5,
    stt: 5,
    loailich: "Lịch khám bệnh",
    tenkhachhang: "Trần Văn Gia",
    diadiem: "20 Trần Duy Hưng, Trung Hòa",
    ngaybatdau: "25/11/2023",
    ngayketthuc: "25/11/2023",
    noidungcongviec: "Đi khám tổng quát",
    nguoithamgia: "Nguyễn Văn H, Trần Thị I",
    nguoiphutrach: "Lê Văn J",
    quatang: "Không có",
    tiendo: "0%",
  },
  {
    id: 6,
    stt: 6,
    loailich: "Lịch nghỉ",
    tenkhachhang: "Nguyễn Thị Mỹ",
    diadiem: "5 Nguyễn Tuân, Thanh Xuân",
    ngaybatdau: "1/12/2023",
    ngayketthuc: "3/12/2023",
    noidungcongviec: "Nghỉ ngơi, du lịch",
    nguoithamgia: "Nguyễn Văn K, Trần Thị L",
    nguoiphutrach: "Lê Văn M",
    quatang: "Không có",
    tiendo: "0%",
  },
];
const currentDate = dayjs();

export default function CalendarTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormCalendar, setIsOpenEditCalendar] = useState(false);
  const [valueDate, setValueDate] = useState("1");

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditFormCalendar = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditCalendar(true);
  }

  const handleCloseEditCalendar = () => {
    setIsOpenEditCalendar(false);
  }

  const columns = [
    { field: "stt", headerName: "Stt", width: 70 },
    { field: "loailich", headerName: "Loại lịch", width: 150 },
    { field: "tenkhachhang", headerName: "Khách hàng", width: 200 },
    { field: "diadiem", headerName: "Tên địa điểm", width: 200 },
    { field: "ngaybatdau", headerName: "Ngày bắt đầu", width: 150 },
    { field: "ngayketthuc", headerName: "Ngày kết thúc", width: 150 },
    { field: "noidungcongviec", headerName: "Nội dung công việc", width: 250 },
    { field: "nguoithamgia", headerName: "Người tham gia", width: 200 },
    { field: "nguoiphutrach", headerName: "Người phụ trách", width: 230 },
    { field: "quatang", headerName: "Quà tặng", width: 150 },
    { field: "tiendo", headerName: "Tiến độ", width: 100 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormCalendar}
          params={params}
        />
      ),
    },
  ];

  const handleChange = (event, newValue) => {
    setValueDate(newValue);
  };

  return (
    <Stack
      spacing={3}
      sx={{
        margin: "30px 0px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar defaultValue={currentDate} />
      </LocalizationProvider>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueDate}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Lịch trong ngày" value="1" />
              <Tab label="Lịch theo tuần" value="2" />
              <Tab label="Lịch theo tháng" value="3" />
              <Tab label="Lịch theo năm" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                className={styles.btnSearch}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              <DataGrid
                rows={rows}
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
          </TabPanel>
          <TabPanel value="2">
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
                className={styles.btnSearch}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              {/* <h2>Danh sách</h2> */}
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleViewDetail}
                sx={{
                  borderColor: "rgb(224, 224, 224)",
                  "& .MuiDataGrid-row": {
                    border: "0.1px solid rgb(224, 224, 224) !important",
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
          </TabPanel>
          <TabPanel value="3">
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
                className={styles.btnSearch}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              {/* <h2>Danh sách</h2> */}
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleViewDetail}
                sx={{
                  borderColor: "rgb(224, 224, 224)",
                  "& .MuiDataGrid-row": {
                    border: "0.1px solid rgb(224, 224, 224) !important",
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
          </TabPanel>
          <TabPanel value="4">
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
                className={styles.btnSearch}
                size='small'
                variant="contained"
              >Tìm kiếm</Button>
            </Box>
            <Box style={{ width: "100%" }}>
              {/* <h2>Danh sách</h2> */}
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleViewDetail}
                sx={{
                  borderColor: "rgb(224, 224, 224)",
                  "& .MuiDataGrid-row": {
                    border: "0.1px solid rgb(224, 224, 224) !important",
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
          </TabPanel>
        </TabContext>
      </Box>
      {/* Hiện trang chi tiết khi click vào bảng  */}
      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />
    </Stack>
  );
}