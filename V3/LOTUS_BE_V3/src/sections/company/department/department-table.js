import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import DepartmentEdit from "./department-edit";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import { listDepartmentApi } from "src/contexts/api/company/api-department";
import { HANDLERS_DEPARMENT } from "src/contexts/reducer/company/reducer-department";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { useState } from "react";
import { listBranchApi } from "src/contexts/api/company/api-branch";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";

// Dữ liệu mẫu
// const rows = [
//   {
//     stt: 1,
//     id: 1,
//     congTy: "Công ty A",
//     chiNhanh: "Chi nhánh A",
//     tenPhongBan: "Phòng A1",
//     maPhongBan: "PA1",
//     soDienThoaiBan: "123456",
//     nguoiPhuTrachChinh: "Người A1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 1",
//   },
//   {
//     stt: 2,
//     id: 2,
//     congTy: "Công ty A",
//     chiNhanh: "Chi nhánh A",
//     tenPhongBan: "Phòng A2",
//     maPhongBan: "PA2",
//     soDienThoaiBan: "789012",
//     nguoiPhuTrachChinh: "Người A2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 2",
//   },
//   {
//     stt: 3,
//     id: 3,
//     congTy: "Công ty B",
//     chiNhanh: "Chi nhánh B",
//     tenPhongBan: "Phòng B1",
//     maPhongBan: "PB1",
//     soDienThoaiBan: "654321",
//     nguoiPhuTrachChinh: "Người B1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 3",
//   },
//   {
//     stt: 4,
//     id: 4,
//     congTy: "Công ty B",
//     chiNhanh: "Chi nhánh B",
//     tenPhongBan: "Phòng B2",
//     maPhongBan: "PB2",
//     soDienThoaiBan: "987654",
//     nguoiPhuTrachChinh: "Người B2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 4",
//   },
//   {
//     stt: 5,
//     id: 5,
//     congTy: "Công ty C",
//     chiNhanh: "Chi nhánh C",
//     tenPhongBan: "Phòng C1",
//     maPhongBan: "PC1",
//     soDienThoaiBan: "111222",
//     nguoiPhuTrachChinh: "Người C1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 5",
//   },
//   {
//     stt: 6,
//     id: 6,
//     congTy: "Công ty C",
//     chiNhanh: "Chi nhánh C",
//     tenPhongBan: "Phòng C2",
//     maPhongBan: "PC2",
//     soDienThoaiBan: "333444",
//     nguoiPhuTrachChinh: "Người C2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 6",
//   },
//   {
//     stt: 7,
//     id: 7,
//     congTy: "Công ty D",
//     chiNhanh: "Chi nhánh D",
//     tenPhongBan: "Phòng D1",
//     maPhongBan: "PD1",
//     soDienThoaiBan: "555666",
//     nguoiPhuTrachChinh: "Người D1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 7",
//   },
//   {
//     stt: 8,
//     id: 8,
//     congTy: "Công ty D",
//     chiNhanh: "Chi nhánh D",
//     tenPhongBan: "Phòng D2",
//     maPhongBan: "PD2",
//     soDienThoaiBan: "777888",
//     nguoiPhuTrachChinh: "Người D2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 8",
//   },
//   {
//     stt: 9,
//     id: 9,
//     congTy: "Công ty E",
//     chiNhanh: "Chi nhánh E",
//     tenPhongBan: "Phòng E1",
//     maPhongBan: "PE1",
//     soDienThoaiBan: "999000",
//     nguoiPhuTrachChinh: "Người E1",
//     tinhTrang: "Hoạt động",
//     moTa: "Mô tả 9",
//   },
//   {
//     stt: 0,
//     id: 10,
//     congTy: "Công ty E",
//     chiNhanh: "Chi nhánh E",
//     tenPhongBan: "Phòng E2",
//     maPhongBan: "PE2",
//     soDienThoaiBan: "121314",
//     nguoiPhuTrachChinh: "Người E2",
//     tinhTrang: "Ngừng hoạt động",
//     moTa: "Mô tả 10",
//   },
// ];

export default function DepartmentTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [branchNameOption, setBranchNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  const [state, dispatch] = useApp();
  const { department } = state;
  const { departments } = department;

  useEffect(() => {
    const listData = async () => {
      const res = await listDepartmentApi();
      dispatch({
        type: HANDLERS_DEPARMENT.LIST_DEPARTMENT,
        payload: res.data,
      });
    };
    listData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataWithSTT = Array.isArray(departments)
    ? departments.map((x, index) => ({
        ...x,
        stt: index + 1,
        id: x.id || index + 1,
        companyName: companyNameOption.find((com) => com.companyId === x.companyId)?.companyName,
        branchName: branchNameOption.find((com) => com.branchId === x.branchId)?.branchName,
        employeeIdMain: employeeNameMain.find((em) => em.employeeId === x.employeeIdMain)
          ?.employeeName,
      }))
    : [];

  //listCompanyName
  useEffect(() => {
    const listCompanyName = async () => {
      const res = await listCompanyApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const companies = res.data.map((com) => ({
          companyName: com.companyName,
          companyId: com.companyId,
        }));
        setCompanyNameOption(companies);
      }
    };
    listCompanyName();
  }, []);

  //listBranchName
  useEffect(() => {
    const listBranchName = async () => {
      const res = await listBranchApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const branch = res.data.map((com) => ({
          branchName: com.branchName,
          branchId: com.branchId,
        }));
        setBranchNameOption(branch);
      }
    };
    listBranchName();
  }, []);

  //listEmployeeName
  useEffect(() => {
    const listEmployeeName = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const employees = res.data.map((employee) => ({
          employeeName: employee.lastName + " " + employee.middleName + " " + employee.firstName,
          employeeId: employee.employeeId,
        }));
        setEmployeeNameMain(employees);
      }
    };
    listEmployeeName();
  }, []);

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
    { field: "stt", headerName: "STT", width: 30 },
    {
      field: "companyName",
      headerName: "Công ty",
      width: 250,
    },
    {
      field: "branchName",
      headerName: "Chi nhánh",
      width: 130,
    },
    {
      field: "deparmentName",
      headerName: "Tên phòng ban",
      width: 130,
    },
    {
      field: "briefCode",
      headerName: "Mã phòng ban",
      width: 130,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại bàn",
      width: 130,
    },
    {
      field: "employeeIdMain",
      headerName: "Người phụ trách chính",
      width: 150,
    },
    {
      field: "status",
      headerName: "Tình trạng",
      width: 150,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 130,
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

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    email: false,
    sdt: false,
    website: false,
    masothue: false,
    giakinhdoanh: false,
    logo: false,
    nguoidaidien: false,
    chinhanh: false,
    ngaythanhlap: false,
    description: false,
    ghiChu: false,
  });
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
          label="Nhập tên phòng ban tìm kiếm"
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
        rows={dataWithSTT}
        columns={columns}
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
      <DepartmentEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.departmentId : ""}
      />
    </div>
  );
}
