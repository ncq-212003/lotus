import dayjs from "dayjs";

const initialStateUnion = {
    unions: [],
    basicInfo: {
        avatar: "",
        maSoNghiepDoan: "",
        tenNghiepDoan: "",
        diaChiWebsite: "",
        tinhTrangTrinhCuc: "",
        maSoCapPhep: "",
        nhanVienChamSoc: "",
        ghiChu: "",
        maSoHopDong: "",
        ngayKyHopDong: dayjs(),
        troCapThangDau: "",
        phiCapDaoTao: "",
        thiTruong: "",
        thanhPho: "",
        diaChi: "",
        soDienThoai: "",
        fax: "",
        hoTenNguoiDaiDien: "",
        chucVu: "",
        phiQuanLy: "",
        touched: {},
        errors: {},
    },
    contact: [],
};

const HANDLERS_UNION = {
    SET_INPUT_UNION: "SET_INPUT_UNION",
    SET_TOUCHED_UNION: "SET_TOUCHED_UNION",
    SET_FIELD_ROW_UNION: "SET_FIELD_ROW_UNION",
    SET_TOUCHED_ROW_UNION: "SET_TOUCHED_ROW_UNION",
    SET_ERRORS_UNION: "SET_ERRORS_UNION",
    SET_ERRORS_ROW_UNION: "SET_ERRORS_ROW_UNION",
    ADD_UNION: "ADD_UNION",
    ADD_ROW_TABLE_UNION: "ADD_ROW_TABLE_UNION",
    DELETE_ROW_TABLE_UNION: "DELETE_ROW_TABLE_UNION",
};

const handlerUnion = {
    //Set input
    [HANDLERS_UNION.SET_INPUT_UNION]: (state, action) => {
        const { tab, fieldName, newValue } = action.payload;
        return {
            ...state,
            [tab]: {
                ...state[tab],
                [fieldName]: newValue,
            },
        };
    },

    // Set touched
    [HANDLERS_UNION.SET_TOUCHED_UNION]: (state, action) => {
        const { tab, fieldName, value } = action.payload;

        return {
            ...state,
            [tab]: {
                ...state[tab],
                touched: { ...state[tab].touched, [fieldName]: value },
            },
        };
    },

    //Set input row
    [HANDLERS_UNION.SET_FIELD_ROW_UNION]: (state, action) => {
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

    //Set touched row
    [HANDLERS_UNION.SET_TOUCHED_ROW_UNION]: (state, action) => {
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

    // Set error
    [HANDLERS_UNION.SET_ERRORS_UNION]: (state, action) => {
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

    //Set error row
    [HANDLERS_UNION.SET_ERRORS_ROW_UNION]: (state, action) => {
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

    //Add union
    [HANDLERS_UNION.ADD_UNION]: (state, action) => {
        const { basicInfo, contact } = action.payload;

        const newUnion = {
            basicInfo: basicInfo,
            contact: contact,
        };

        return {
            ...state,
            unions: [newUnion],
        };
    },


    //Add row table
    [HANDLERS_UNION.ADD_ROW_TABLE_UNION]: (state, action) => {
        const { tab, newRow } = action.payload;
        return {
            ...state,
            [tab]: [...state[tab], { ...newRow }],
        };
    },

    //Delete row
    [HANDLERS_UNION.DELETE_ROW_TABLE_UNION]: (state, action) => {
        const { tab, index } = action.payload;
        const newArray = [...state[tab]];
        newArray.splice(index, 1);
        return {
            ...state,
            [tab]: newArray,
        };
    },

};

const reducerUnion = (state, action) =>
    handlerUnion[action.type] ? handlerUnion[action.type](state, action) : state;

export { initialStateUnion, reducerUnion, HANDLERS_UNION };
