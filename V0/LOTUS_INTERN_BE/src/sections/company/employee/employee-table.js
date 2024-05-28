import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";
import ActionColumn from "src/components/action-column ";
import LoginIcon from "@mui/icons-material/Login";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogContent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, SvgIcon } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";

// Dữ liệu mẫu
const rows = [
  {
    id: 1,
    stt: 1,
    maNv: "NV001",
    tenNhanVien: "Nguyễn Văn A",
    diaChi: "123 Đường ABC, Quận 1, TP.HCM",
    email: "nguyenvana@example.com",
    sdt: "0123456789",
    companyDepartment: "Công ty A - Phòng ban X",
  },
  {
    id: 2,
    stt: 2,
    maNv: "NV002",
    tenNhanVien: "Trần Thị B",
    diaChi: "456 Đường XYZ, Quận 2, TP.HCM",
    email: "tranthib@example.com",
    sdt: "0987654321",
    companyDepartment: "Công ty B - Phòng ban Y",
  },
  {
    id: 3,
    stt: 3,
    maNv: "NV003",
    tenNhanVien: "Lê Văn C",
    diaChi: "789 Đường DEF, Quận 3, TP.HCM",
    email: "levanc@example.com",
    sdt: "0369852147",
    companyDepartment: "Công ty A - Phòng ban X",
  },
  {
    id: 4,
    stt: 4,
    maNv: "NV004",
    tenNhanVien: "Phạm Thị D",
    diaChi: "101 Đường MNO, Quận 4, TP.HCM",
    email: "phamthid@example.com",
    sdt: "0598712346",
    companyDepartment: "Công ty C - Phòng ban Z",
  },
  {
    id: 5,
    stt: 5,
    maNv: "NV005",
    tenNhanVien: "Hoàng Văn E",
    diaChi: "202 Đường PQR, Quận 5, TP.HCM",
    email: "hoangvane@example.com",
    sdt: "0287469513",
    companyDepartment: "Công ty B - Phòng ban Y",
  },
  {
    id: 6,
    stt: 6,
    maNv: "NV006",
    tenNhanVien: "Trịnh Thị F",
    diaChi: "303 Đường UVW, Quận 6, TP.HCM",
    email: "trinhthif@example.com",
    sdt: "0712369845",
    companyDepartment: "Công ty A - Phòng ban X",
  },
  {
    id: 7,
    stt: 7,
    maNv: "NV007",
    tenNhanVien: "Ngô Văn G",
    diaChi: "404 Đường GHI, Quận 7, TP.HCM",
    email: "ngovang@example.com",
    sdt: "0956732148",
    companyDepartment: "Công ty C - Phòng ban Z",
  },
  {
    id: 8,
    stt: 8,
    maNv: "NV008",
    tenNhanVien: "Vũ Thị H",
    diaChi: "505 Đường JKL, Quận 8, TP.HCM",
    email: "vuthih@example.com",
    sdt: "0321456879",
    companyDepartment: "Công ty A - Phòng ban X",
  },
  {
    id: 9,
    stt: 9,
    maNv: "NV009",
    tenNhanVien: "Nguyễn Văn I",
    diaChi: "606 Đường STU, Quận 9, TP.HCM",
    email: "nguyenvani@example.com",
    sdt: "0658794213",
    companyDepartment: "Công ty B - Phòng ban Y",
  },
  {
    id: 10,
    stt: 10,
    maNv: "NV010",
    tenNhanVien: "Lê Thị K",
    diaChi: "707 Đường LMN, Quận 10, TP.HCM",
    email: "lethik@example.com",
    sdt: "0147896325",
    companyDepartment: "Công ty C - Phòng ban Z",
  },
];

export default function EmployeeTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [dialogSystemAccessOpen, setDialogSystemAccessOpen] = React.useState(false);

  const handleDialogSystemAccessOpen = () => {
    setDialogSystemAccessOpen(true);
  };

  const handleDialogSystemAccessClose = () => {
    setDialogSystemAccessOpen(false);
  };

  const handleChange = (event, field) => {
    // Xử lý thay đổi giá trị của các trường dữ liệu
  };
  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };
  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleDelete = (index) => {
    const updateUnions = [...rows];

    const deletedUnion = updateUnions.splice(index, 1);

    if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
      console.log("Xóa thông tin của:", deletedUnion[0]);
    }
  };

  const handleEdit = (index) => {
    const updateUnions = [...rows];
    console.log("Chỉnh sửa thông tin của:", updateUnions[index]);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    email: true,
    sdt: true,
    website: false,
    masothue: false,
    giakinhdoanh: false,
    logo: false,
    nguoidaidien: false,
    chinhanh: false,
    ngaythanhlap: false,
    fanpageCty: false,
    ghiChu: false,
  });

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 10,
    },
    {
      field: "maNv",
      headerName: "Mã nhân viên",
      width: 100,
    },
    {
      field: "tenNhanVien",
      headerName: "Tên nhân viên",
      width: 150,
    },
    {
      field: "companyDepartment",
      headerName: "Công ty - Phòng ban",
      width: 180,
    },
    {
      field: "diaChi",
      headerName: "Địa chỉ",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "sdt",
      headerName: "Số điện thoại",
      width: 120,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
          />
          <Tooltip title="Truy cập hệ thống">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleDialogSystemAccessOpen();
              }}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          size="small"
          label="Nhập mã hoặc tên nhân viên"
          variant="outlined"
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc ",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />

      {/* Truy cập hệ thống */}
      <Dialog open={dialogSystemAccessOpen} onClose={handleDialogSystemAccessClose}>
        <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Truy cập hệ thống
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogSystemAccessClose}
              aria-label="close"
            >
              <SvgIcon fontSize="small">
                <XCircleIcon />
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
              margin: "0 auto",
              maxWidth: "600px",
            }}
          >
            <TextField
              // onChange={(event) => handleChange(event, "loginName")}
              // value={loginName}
              variant="outlined"
              label="Tên người dùng"
              fullWidth
              name="loginName"
              sx={{ flex: 1, mr: 1, marginBottom: "10px" }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <TextField
                // onChange={(event) => handleChange(event, "password")}
                // value={password}
                variant="outlined"
                label="Mật khẩu"
                fullWidth
                name="password"
                sx={{ flex: 1, mr: 1, marginBottom: "10px" }}
              />
              <TextField
                // onChange={(event) => handleChange(event, "confirmPassword")}
                // value={confirmPassword}
                variant="outlined"
                label="Xác nhận mật khẩu"
                fullWidth
                name="confirmPassword"
                sx={{ flex: 1, mr: 1 }}
              />
            </Box>
            <FormLabel>Trạng thái</FormLabel>
            <RadioGroup
              row
              name="status"
              // value={status}
              // onChange={(event) => handleChange(event, "status")}
            >
              <FormControlLabel
                value="isActive"
                control={<Radio size="small" />}
                label="Đang hoạt động"
              />
              <FormControlLabel value="locked" control={<Radio size="small" />} label="Khóa" />
            </RadioGroup>
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              paddingLeft: "40px",
              paddingRight: "40px",
              margin:" 0 20px 20px",
              fontSize: 16,
              backgroundColor: "#1C2536",
            }}
          >
            Lưu
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}
