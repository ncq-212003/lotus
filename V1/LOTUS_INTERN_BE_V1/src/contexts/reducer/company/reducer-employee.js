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
  },

  healthCondition: {
    bloodGroup: "",
    weight: "",
    height: "",
    isAlcohol: "",
    isSmoke: "",
    eyesightLeft: "",
    eyesightRight: "",
    preferredHand: "",
  },
};

const HANDLERS_EMPLOYEE = {
  SET_INPUT_EMPLOYEES: "SET_INPUT_EMPLOYEES",
  ADD_EMPLOYEES: "ADD_EMPLOYEES",
};

const handlersEmployee = {
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

    return {
      ...state,
      [tab]: {
        ...state[tab],
        [fieldName]: newValue,
      },
    };
  },
  [HANDLERS_EMPLOYEE.ADD_EMPLOYEES]: (state, action) => {
    const { basicInfo, healthCondition } = action.payload;

    const newEmployee = {
      basicInfo: basicInfo,
      healthCondition: healthCondition,
    };

    return {
      ...state,
      basicInfo: {
        avatar: "",
        employeeId: 0,
        employeeCode: "",
        deparment: [],
        role: "",
        citizenIdentity: "",
        issuedBy: "",
        dateRange: dayjs(),
        lastName: "",
        middleName: "",
        firstName: "",
        city: "",
        district: "",
        ward: "",
        address: "",
        email: "",
        phone: "",
        deskPhone: "",
        contractSigningDate: dayjs(),
        dob: dayjs(),
        gender: "1",
        educationalLevel: "",
        marriageStatus: "",
        description: "",
        loginName: "",
        password: "",
        confirmPassword: "",
        status: "isActive",
      },
      healthCondition: {
        bloodGroup: "",
        weight: "",
        height: "",
        isAlcohol: "",
        isSmoke: "",
        eyesightLeft: "",
        eyesightRight: "",
        preferredHand: "",
      },
      employees: [newEmployee],
    };
  },
};

const reducerEmployee = (state, action) =>
  handlersEmployee[action.type] ? handlersEmployee[action.type](state, action) : state;

export { initialStateEmployee, reducerEmployee, HANDLERS_EMPLOYEE };
