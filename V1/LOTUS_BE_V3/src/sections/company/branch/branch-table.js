import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import BranchEdit from "./branch-edit";
import { listBranchApi } from "src/contexts/api/company/api-branch";
import { HANDLERS_BRANCH } from "src/contexts/reducer/company/reducer-branch";
import { useApp } from "src/hooks/use-app";
import { findCompanyByIdApi, listCompanyApi } from "src/contexts/api/company/api-company";
import { useEffect, useState } from "react";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";

// Dữ liệu mẫu
// const rows = [
//   {
//     stt: 1,
//     id: 1,
//     tenCongTy: "Công ty A",
//     tenPhongBan: "Phòng A1",
//     diaChi: "Địa chỉ A1",
//     soDienThoai: "123456789",
//     nguoiPhuTrach: "Người A1",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 2,
//     id: 2,
//     tenCongTy: "Công ty A",
//     tenPhongBan: "Phòng A2",
//     diaChi: "Địa chỉ A2",
//     soDienThoai: "987654321",
//     nguoiPhuTrach: "Người A2",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 3,
//     id: 3,
//     tenCongTy: "Công ty B",
//     tenPhongBan: "Phòng B1",
//     diaChi: "Địa chỉ B1",
//     soDienThoai: "111222333",
//     nguoiPhuTrach: "Người B1",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 4,
//     id: 4,
//     tenCongTy: "Công ty B",
//     tenPhongBan: "Phòng B2",
//     diaChi: "Địa chỉ B2",
//     soDienThoai: "444555666",
//     nguoiPhuTrach: "Người B2",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 5,
//     id: 5,
//     tenCongTy: "Công ty C",
//     tenPhongBan: "Phòng C1",
//     diaChi: "Địa chỉ C1",
//     soDienThoai: "777888999",
//     nguoiPhuTrach: "Người C1",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 6,
//     id: 6,
//     tenCongTy: "Công ty C",
//     tenPhongBan: "Phòng C2",
//     diaChi: "Địa chỉ C2",
//     soDienThoai: "123123123",
//     nguoiPhuTrach: "Người C2",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 7,
//     id: 7,
//     tenCongTy: "Công ty D",
//     tenPhongBan: "Phòng D1",
//     diaChi: "Địa chỉ D1",
//     soDienThoai: "456456456",
//     nguoiPhuTrach: "Người D1",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 8,
//     id: 8,
//     tenCongTy: "Công ty D",
//     tenPhongBan: "Phòng D2",
//     diaChi: "Địa chỉ D2",
//     soDienThoai: "789789789",
//     nguoiPhuTrach: "Người D2",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 9,
//     id: 9,
//     tenCongTy: "Công ty E",
//     tenPhongBan: "Phòng E1",
//     diaChi: "Địa chỉ E1",
//     soDienThoai: "111111111",
//     nguoiPhuTrach: "Người E1",
//     quocGia: "Việt Nam",
//   },
//   {
//     stt: 10,
//     id: 10,
//     tenCongTy: "Công ty E",
//     tenPhongBan: "Phòng E2",
//     diaChi: "Địa chỉ E2",
//     soDienThoai: "222222222",
//     nguoiPhuTrach: "Người E2",
//     quocGia: "Việt Nam",
//   },
// ];

export default function BranchTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  const [state, dispatch] = useApp();
  const { branch, menu } = state;
  const { branchs } = branch;

  useEffect(() => {
    const listData = async () => {
      const res = await listBranchApi();
      dispatch({
        type: HANDLERS_BRANCH.LIST_BRANCH,
        payload: res.data,
      });
    };
    listData();
  }, []);

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

  const branchWithSTT = Array.isArray(branchs)
    ? branchs.map((branch, index) => ({
        ...branch,
        stt: index + 1,
        id: branch.id || index + 1,
        companyName:  companyNameOption.find((com) => com.companyId === branch.companyId)?.companyName ,
        employeeNameMain: employeeNameMain.find((em) => em.employeeId === branch.employeeIdId)?.employeeName || null,
      }))
    : [];

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
    { field: "stt", headerName: "STT", width: 70 },
    {
      field: "companyName",
      headerName: "Tên công ty",
      width: 130,
    },
    {
      field: "branchName",
      headerName: "Tên Chi Nhánh",
      width: 130,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 130,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "website",
      headerName: "Website",
      width: 200,
    },
    {
      field: "employeeNameMain",
      headerName: "Người phụ trách chính",
      width: 200,
    },
    {
      field: "country",
      headerName: "Quốc gia",
      width: 150,
    },
    {
      field: "description",
      headerName: "Ghi chú",
      width: 150,
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
    description: false,
    country: false,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={branchWithSTT}
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
      <BranchEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
