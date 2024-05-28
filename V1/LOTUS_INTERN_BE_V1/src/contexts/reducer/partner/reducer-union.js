import dayjs from "dayjs";

const initialStateUnion = {
    unions: [],
    basicInfo: {
        unionCode: "",
        unionName: "",
        websiteAddress: "",
        submissionStatus: "",
        licenseNumber: "",
        employee: "",
        note: "",
        contractCode: "",
        contractSigningDate: dayjs(),
        firstMonthAllowance: "",
        trainingFee: "",
        market: "",
        city: "",
        address: "",
        phone: "",
        fax: "",
        representative: "",
        role: "",
        managementFee: "",
    },
    contact: {
        fullName: "",
        role: "",
        address: "",
        email: "",
        phone: "",
        note: ""
    },
};

const HANDLERS_UNION = {
    SET_INPUT_UNION: "SET_INPUT_UNION",
    ADD_UNION: "ADD_UNION",
};

const handlerUnion = {
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
    [HANDLERS_UNION.ADD_UNION]: (state, action) => {
        const { basicInfo, contact } = action.payload;

        const newUnion = {
            basicInfo: basicInfo,
            contact: contact,
        };

        return {
            ...state,
            basicInfo: {
                unionCode: "",
                unionName: "",
                websiteAddress: "",
                submissionStatus: "",
                licenseNumber: "",
                employee: "",
                note: "",
                contractCode: "",
                contractSigningDate: dayjs(),
                firstMonthAllowance: "",
                trainingFee: "",
                market: "",
                city: "",
                address: "",
                phone: "",
                fax: "",
                representative: "",
                role: "",
                managementFee: "",

            },
            contact: {
                fullName: "",
                role: "",
                address: "",
                email: "",
                phone: "",
                note: ""
            },
            unions: [newUnion],
        };
    },
};

const reducerUnion = (state, action) =>
    handlerUnion[action.type] ? handlerUnion[action.type](state, action) : state;

export { initialStateUnion, reducerUnion, HANDLERS_UNION };
