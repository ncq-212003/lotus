import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import EditFormAddress from "./edit-address/edit-form-address";
import ActionColumn from "src/components/action-column ";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { listAddress } from "src/contexts/api/schedule/api-address";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_LOCATION } from "src/contexts/reducer/location/reducer-location";
import { listCitiesApi, listDistrictsApi, listWardsApi } from "src/contexts/api/location/api-location";


// const rows = [
//   {
//     id: 1,
//     stt: 1,
//     locationName: 'Nhà hàng Nam Phương',
//     contactPerson: 'Nguyễn Thị Tâm',
//     phoneNumber: '04857456374',
//     mobileNumber: '054365634',
//     cityProvince: 'Hà Nội',
//     district: 'Thanh Xuân',
//     ward: 'Tân Tiến',
//     longitude: '85*',
//     latitude: '36*',
//     type: 'Nhà hàng',
//   },
//   {
//     id: 2,
//     stt: 2,
//     locationName: 'Nhà hàng Mỹ Lệ',
//     contactPerson: 'Nguyễn Văn Nam',
//     phoneNumber: '0436523456',
//     mobileNumber: '0987654321',
//     cityProvince: 'Thái Bình',
//     district: 'Đống Đa',
//     ward: 'Tân Tiến',
//     longitude: '106*',
//     latitude: '10*',
//     type: 'Sân bay',
//   },
//   {
//     id: 3,
//     stt: 3,
//     locationName: 'Nhà hàng Hoàng Yến',
//     contactPerson: 'Trần Thị Hương',
//     phoneNumber: '0245678910',
//     mobileNumber: '0912345678',
//     cityProvince: 'Hà Nội',
//     district: 'Hai Bà Trưng',
//     ward: 'Trung Hòa',
//     longitude: '105*',
//     latitude: '21*',
//     type: 'Nhà hàng',
//   },
//   {
//     id: 5,
//     stt: 5,
//     locationName: 'Nhà hàng Hoa Sữa',
//     contactPerson: 'Phạm Thị Hiền',
//     phoneNumber: '0567891234',
//     mobileNumber: '0823456789',
//     cityProvince: 'Vĩnh Phúc',
//     district: 'Vĩnh Tường',
//     ward: 'Hoàng Liệt',
//     longitude: '108*',
//     latitude: '15*',
//     type: 'Quán cafe',
//   },
//   {
//     id: 6,
//     stt: 6,
//     locationName: 'Nhà hàng Lẩu Quê',
//     contactPerson: 'Trần Văn Thắng',
//     phoneNumber: '0398765432',
//     mobileNumber: '0976543210',
//     cityProvince: 'Hà Nội',
//     district: 'Hai Bà Trưng',
//     ward: 'Láng Thượng',
//     longitude: '105*',
//     latitude: '21*',
//     type: 'Nhà hàng',
//   }
// ];

export default function Addresstable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormAddress, setIsOpenEditAddress] = useState(false);
  const [state, dispatch] = useApp();
  const { address } = state;
  const { addresses } = address;
  const [cityByName, setCityByName] = useState([]);
  const [districtsByName, setDistrictsByName] = useState([]);
  const [cityId, setCityId] = useState(null);
  // 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAddress();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: response.data
          })
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi !!!", error)
      }
    }
    fetchData();
  }, [])

  //listLocationName
  useEffect(() => {
    const listCity = async () => {
      const res = await listCitiesApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const citys = res.data.map((location) => ({
          id: location.id,
          name: location.name
        }));
        setCityByName(citys);
      }
    };
    listCity();
  }, []);

  // findDistrict by id

  useEffect(() => {
    const listDistriscts = async (cityId) => {
      const response = await listDistrictsApi(cityId);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const districts = response.data.map((dis) => ({
          id: dis.id,
          name: dis.name
        }))
        setDistrictsByName(districts);
      }
    }
    listDistriscts(cityId)
  }, [])


  const listDataTable = Array.isArray(addresses[0]) ? addresses[0].map((add, index) => ({
    ...add,
    stt: index + 1,
    id: add.id || index + 1,
    nameCity: cityByName.find((city) => city.id === add.cityId)?.name,
    // nameDistrict: districtsByName.find((dis) => dis.id === add.districtId)?.name,
  })) : [];




  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditFormAddress = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditAddress(true);
  }

  const handleCloseEditAddress = () => {
    setIsOpenEditAddress(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "placeName", headerName: "Tên địa điểm", width: 200 },
    { field: "manager", headerName: "Người liên hệ", width: 200 },
    { field: "contactPhone", headerName: "Số điện thoại ", width: 200 },
    // { field: "mobileNumber", headerName: "Số điện thoại di động", width: 200 },
    { field: "nameCity", headerName: "Tỉnh/ Thành phố", width: 200 },
    { field: "districtId", headerName: "Quận/ Huyện", width: 200 },
    { field: "wardId", headerName: "Xã/ Phường", width: 200 },
    { field: "geoX", headerName: "Kinh độ", width: 120 },
    { field: "geoY", headerName: "Vĩ Độ", width: 120 },
    { field: "type", headerName: "Loại", width: 150 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormAddress}
          params={params}
        />
      ),
    },
  ];

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
      <Box style={{ width: "100%" }}>
        <DataGrid
          rows={listDataTable}
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

        <ModalDetail
          open={isModalDetailOpen}
          onClose={handleCloseDetail}
          rowData={selectedRow}
          columns={columns}
        />

        <EditFormAddress
          openEditFormAdress={isOpenEditFormAddress}
          closeEditFormAdress={handleCloseEditAddress}
          rowData={selectedRow}
        />
      </Box>
    </Stack>
  );
}
