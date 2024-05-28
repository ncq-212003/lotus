
import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import { Visibility, Edit, Delete } from "@mui/icons-material";

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

export const TabbleEveryoneCalendar = () => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditEveryoneCalendar = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditPresent(true);
  }

  const handleCloseEveryoneCalendar = () => {
    setIsOpenEditPresent(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "loailich", headerName: "Loại lịch", width: 150 },
    { field: "tenkhachhang", headerName: "Khách hàng", width: 200 },
    { field: "diadiem", headerName: "Tên địa điểm", width: 300 },
    { field: "ngaybatdau", headerName: "Ngày bắt đầu", width: 150 },
    { field: "ngayketthuc", headerName: "Ngày kết thúc", width: 150 },
    { field: "noidungcongviec", headerName: "Nội dung công việc", width: 250 },
    { field: "nguoithamgia", headerName: "Người tham gia", width: 300 },
    { field: "nguoiphutrach", headerName: "Người phụ trách", width: 230 },
    { field: "quatang", headerName: "Quà tặng", width: 150 },
    { field: "tiendo", headerName: "Tiến độ", width: 100 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 80,
      renderCell: (params) => (
        <Tooltip title="Chi tiết">
          <IconButton
            sx={{ color: "black" }}
            onClick={(event) => {
              event.stopPropagation();
              handleViewDetail(params);
            }}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Box style={{ width: "100%", marginTop: "20px" }}>
        <Box display={"flex"}>
          <Typography sx={{ ml: 2, fontWeight: 700 }} >
            Nhân viên:
          </Typography>
          <Typography sx={{ ml: 2, marginBottom: "20px", fontWeight: 400 }}>
            Nguyễn Văn Bảo
          </Typography>
        </Box>
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

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />
    </>

  )
}