import dayjs from "dayjs";

const initialStateEmployee = {
  employees: [],

  basicInfo: {
    avatar: "",
    employeeCode: "LT0000001",
    deparment: [],
    role: "",
    lastName: "",
    middleName: "",
    firstName: "",
    dob: dayjs(),
    contractSigningDate: dayjs(),
    gender: "1",
    nationality: "Việt Nam",
    phone: "",
    educationalLevel: "",
    marriageStatus: "",
    employeeForm: "Toàn thời gian",
    email: "",
    loginName: "",
    password: "",
    confirmPassword: "",
    status: "isActive",
    citizenIdentity: "",
    dateRange: dayjs(),
    issuedBy: "",
    cityDomicile: "",
    districtDomicile: "",
    wardDomicile: "",
    permanentAddress: "",
    temporaryAddress: "",
    hometownAddress: "",
    issuedPassportBy: "",
    passport: "",
    passportDate: dayjs(),
    passportExpirationDate: dayjs().add(10, "year"),
    touched: {},
    errors: {},
  },

  healthCondition: {
    bloodGroup: "",
    weight: "",
    height: "",
    isAlcohol: "Không lựa chọn",
    isSmoke: "Không lựa chọn",
    eyesightLeft: "",
    eyesightRight: "",
    preferredHand: "Không lựa chọn",
    touched: {},
    errors: {},
  },
};

const HANDLERS_EMPLOYEE = {
  SET_INPUT_EMPLOYEES: "SET_INPUT_EMPLOYEES",
  SET_TOUCHED_EMPLOYEE: "SET_TOUCHED_EMPLOYEE",
  SET_ERRORS_EMPLOYEE: "SET_ERRORS_EMPLOYEE",
  LIST_EMPLOYEES: "LIST_EMPLOYEES",
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
  FIND_EMPLOYEE_BYID: "FIND_EMPLOYEE_BYID",
};

const handlersEmployee = {
  // set touched
  [HANDLERS_EMPLOYEE.SET_TOUCHED_EMPLOYEE]: (state, action) => {
    const { tab, fieldName, newValue } = action.payload;
    return {
      ...state,
      [tab]: {
        ...state[tab],
        touched: { ...state[tab].touched, [fieldName]: newValue },
      },
    };
  },

  // set error
  [HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE]: (state, action) => {
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

  [HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES]: (state, action) => {
    const { tab, fieldName, newValue } = action.payload;

    if (fieldName === "passportDate") {
      const passportExpirationDate = dayjs(newValue).add(10, "year");

      return {
        ...state,
        [tab]: {
          ...state[tab],
          passportDate: newValue,
          passportExpirationDate: passportExpirationDate,
        },
      };
    }

    if (fieldName === "cityDomicile") {
      console.log(newValue.length === 0);
      if (newValue.length === 0) {
        return {
          ...state,
          [tab]: {
            ...state[tab],
            cityDomicile: "",
            districtDomicile: "",
            wardDomicile: ""
          },
        };
      }
    }

    if (fieldName === "districtDomicile") {
      console.log(newValue.length === 0);
      if (newValue.length === 0) {
        return {
          ...state,
          [tab]: {
            ...state[tab],
            districtDomicile: "",
            wardDomicile: "",
          },
        };
      }
    }

    return {
      ...state,
      [tab]: {
        ...state[tab],
        [fieldName]: newValue,
      },
    };
  },

  // list
  [HANDLERS_EMPLOYEE.LIST_EMPLOYEES]: (state, action) => {
    const branchs = action.payload;

    return {
      ...state,
      branchs: [branchs],
    };
  },

  // add
  [HANDLERS_EMPLOYEE.ADD_EMPLOYEES]: (state, action) => {
    const { basicInfo, healthCondition } = action.payload;

    const newEmployee = {
      basicInfo: basicInfo,
      healthCondition: healthCondition,
    };

    return {
      ...state,
      employees: [newEmployee],
    };
  },

  // update
  [HANDLERS_EMPLOYEE.UPDATE_EMPLOYEE]: (state, action) => {
    return state;
  },

  // delete
  [HANDLERS_EMPLOYEE.DELETE_EMPLOYEE]: (state, action) => {
    return {
      branchs: [],
    };
  },

  // find byid
  [HANDLERS_EMPLOYEE.FIND_EMPLOYEE_BYID]: (state, action) => {
    const employee = action.payload;

    return employee;
  },
};

const reducerEmployee = (state, action) =>
  handlersEmployee[action.type] ? handlersEmployee[action.type](state, action) : state;

export { initialStateEmployee, reducerEmployee, HANDLERS_EMPLOYEE };
