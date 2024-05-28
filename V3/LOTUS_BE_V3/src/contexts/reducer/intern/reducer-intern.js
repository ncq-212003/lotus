import dayjs from "dayjs";

const profile = [
  {
    questionId: "1",
    questionName: "Bạn có người thân bên Nhật không",
    type: "2",
    category: "Người thân bên Nhật",
    order: "1",
    options: ["Có người thân bên nhật", "Không có người thân bên nhật"],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "2",
    questionName: "Quan hệ với bạn thế nào",
    type: "1",
    category: "Người thân bên Nhật",
    order: "2",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "3",
    questionName: "Thời gian tại Nhật",
    type: "1",
    category: "Người thân bên Nhật",
    order: "3",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "4",
    questionName: "Nơi làm việc",
    type: "1",
    category: "Người thân bên Nhật",
    order: "4",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "5",
    questionName: "Điện thoại/Facebook của họ",
    type: "1",
    category: "Người thân bên Nhật",
    order: "5",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "6",
    questionName: "Họ tên người thân tại Nhật",
    type: "1",
    category: "Người thân bên Nhật",
    order: "6",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "7",
    questionName: "Sở thích cá nhân",
    type: "1",
    category: "Sở thích tính cách",
    order: "7",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "8",
    questionName: "Nhược điểm",
    type: "1",
    category: "Sở thích tính cách",
    order: "8",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "9",
    questionName: "Sở trường, chuyên môn",
    type: "1",
    category: "Sở thích tính cách",
    order: "9",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "10",
    questionName: "Tự nhận xét tính cách bản thân",
    type: "1",
    category: "Sở thích tính cách",
    order: "10",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "11",
    questionName: "Đã nộp tiền cho ai",
    type: "1",
    category: "Tài chính sơ tuyển",
    order: "11",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "12",
    questionName: "Số tiền là",
    type: "1",
    category: "Tài chính sơ tuyển",
    order: "12",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "13",
    questionName: "Ngày nộp",
    type: "3",
    category: "Tài chính sơ tuyển",
    order: "13",
    options: [],
    answer: dayjs(),
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "14",
    questionName: "Đi nhật gia đình có đồng ý không",
    type: "2",
    category: "Nguyện vọng đăng ký",
    order: "14",
    options: [
      "Không có lựa chọn",
      "Gia đình đồng ý cho đi Nhật",
      "Gia đình không đồng ý cho đi Nhật",
    ],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "15",
    questionName: "Vì sao muốn đi Nhật",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "15",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "16",
    questionName: "Thu nhập gia đình 1 tháng khoảng bao nhiêu (triệu)",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "16",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "17",
    questionName: "Đã từng học tiếng Nhật chưa? Học trong bao lâu? Ở đâu?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "17",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "18",
    questionName: "Đã từng dự tuyển đơn hàng Nhật nào chưa? Ngành nghề tuyển? Bao giờ? Ở đâu?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "18",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "19",
    questionName: "Đã từng nộp hồ sơ đi TTS Nhật Bản ở cty nào chưa?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "19",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "20",
    questionName: "Đã từng gửi hồ sơ đi du học Nhật chưa",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "20",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "21",
    questionName: "Đã từng nộp hồ sơ xin visa vào Nhật chưa?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "21",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "22",
    questionName: "Nếu có, xin visa theo tư cách nào?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "22",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "23",
    questionName: "Sau khi về nước muốn có bao nhiêu tiền (triệu)?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "23",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "24",
    questionName: "Sau khi về nước muốn làm việc gì?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "24",
    options: [],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "25",
    questionName: "Bạn đã có từng sống tập thể chưa?",
    type: "2",
    category: "Nguyện vọng đăng ký",
    order: "25",
    options: ["Không có lựa chọn", "Đã từng sống tập thể", "Chưa từng sống tập thể"],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
  {
    questionId: "26",
    questionName: "Biết đến Cty qua đâu?",
    type: "2",
    category: "Nguyện vọng đăng ký",
    order: "26",
    options: [
      "Không có lựa chọn",
      "Người thân giới thiệu",
      "Qua mạng internet",
      "Qua nhân viên tư vấn",
      "Tình cờ biết đến",
    ],
    answer: "",
    position: "TTS",
    required: "Có",
    touched: {},
    errors: {},
  },
];

const initialStateIntern = {
  thucTapSinh: [],
  thongTinCoBan: {
    maHoSo: "",
    maThucTapSinh: "",
    ngayNhapHoc: dayjs(),
    ho: "",
    tenDem: "",
    ten: "",
    ngaySinh: null,
    gioiTinh: "1",
    tinhTrangHonNhan: "Chưa kết hôn",
    trinhDoVanHoa: "Cao đẳng",
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
    muMau: "Không lựa chọn",
    moHoiTay: "Không lựa chọn",
    soDoCao: "Không lựa chọn",
    coHinhXam: "Không lựa chọn",
    chiTietHinhXam: "",
    touched: {},
    errors: {},
  },
  hoSo: profile,
  daoTao: {
    maLop: "",
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
  },
};

const HANDLERS_INTERN = {
  SET_INPUT_INTERN: "SET_INPUT_INTERN",
  SET_PROFILE_FIELD: "SET_PROFILE_FIELD",
  ADD_INTERN: "ADD_INTERN",
  DELETE_INTERN: "DELETE_INTERN",
  ADD_ROW_TABLE_INTERN: "ADD_ROW_TABLE_INTERN",
  SET_FIELD_ROW_INTERN: "SET_FIELD_ROW_INTERN",
  DELETE_ROW_TABLE_INTERN: "DELETE_ROW_TABLE_INTERN",
  SET_TOUCHED_INTERN: "SET_TOUCHED_INTERN",
  SET_ERRORS_INTERN: "SET_ERRORS_INTERN",
  SET_TOUCHED_ROW_INTERN: "SET_TOUCHED_ROW_INTERN",
  SET_ERRORS_ROW_INTERN: "SET_ERRORS_ROW_INTERN",
  SET_TOUCHED_PROFILE: "SET_TOUCHED_PROFILE",
  SET_ERRORS_PROFILE: "SET_ERRORS_PROFILE",
};

const handlersIntern = {
  // set touched
  [HANDLERS_INTERN.SET_TOUCHED_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.SET_ERRORS_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.SET_INPUT_INTERN]: (state, action) => {
    const { tab, fieldName, newValue } = action.payload;

    if (fieldName === "ngayCapHoChieu") {
      const ngayHetHanHoChieu = dayjs(newValue).add(10, "year");

      return {
        ...state,
        [tab]: {
          ...state[tab],
          ngayCapHoChieu: newValue,
          ngayHetHanHoChieu: ngayHetHanHoChieu,
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

  //set profile field
  [HANDLERS_INTERN.SET_PROFILE_FIELD]: (state, action) => {
    const { questionId, newValue } = action.payload;

    const updatedProfile = state.hoSo.map((question) =>
      question.questionId === questionId ? { ...question, answer: newValue } : question
    );

    return {
      ...state,
      hoSo: updatedProfile,
    };
  },

  //set touched profile field
  [HANDLERS_INTERN.SET_TOUCHED_PROFILE]: (state, action) => {
    const { questionId, fieldName, newValue } = action.payload;

    const updatedProfileTouched = state.hoSo.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            touched: {
              ...question.touched,
              [fieldName]: newValue,
            },
          }
        : question
    );
    return {
      ...state,
      hoSo: updatedProfileTouched,
    };
  },

  //set errors profile field
  [HANDLERS_INTERN.SET_ERRORS_PROFILE]: (state, action) => {
    const { questionId, fieldName, newValue } = action.payload;
    const updatedProfileErrors = state.hoSo.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            errors: {
              ...question.errors,
              [fieldName]: newValue,
            },
          }
        : question
    );

    return {
      ...state,
      hoSo: updatedProfileErrors,
    };
  },

  //add row table
  [HANDLERS_INTERN.ADD_ROW_TABLE_INTERN]: (state, action) => {
    const { tab, newRow } = action.payload;
    return {
      ...state,
      [tab]: [...state[tab], { ...newRow }],
    };
  },

  //set input row
  [HANDLERS_INTERN.SET_FIELD_ROW_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.DELETE_ROW_TABLE_INTERN]: (state, action) => {
    const { tab, index } = action.payload;
    const newArray = [...state[tab]];
    newArray.splice(index, 1);
    return {
      ...state,
      [tab]: newArray,
    };
  },

  //set touched row
  [HANDLERS_INTERN.SET_TOUCHED_ROW_INTERN]: (state, action) => {
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
  [HANDLERS_INTERN.SET_ERRORS_ROW_INTERN]: (state, action) => {
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

  //add intern
  [HANDLERS_INTERN.ADD_INTERN]: (state, action) => {
    const {
      thongTinCoBan,
      tinhTrangSucKhoe,
      daoTao,
      quanHeGiaDinh,
      quaTrinhHocTap,
      kinhNghiemTrongNuoc,
      kinhNghiemTrongNgoaiNuoc,
    } = action.payload;

    const newIntern = {
      thongTinCoBan: thongTinCoBan,
      tinhTrangSucKhoe: tinhTrangSucKhoe,
      daoTao: daoTao,
      quanHeGiaDinh: quanHeGiaDinh,
      quaTrinhHocTap: quaTrinhHocTap,
      kinhNghiemTrongNuoc: kinhNghiemTrongNuoc,
      kinhNghiemTrongNgoaiNuoc: kinhNghiemTrongNgoaiNuoc,
    };

    return {
      ...state,
      thucTapSinh: [newIntern],
    };
  },

  //delete intern
  [HANDLERS_INTERN.DELETE_INTERN]: (state, action) => {
    return {
      thucTapSinh: [],
    };
  },
};

const reducerIntern = (state, action) =>
  handlersIntern[action.type] ? handlersIntern[action.type](state, action) : state;

export { initialStateIntern, reducerIntern, HANDLERS_INTERN };
