import dayjs from "dayjs";
import { createContext, useReducer, useContext } from "react";

const InternContext = createContext();

const initialState = {
  intern: [],
  infoBasic: {
    profileCode: "",
    registrationDate: dayjs(),
    lastName: "",
    middleName: "",
    firstName: "",
    dob: dayjs(),
    gender: "male",
    marriageStatus: "",
    educationalLevel: "",
    ethnic: "",
    religion: "",
    documentProgress: "",
    participationProgram: "",
    citizenIdentification: "",
    dateRangeCCCD: dayjs(),
    issuedCCCDBy: "",
    issuanceOfPassport: "",
    passport: "",
    dateRangeHC: dayjs(),
    expirationDateHC: dayjs(),
    street: "",
    cityId: "",
    districtId: "",
    wardId: "",
    address: "",
    phone: "",
    deskPhone: "",
    portraitPhoto: "",
    fullBodyPhoto: "",
    wantToGo: [],
    recruitmentOfficer: [],
    experience: [],
    sourceGroup: [],
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
  profile: {
    market: "",
    wantToGoToSchool: "",
    admissionSchool: "",
    major: "",
    semester: "",
    schoolLevel: "",
    exitGroup: "",
  },
  trainIq: {
    classList: "",
    chairman: "",
    phoneChairman: "",
    openingDay: dayjs(),
    closingDay: dayjs(),
    description: "",
  },
  familyRelationShip: [],
  studyProcess: [],
  workExperienceDomestical: [],
  workExperienceInterational: [],
};

const SET_FIELD_INPUT = "set_field_input";
const ADD_INTERN = "add_intern";
const ADD_ROW_TABLE = "add_row_table";
const SET_FIELD_ROW = "set_field_row";
const DELETE_ROW_TABLE = "delete_row_table";

const setFieldInput = (tab, field, value) => ({
  type: SET_FIELD_INPUT,
  payload: { tab, field, value },
});

const addIntern = (tab, payload) => ({
  type: ADD_INTERN,
  payload: { tab, ...payload },
});

const addRowTable = (tab, payload) => ({
  type: ADD_ROW_TABLE,
  payload: { tab, ...payload },
});

const setFieldRow = (tab, index, fieldName, value) => ({
  type: SET_FIELD_ROW,
  payload: { tab, index, fieldName, value },
});

const deleteRowTable = (tab, index) => ({
  type: DELETE_ROW_TABLE,
  payload: { tab, index },
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

    case ADD_INTERN:
      return {
        ...state,
        intern: [...state.intern, { ...action.payload }],
      };

    case ADD_ROW_TABLE:
      return {
        ...state,
        [action.payload.tab]: [...state[action.payload.tab], { ...action.payload }],
      };

    case SET_FIELD_ROW:
      const { tab, index, fieldName, value } = action.payload;
      const updatedRows = [...state[tab]];

      updatedRows[index] = {
        ...updatedRows[index],
        [fieldName]: value,
      };

      return {
        ...state,
        [tab]: updatedRows,
      };

    case DELETE_ROW_TABLE:
      const newArray = [...state[action.payload.tab]];
      newArray.splice(action.payload.index, 1);
      return {
        ...state,
        [action.payload.tab]: newArray,
      };

    default:
      throw Error("Invalid action");
  }
}

function StoreInternProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <InternContext.Provider value={[state, dispatch]}>{children}</InternContext.Provider>;
}

const useStoreIntern = () => {
  const [state, dispatch] = useContext(InternContext);

  return [state, dispatch];
};

export { StoreInternProvider, useStoreIntern, setFieldInput, addIntern, setFieldRow, addRowTable, deleteRowTable };
