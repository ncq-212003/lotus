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
  HANDLERS_DOCUMENT,
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
  HANDLERS_MODULE,
  initialStateModule,
  reducerModule,
} from "./reducer/system/reducer-module";
import {
  HANDLERS_MENU,
  initialStateMenu,
  reducerMenu
} from "./reducer/setting/reducer-menu";
import {
  HANDLERS_ITEM,
  initialStateItem,
  reducerItem
} from "./reducer/setting/reducer-item";
import {
  HANDLERS_PROFESSION,
  initialStateProfession,
  reducerProfession,
} from "./reducer/setting/reducer-profession";
import {
  HANDLERS_FEATURE,
  initialStateFeature,
  reducerFeature,
} from "./reducer/system/reducer-feature"
import {
  HANDLERS_DORMITORY,
  initialStateDormitory,
  reducerDormitory,
} from "./reducer/setting/reducer-dormitory"
import {
  HANDLERS_ROOM,
  initialStateRoom,
  reducerRoom,
} from "./reducer/setting/reducer-room"
import {
  HANDLERS_ORGAN,
  initialStateOrgan,
  reducerOrgan,
} from "./reducer/setting/reducer-organ"
import {
  HANDLERS_ROLE,
  initialStateRole,
  reducerRole,
} from "./reducer/system/reducer-role"
import {
  HANDLERS_CAR,
  initialStateCar,
  reducerCar
} from "./reducer/schedule/reducer-car";
import {
  HANDLERS_PROCESS,
  initialStateProcess,
  reducerProcess,
} from "./reducer/schedule/reducer-process";
import {
  HANDLERS_PRESENT,
  initialStatePresent,
  reducerPresent,
} from "./reducer/schedule/reducer-present";
import {
  HANDLERS_ADDRESS,
  initialStateAddress,
  reducerAddress,
} from "./reducer/schedule/reudecer-address";
import {
  HANDLERS_ETHNIC,
  initialStateEthnic,
  reducerEthnic
} from "./reducer/setting/reducer-ethnic";
import {
  HANDLERS_MARKET,
  initialStateMarket,
  reducerMarket
} from "./reducer/setting/reducer-market";
import {
  HANDLERS_EDUCATIONLEVEL,
  initialStateEducationLevel,
  reducerEducationLevel
} from "./reducer/setting/reducer-educationlevel";
import {
  HANDLERS_CERTIFICATE,
  initialStateCertificate,
  reducerCertificate
} from "./reducer/train/reducer-certificate";
import {
  HANDLERS_AIRPORT,
  initialStateAirPort,
  reducerAirport
} from "./reducer/setting/reducer-airport";
import {
  HANDLERS_REGION,
  initialStateRegion,
  reducerRegion
} from './reducer/setting/reducer-region';

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
  item: { ...initialStateItem },
  profession: { ...initialStateProfession },
  module: { ...initialStateModule },
  feature: { ...initialStateFeature },
  dormitory: { ...initialStateDormitory },
  school: { ...initialStateSchool },
  room: { ...initialStateRoom },
  organ: { ...initialStateOrgan },
  role: { ...initialStateRole },
  car: { ...initialStateCar },
  process: { ...initialStateProcess },
  present: { ...initialStatePresent },
  address: { ...initialStateAddress },
  ethnic: { ...initialStateEthnic },
  market: { ...initialStateMarket },
  educationLevel: { ...initialStateEducationLevel },
  certificate: { ...initialStateCertificate },
  airport: { ...initialStateAirPort },
  region: { ...initialStateRegion },
};

const reducer = (state, action) => {
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
    case HANDLERS_EMPLOYEE.ADD_EMPLOYEE:
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
    case HANDLERS_DOCUMENT.LIST_DOCUMENTS:
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
        school: reducerSchool(state.school, action),
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

    // menu actions
    case HANDLERS_MENU.ADD_MENU:
    case HANDLERS_MENU.LIST_MENU:
    case HANDLERS_MENU.DELETE_MENU:
    case HANDLERS_MENU.FIND_MENU_BYID:
    case HANDLERS_MENU.UPDATE_MENU:
      return {
        ...state,
        menu: reducerMenu(state.menu, action),
      };

    // Item actions
    case HANDLERS_ITEM.LIST_ITEM:
      return {
        ...state,
        item: reducerItem(state.item, action),
      }

    // Profession actions
    case HANDLERS_PROFESSION.LIST_PROFESSION:
    case HANDLERS_PROFESSION.ADD_PROFESSION:
    case HANDLERS_PROFESSION.UPDATE_PROFESSION:
      return {
        ...state,
        profession: reducerProfession(state.profession, action),
      }

    //Module actions
    case HANDLERS_MODULE.ADD_MODULE:
    case HANDLERS_MODULE.LIST_MODULE:
    case HANDLERS_MODULE.DELETE_MODULE:
    case HANDLERS_MODULE.FIND_MODULE_BYID:
    case HANDLERS_MODULE.UPDATE_MODULE:
      return {
        ...state,
        module: reducerModule(state.module, action),
      };

    //Feature actions
    case HANDLERS_FEATURE.ADD_FEATURE:
    case HANDLERS_FEATURE.LIST_FEATURE:
    case HANDLERS_FEATURE.DELETE_FEATURE:
    case HANDLERS_FEATURE.FIND_FEATURE_BYID:
    case HANDLERS_FEATURE.UPDATE_FEATURE:
      return {
        ...state,
        feature: reducerFeature(state.feature, action),
      };
    // Car actions
    case HANDLERS_CAR.ADD_CAR:
    case HANDLERS_CAR.LIST_CAR:
    case HANDLERS_CAR.DELETE_CAR:
    case HANDLERS_CAR.UPDATE_CAR:
    case HANDLERS_CAR.FIND_CAR_BYID:
      return {
        ...state,
        car: reducerCar(state.car, action),
      };

    //Dormitory actions
    case HANDLERS_DORMITORY.ADD_DORMITORY:
    case HANDLERS_DORMITORY.LIST_DORMITORY:
    case HANDLERS_DORMITORY.DELETE_DORMITORY:
    case HANDLERS_DORMITORY.FIND_DORMITORY_BYID:
    case HANDLERS_DORMITORY.UPDATE_DORMITORY:
      return {
        ...state,
        dormitory: reducerDormitory(state.dormitory, action),
      };

    // School actions
    case HANDLERS_SCHOOL.ADD_SCHOOL:
    case HANDLERS_SCHOOL.LIST_SCHOOL:
    case HANDLERS_SCHOOL.DELETE_SCHOOL:
    case HANDLERS_SCHOOL.FIND_SCHOOL_BYID:
    case HANDLERS_SCHOOL.UPDATE_SCHOOL:
      return {
        ...state,
        school: reducerSchool(state.school, action),
      };

    //Room actions
    case HANDLERS_ROOM.ADD_ROOM:
    case HANDLERS_ROOM.LIST_ROOM:
    case HANDLERS_ROOM.DELETE_ROOM:
    case HANDLERS_ROOM.FIND_ROOM_BYID:
    case HANDLERS_ROOM.UPDATE_ROOM:
      return {
        ...state,
        room: reducerRoom(state.room, action),
      };

    //Organ actions
    case HANDLERS_ORGAN.ADD_ORGAN:
    case HANDLERS_ORGAN.LIST_ORGAN:
    case HANDLERS_ORGAN.DELETE_ORGAN:
    case HANDLERS_ORGAN.FIND_ORGAN_BYID:
    case HANDLERS_ORGAN.UPDATE_ORGAN:
      return {
        ...state,
        organ: reducerOrgan(state.organ, action),
      };

    //Role actions
    case HANDLERS_ROLE.ADD_ROLE:
    case HANDLERS_ROLE.LIST_ROLE:
    case HANDLERS_ROLE.DELETE_ROLE:
    case HANDLERS_ROLE.FIND_ROLE_BYID:
    case HANDLERS_ROLE.UPDATE_ROLE:
      return {
        ...state,
        role: reducerRole(state.role, action),
      };

    // process actions
    case HANDLERS_PROCESS.ADD_PROCESS:
    case HANDLERS_PROCESS.LIST_PROCESS:
    case HANDLERS_PROCESS.DELETE_PROCESS:
    case HANDLERS_PROCESS.FIND_PROCESS_BYID:
    case HANDLERS_PROCESS.UPDATE_PROCESS:
      return {
        ...state,
        process: reducerProcess(state.process, action),
      };
    // present action
    case HANDLERS_PRESENT.ADD_PRESENT:
    case HANDLERS_PRESENT.LIST_PRESENT:
    case HANDLERS_PRESENT.FIND_PRESENT_BYID:
    case HANDLERS_PRESENT.UPDATE_PRESENT:
      return {
        ...state,
        present: reducerPresent(state.present, action),
      };
    // address action
    case HANDLERS_ADDRESS.ADD_ADDRESS:
    case HANDLERS_ADDRESS.LIST_ADDRESS:
    case HANDLERS_ADDRESS.FIND_ADDRESS_BYID:
    case HANDLERS_ADDRESS.UPDATE_ADDRESS:
      return {
        ...state,
        address: reducerAddress(state.address, action),
      };

    // ethnic actions
    case HANDLERS_ETHNIC.ADD_ETHNIC:
    case HANDLERS_ETHNIC.LIST_ETHNIC:
    case HANDLERS_ETHNIC.DELETE_ETHNIC:
    case HANDLERS_ETHNIC.FIND_ETHNIC_BYID:
    case HANDLERS_ETHNIC.UPDATE_ETHNIC:
      return {
        ...state,
        ethnic: reducerEthnic(state.ethnic, action),
      };

    // Market actions
    case HANDLERS_MARKET.ADD_MARKET:
    case HANDLERS_MARKET.LIST_MARKET:
    case HANDLERS_MARKET.FIND_MARKET_BYID:
    case HANDLERS_MARKET.UPDATE_MARKET:
      return {
        ...state,
        market: reducerMarket(state.market, action),
      }

    // EducationLevel
    case HANDLERS_EDUCATIONLEVEL.ADD_EDUCATIONLEVEL:
    case HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL:
    case HANDLERS_EDUCATIONLEVEL.FIND_EDUCATIONLEVEL_BYID:
    case HANDLERS_EDUCATIONLEVEL.UPDATE_EDUCATIONLEVEL:
      return {
        ...state,
        educationLevel: reducerEducationLevel(state.educationLevel, action),
      }

    // Certificate actions
    case HANDLERS_CERTIFICATE.ADD_CERTIFICATE:
    case HANDLERS_CERTIFICATE.LIST_CERTIFICATE:
    case HANDLERS_CERTIFICATE.FIND_CERTIFICATE_BYID:
    case HANDLERS_CERTIFICATE.UPDATE_CERTIFICATE:
      return {
        ...state,
        certificate: reducerCertificate(state.certificate, action),
      }
    // airport action
    case HANDLERS_AIRPORT.ADD_AIRPORT:
    case HANDLERS_AIRPORT.LIST_AIRPORT:
    case HANDLERS_AIRPORT.FIND_AIRPORT_BYID:
    case HANDLERS_AIRPORT.UPDATE_AIRPORT:
      return {
        ...state,
        airport: reducerAirport(state.airport, action),
      };
    // region action
    case HANDLERS_REGION.ADD_REGION:
    case HANDLERS_REGION.LIST_REGION:
    case HANDLERS_REGION.UPDATE_REGION:
    case HANDLERS_REGION.FIND_REGION_BYID:
      return {
        ...state,
        region: reducerRegion(state.region, action)
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