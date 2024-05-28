import dayjs from "dayjs";
import LotusClient from "../lotus-api";

export const addEmployeeApi = (employeeData) => {
  const { basicInfo, healthCondition, accessSystem, generalNotes } = employeeData;
  const birthday = dayjs(basicInfo.birthday).format("YYYY-MM-DD");
  const identificationDate = dayjs(basicInfo.identificationDate).format("YYYY-MM-DD");
  const passportProvideDate = dayjs(basicInfo.passportProvideDate).format("YYYY-MM-DD");
  const passwordExpiredDate = dayjs(basicInfo.passwordExpiredDate).format("YYYY-MM-DD");
  const contractDate = dayjs(basicInfo.contractDate).format("YYYY-MM-DD");
  // const visaProvideDate = dayjs(dob).format("yyyy-MM-dd");
  // const visaExpiredDate = dayjs(dob).format("yyyy-MM-dd");

  const formData = {
    firstName: basicInfo.lastName,
    middleName: basicInfo.middleName,
    lastName: basicInfo.lastName,
    sex: basicInfo.sex,
    birthday: birthday,
    marriedStatus: basicInfo.marriedStatus,
    educationLevelId: basicInfo.educationLevelId,
    ethnicityId: basicInfo.ethnicityId,
    religion: basicInfo.religion,
    identification: basicInfo.identification,
    identificationDate: identificationDate,
    identificationLocation: basicInfo.identificationLocation,
    passportNumber: basicInfo.passportNumber,
    passportProvideLocation: basicInfo.passportProvideLocation,
    passportProvideDate: passportProvideDate,
    passwordExpiredDate: passwordExpiredDate,
    domicileCityId: basicInfo.domicileCityId.value,
    domicileDistrictId: basicInfo.domicileDistrictId.value,
    domicileWardId: basicInfo.domicileWardId.value,
    normallyAddress: basicInfo.normallyAddress,
    temporaryAddress: basicInfo.temporaryAddress,
    domicileAddress: basicInfo.domicileAddress,
    telephone: "1",
    mobilePhone: basicInfo.mobilePhone,
    avatar: basicInfo.avatar,
    avatarFullBody: "1",
    // visaNumber: employeeData.visaNumber,
    // visaProvideDate: employeeData.visaProvideDate,
    // visaExpiredDate: employeeData.visaExpiredDate,
    // visaTclt: employeeData.visaTclt,
    nationality: basicInfo.nationality,
    bmi: "1",
    groupBlood: healthCondition.bloodGroup,
    weight: healthCondition.weight,
    height: healthCondition.height,
    isDrinkWine: healthCondition.isDrinkWine,
    isSmoke: healthCondition.isSmoke,
    eyeSightRight: healthCondition.eyeSightRight,
    eyeSightLeft: healthCondition.eyeSightLeft,
    strongHand: healthCondition.strongHand,
    colorBlindness: healthCondition.colorBlindness,
    sweatyHands: healthCondition.sweatyHands,
    afraidHeight: healthCondition.afraidHeight,
    haveTatoo: healthCondition.haveTatoo,
    detailTatoo: healthCondition.detailTatoo,
    returnValue: 1,
    employeeId: 1,
    hashCode: "1",
    employeeCode: basicInfo.employeeCode,
    userName: accessSystem.userName,
    password: accessSystem.password,
    contractDate: contractDate,
    refreshToken: "1",
    qrCode: "1",
    countFail: 1,
    timeStamp: "1",
    lastLogin: new Date().toISOString(),
    status: accessSystem.status,
    employeeType: basicInfo.employeeType,
    description: generalNotes.description,
    field1: "1",
    field2: "1",
    field3: "1",
    field4: "1",
    field5: "1",
    createdAt: new Date().toISOString(),
    createdBy: 1,
    lastModifedAt: new Date().toISOString(),
    lastModifedBy: 1,
    flag: "0",
  };
  console.log(formData);
  // try {
  //   const response = await LotusClient.post("/Employee/insert", employeeData);
  //   return response;
  // } catch (error) {
  //   return error;
  // }
};

export const updateEmployeeApi = async (employeeData) => {
  try {
    const response = await LotusClient.put("/Employee/update", employeeData);
    return response;
  } catch (error) {
    return error;
  }
};

export const listEmployeeApi = async () => {
  try {
    const response = await LotusClient.get("/Employee/all?sortByExpression=asc");
    return response;
  } catch (error) {
    return error;
  }
};

export const findEmployeeByIdApi = async (employeeId) => {
  try {
    const response = await LotusClient.get(`/Employee/${employeeId}`);
    return response;
  } catch (error) {
    return error;
  }
};
