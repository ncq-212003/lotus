import dayjs from "dayjs";
import { createContext, useReducer, useContext } from "react";

const EmployeeContext = createContext();

const initialState = {
  employees:[],
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
    gender: "male",
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
};

const SET_FIELD_INPUT = "set_field_input";
const ADD_EMPLOYEES = "add_employees";

const setFieldInput = (tab, field, value) => ({
  type: SET_FIELD_INPUT,
  payload: { tab, field, value },
});

const addEmployees = (tab, payload) => ({
  type: ADD_EMPLOYEES,
  payload: { tab, ...payload }
});


function reducer(state, action) {
  switch (action.type) {
    case SET_FIELD_INPUT:
      return {
        ...state,
        [action.payload.tab]: {
          ...state[action.payload.tab],
          [action.payload.field]: action.payload.value,
        },
      };
    case ADD_EMPLOYEES:
      return {
        ...state,
        employees:  [...state.employees, { ...action.payload }],
      };
    default:
      throw Error("Invalid action");
  }
}

function StoreEmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EmployeeContext.Provider value={[state, dispatch]}>{children}</EmployeeContext.Provider>
  );
}

const useStoreEmployee = () => {
  const [state, dispatch] = useContext(EmployeeContext);

  return [state, dispatch];
};

export { StoreEmployeeProvider, useStoreEmployee, setFieldInput, addEmployees };
