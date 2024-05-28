import React, { createContext, useReducer } from "react";
import {
  HANDLERS_EMPLOYEE,
  initialStateEmployee,
  reducerEmployee,
} from "./reducer/company/reducer-employee";
import {
  HANDLERS_INTERN,
  initialStateIntern,
  reducerIntern,
} from "./reducer/intern/reducer-intern";
import {
  HANDLERS_OVERSEAS_STUDENT,
  initialStateOverseasStudent,
  reducerOverseasStudent,
} from "./reducer/overseas-student/reducer-overseas-student";
import {
  HANDLERSDOCUMENT,
  initialStateDocument,
  reducerDocument,
} from "./reducer/setting/reducer-document";
import {
  HANDLERS_SCHOOL,
  initialStateSchool,
  reducerSchool,
} from "./reducer/setting/reducer-school";
import {
  HANDLERS_COMPANY_RECEIVING,
  initialStateCompanyReceiving,
  reducerCompanyReceiving,
} from "./reducer/partner/reducer-company-receiving";
import {
  HANDLERS_COMPANY,
  initialStateCompany,
  reducerCompany,
} from "./reducer/company/reducer-company";
import {
  HANDLERS_DEPARMENT,
  initialStateDepartment,
  reducerDepartment,
} from "./reducer/company/reducer-department";
import {
  HANDLERS_BRANCH,
  initialStateBranch,
  reducerBranch,
} from "./reducer/company/reducer-branch";
import {
  HANDLERS_UNION,
  initialStateUnion,
  reducerUnion
} from "./reducer/partner/reducer-union";
import {
  HANDLERS_MENU,
  initialStateMenu,
  reducerMenu
} from "./reducer/setting/reducer-menu";
import {
  HANDLERS_CAR,
  initialStateCar,
  reducerCar
} from './reducer/schedule/reducer-car';
import {
  HANDLERS_PROCESS,
  initialStateProcess,
  reducerProcess
} from './reducer/schedule/reducer-process';
import {
  HANDLERS_PRESENT,
  initialStatePresent,
  reducerPresent
} from "./reducer/schedule/reducer-present";
import {
  HANDLERS_ADDRESS,
  initialStateAddress,
  reducerAddress
} from "./reducer/schedule/reudecer-address";
import {
  HANDLERS_LOCATION,
  initialStateLocation,
  reducerLocation
} from './reducer/location/reducer-location'

const AppContext = createContext();

const initialState = {
  company: { ...initialStateCompany },
  department: { ...initialStateDepartment },
  branch: { ...initialStateBranch },
  employee: { ...initialStateEmployee },
  intern: { ...initialStateIntern },
  overseasStudent: { ...initialStateOverseasStudent },
  companyReceiving: { ...initialStateCompanyReceiving },
  document: { ...initialStateDocument },
  union: { ...initialStateUnion },
  menu: { ...initialStateMenu },
  car: { ...initialStateCar },
  process: { ...initialStateProcess },
  present: { ...initialStatePresent },
  address: { ...initialStateAddress },
  location: { ...initialStateLocation }

};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    // Company actions
    case HANDLERS_COMPANY.ADD_COMPANY:
    case HANDLERS_COMPANY.LIST_COMPANY:
    case HANDLERS_COMPANY.DELETE_COMPANY:
    case HANDLERS_COMPANY.FIND_COMPANY_BYID:
    case HANDLERS_COMPANY.UPDATE_COMPANY:
      return {
        ...state,
        company: reducerCompany(state.company, action),
      };

    // Department actions
    case HANDLERS_DEPARMENT.ADD_DEPARTMENT:
    case HANDLERS_DEPARMENT.LIST_DEPARTMENT:
    case HANDLERS_DEPARMENT.DELETE_DEPARTMENT:
    case HANDLERS_DEPARMENT.FIND_DEPARTMENT_BYID:
    case HANDLERS_DEPARMENT.UPDATE_DEPARTMENT:
      return {
        ...state,
        department: reducerDepartment(state.department, action),
      };

    // Bnarch actions
    case HANDLERS_BRANCH.ADD_BRANCH:
    case HANDLERS_BRANCH.LIST_BRANCH:
    case HANDLERS_BRANCH.DELETE_BRANCH:
    case HANDLERS_BRANCH.FIND_BRANCH_BYID:
    case HANDLERS_BRANCH.UPDATE_BRANCH:
      return {
        ...state,
        branch: reducerBranch(state.branch, action),
      };

    // Employee actions
    case HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES:
    case HANDLERS_EMPLOYEE.ADD_EMPLOYEES:
    case HANDLERS_EMPLOYEE.SET_TOUCHED_EMPLOYEE:
    case HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE:
      return {
        ...state,
        employee: reducerEmployee(state.employee, action),
      };

    // Intern actions
    case HANDLERS_INTERN.SET_TOUCHED_INTERN:
    case HANDLERS_INTERN.SET_ERRORS_INTERN:
    case HANDLERS_INTERN.SET_ERRORS_ROW_INTERN:
    case HANDLERS_INTERN.SET_TOUCHED_ROW_INTERN:
    case HANDLERS_INTERN.SET_INPUT_INTERN:
    case HANDLERS_INTERN.SET_PROFILE_FIELD:
    case HANDLERS_INTERN.SET_TOUCHED_PROFILE:
    case HANDLERS_INTERN.SET_ERRORS_PROFILE:
    case HANDLERS_INTERN.ADD_INTERN:
    case HANDLERS_INTERN.DELETE_INTERN:
    case HANDLERS_INTERN.ADD_ROW_TABLE_INTERN:
    case HANDLERS_INTERN.SET_FIELD_ROW_INTERN:
    case HANDLERS_INTERN.DELETE_ROW_TABLE_INTERN:
      return {
        ...state,
        intern: reducerIntern(state.intern, action),
      };

    // DHS actions
    case HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.ADD_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.DELETE_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.ADD_ROW_TABLE_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.SET_FIELD_ROW_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.DELETE_ROW_TABLE_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_ROW_OVERSEAS_STUDENT:
    case HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_ROW_OVERSEAS_STUDENT:
      return {
        ...state,
        overseasStudent: reducerOverseasStudent(state.overseasStudent, action),
      };

    // Company Receiving actions
    case HANDLERS_COMPANY_RECEIVING.ADD_COMPANY_RECEIVING:
    case HANDLERS_COMPANY_RECEIVING.LIST_COMPANY_RECEIVING:
    case HANDLERS_COMPANY_RECEIVING.DELETE_COMPANY_RECEIVING:
    case HANDLERS_COMPANY_RECEIVING.FIND_COMPANY_RECEIVING_BYID:
    case HANDLERS_COMPANY_RECEIVING.UPDATE_COMPANY_RECEIVING:
      return {
        ...state,
        companyReceiving: reducerCompanyReceiving(state.companyReceiving, action),
      };

    //Document action
    case HANDLERSDOCUMENT.LIST_DOCUMENTS:
      return {
        ...state,
        document: reducerDocument(state.document, action),
      };

    // School actions
    case HANDLERS_SCHOOL.ADD_SCHOOL:
    case HANDLERS_SCHOOL.LIST_SCHOOL:
    case HANDLERS_SCHOOL.DELETE_SCHOOL:
    case HANDLERS_SCHOOL.FIND_SCHOOL_BYID:
    case HANDLERS_SCHOOL.UPDATE_SCHOOL:
      return {
        ...state,
        companyReceiving: reducerCompanyReceiving(state.companyReceiving, action),
      };

    // Union actions
    case HANDLERS_UNION.SET_INPUT_UNION:
    case HANDLERS_UNION.SET_TOUCHED_UNION:
    case HANDLERS_UNION.SET_TOUCHED_ROW_UNION:
    case HANDLERS_UNION.SET_FIELD_ROW_UNION:
    case HANDLERS_UNION.SET_ERRORS_UNION:
    case HANDLERS_UNION.SET_ERRORS_ROW_UNION:
    case HANDLERS_UNION.ADD_UNION:
    case HANDLERS_UNION.ADD_ROW_TABLE_UNION:
    case HANDLERS_UNION.DELETE_ROW_TABLE_UNION:
      return {
        ...state,
        union: reducerUnion(state.union, action),
      };

    case HANDLERS_MENU.ADD_MENU:
    case HANDLERS_MENU.LIST_MENU:
    case HANDLERS_MENU.DELETE_MENU:
    case HANDLERS_MENU.FIND_MENU_BYID:
    case HANDLERS_MENU.UPDATE_MENU:
      return {
        ...state,
        menu: reducerMenu(state.menu, action),
      };

    // Car actions
    case HANDLERS_CAR.ADD_CAR:
    case HANDLERS_CAR.LIST_CAR:
    case HANDLERS_CAR.DELETE_CAR:
    case HANDLERS_CAR.UPDATE_CAR:
    case HANDLERS_CAR.FIND_CAR_BYID:
      return {
        ...state,
        car: reducerCar(state.car, action)
      };

    // process actions 
    case HANDLERS_PROCESS.ADD_PROCESS:
    case HANDLERS_PROCESS.LIST_PROCESS:
    case HANDLERS_PROCESS.DELETE_PROCESS:
    case HANDLERS_PROCESS.FIND_PROCESS_BYID:
    case HANDLERS_PROCESS.UPDATE_PROCESS:
      return {
        ...state,
        process: reducerProcess(state.process, action)
      }
    // present action
    case HANDLERS_PRESENT.ADD_PRESENT:
    case HANDLERS_PRESENT.LIST_PRESENT:
    case HANDLERS_PRESENT.FIND_PRESENT_BYID:
    case HANDLERS_PRESENT.UPDATE_PRESENT:
      return {
        ...state,
        present: reducerPresent(state.present, action)
      }
    // address action
    case HANDLERS_ADDRESS.ADD_ADDRESS:
    case HANDLERS_ADDRESS.LIST_ADDRESS:
    case HANDLERS_ADDRESS.FIND_ADDRESS_BYID:
    case HANDLERS_ADDRESS.UPDATE_ADDRESS:
      return {
        ...state,
        address: reducerAddress(state.address, action)
      }
    // location action 
    case HANDLERS_LOCATION.LIST_CITY:
      return {
        ...state,
        location: reducerLocation(state.location, action)
      }

    default:
      throw Error("Invalid action");
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
