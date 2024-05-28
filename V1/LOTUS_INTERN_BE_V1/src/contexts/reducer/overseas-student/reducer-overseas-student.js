import dayjs from "dayjs";

const initialStateOverseasStudent = {
    duHocSinh: [],
    thongTinCoBan: {
        maHoSo: "PRDHS000001",
        maHocSinh: "ABC000001",
        ngayNhapHoc: dayjs(),
        ho: "",
        tenDem: "",
        ten: "",
        ngaySinh: null,
        gioiTinh: "1",
        tinhTrangHonNhan: "Chưa kết hôn",
        trinhDoVanHoa: "Cao Đẳng",
        maDanToc: "Kinh",
        tonGiao: "Không",
        tienTrinhHoSo: "Không lựa chọn",
        maChuongTrinhThamGia: "",
        ngayDangKy: dayjs(),
        soCCCD: "",
        ngayCapCCCD: dayjs(),
        noiCapCCCD: "",
        noiCapHoChieu: "",
        soHoChieu: "",
        ngayCapHoChieu: dayjs(),
        ngayHetHanHoChieu: dayjs().add(10, "year"),
        soHoSoVisa: "",
        ngayCapVisa: dayjs(),
        ngayHetHanVisa: dayjs().add(2, "year"),
        ngayNhanTCLT: dayjs().add(3, "month"),
        maThanhPho: "",
        maQuan: "",
        maPhuong: "",
        diaChi: "",
        dienThoai: "",
        anhChanDung: "",
        anhToanThan: "",
        muonDi: [],
        canBoTuyenDung: "",
        ketQuaSoTuyen: "",
        kinhNghiem: [],
        nhomNguon: "",
        touched: {},
        errors: {},
    },
    tinhTrangSucKhoe: {
        nhomMau: "",
        canNang: "",
        chieuCao: "",
        uongRuou: "Không lựa chọn",
        hutThuoc: "Không lựa chọn",
        thiLucTrai: "",
        thiLucPhai: "",
        tayThuan: "Không lựa chọn",
        touched: {},
        errors: {},
    },
    nguyenVongTrungTuyen: {
        muonVaoTruongId: "",
        truongTrungTuyenId: "",
        chuyenNganhHocId: "",
        soHocKy: "",
        capHoc: "Không lựa chọn",
        touched: {},
        errors: {},
    },
    daoTao: {
        danhSachLopId: "",
        chuNhiemLop: "Cô Anh",
        soDienThoaiChuNhiemLop: "032265558",
        ngayKhaiGiang: dayjs(),
        ngayKetThuc: dayjs(),
        touched: {},
        errors: {},
    },
    quanHeGiaDinh: [],
    quaTrinhHocTap: [],
    kinhNghiemTrongNuoc: [],
    kinhNghiemNgoaiNuoc: [],
    ghiChuChung: {
        ghiChu: "",
    }
};

const HANDLERS_OVERSEAS_STUDENT = {
    SET_INPUT_OVERSEAS_STUDENT: "SET_INPUT_OVERSEAS_STUDENT",
    ADD_OVERSEAS_STUDENT: "ADD_OVERSEAS_STUDENT",
    DELETE_OVERSEAS_STUDENT: "DELETE_OVERSEAS_STUDENT",
    ADD_ROW_TABLE_OVERSEAS_STUDENT: "ADD_ROW_TABLE_OVERSEAS_STUDENT",
    SET_FIELD_ROW_OVERSEAS_STUDENT: "SET_FIELD_ROW_OVERSEAS_STUDENT",
    DELETE_ROW_TABLE_OVERSEAS_STUDENT: "DELETE_ROW_TABLE_OVERSEAS_STUDENT",
    SET_TOUCHED_OVERSEAS_STUDENT: "SET_TOUCHED_OVERSEAS_STUDENT",
    SET_ERRORS_OVERSEAS_STUDENT: "SET_ERRORS_OVERSEAS_STUDENT",
    SET_TOUCHED_ROW_OVERSEAS_STUDENT: "SET_TOUCHED_ROW_OVERSEAS_STUDENT",
    SET_ERRORS_ROW_OVERSEAS_STUDENT: "SET_ERRORS_ROW_OVERSEAS_STUDENT",
};

const handlersOverseasStudent = {
    //set touched row
    [HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_ROW_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, index, fieldName, value } = action.payload;

        const updatedRowsTouched = [...state[tab]];

        updatedRowsTouched[index].touched = {
            ...updatedRowsTouched[index].touched,
            [fieldName]: value,
        };

        return {
            ...state,
            [tab]: updatedRowsTouched,
        };
    },

    //set error row
    [HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_ROW_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, index, fieldName, newValue } = action.payload;
        const updatedRowsErrors = [...state[tab]];

        updatedRowsErrors[index].errors = {
            ...updatedRowsErrors[index].errors,
            [fieldName]: newValue,
        };

        return {
            ...state,
            [tab]: updatedRowsErrors,
        };
    },

    // set touched
    [HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, fieldName, value } = action.payload;

        return {
            ...state,
            [tab]: {
                ...state[tab],
                touched: { ...state[tab].touched, [fieldName]: value },
            },
        };
    },

    // set error
    [HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, fieldName, newValue } = action.payload;

        return {
            ...state,
            [tab]: {
                ...state[tab],
                errors: {
                    ...state[tab].errors,
                    [fieldName]: newValue,
                },
            },
        };
    },

    // set input
    [HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, fieldName, newValue } = action.payload;
        return {
            ...state,
            [tab]: {
                ...state[tab],
                [fieldName]: newValue,
            },
        };
    },

    //add dhs
    [HANDLERS_OVERSEAS_STUDENT.ADD_OVERSEAS_STUDENT]: (state, action) => {
        const {
            thongTinCoBan,
            tinhTrangSucKhoe,
            daoTao,
            quanHeGiaDinh,
            quaTrinhHocTap,
            kinhNghiemTrongNuoc,
            kinhNghiemNgoaiNuoc,
        } = action.payload;

        const newDuHocSinh = {
            thongTinCoBan: thongTinCoBan,
            tinhTrangSucKhoe: tinhTrangSucKhoe,
            daoTao: daoTao,
            quanHeGiaDinh: quanHeGiaDinh,
            quaTrinhHocTap: quaTrinhHocTap,
            kinhNghiemTrongNuoc: kinhNghiemTrongNuoc,
            kinhNghiemNgoaiNuoc: kinhNghiemNgoaiNuoc,
        };

        return {
            ...state,
            duHocSinh: [newDuHocSinh],
        };
    },

    //delete dhs
    [HANDLERS_OVERSEAS_STUDENT.DELETE_OVERSEAS_STUDENT]: (state, action) => {
        return {
            duHocSinh: [],
        };
    },

    //add row table
    [HANDLERS_OVERSEAS_STUDENT.ADD_ROW_TABLE_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, newRow } = action.payload;
        return {
            ...state,
            [tab]: [...state[tab], { ...newRow }],
        };
    },

    //set input row
    [HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, index, fieldName, newValue } = action.payload;
        const updatedRows = [...state[tab]];

        updatedRows[index] = {
            ...updatedRows[index],
            [fieldName]: newValue,
        };

        return {
            ...state,
            [tab]: updatedRows,
        };
    },

    //delete row
    [HANDLERS_OVERSEAS_STUDENT.DELETE_ROW_TABLE_OVERSEAS_STUDENT]: (state, action) => {
        const { tab, index } = action.payload;
        const newArray = [...state[tab]];
        newArray.splice(index, 1);
        return {
            ...state,
            [tab]: newArray,
        };
    },
};

const reducerOverseasStudent = (state, action) =>
    handlersOverseasStudent[action.type] ? handlersOverseasStudent[action.type](state, action) : state;

export { initialStateOverseasStudent, reducerOverseasStudent, HANDLERS_OVERSEAS_STUDENT };