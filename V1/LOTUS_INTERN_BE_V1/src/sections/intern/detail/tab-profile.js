import { Box, TextField, Autocomplete, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import React from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import dayjs from "dayjs";

const profile = [
  {
    questionId: "1",
    questionName: "Bạn có người thân bên Nhật không",
    type: "2",
    category: "Người thân bên Nhật",
    order: "1",
    options: [
      { value: 1, label: "Cắt, Mài, Đánh bóng" },
      { value: 2, label: "Cơ điện" },
      { value: 3, label: "Hàn xì" },
      { value: 4, label: "May mặc" },
    ],
    answer: { value: 1, label: "Cắt, Mài, Đánh bóng" },
    position: "TTS",
  },
  {
    questionId: "2",
    questionName: "Quan hệ với bạn thế nào",
    type: "1",
    category: "Người thân bên Nhật",
    order: "2",
    options: [],
    answer: "Bố",
    position: "TTS",
  },
  {
    questionId: "3",
    questionName: "Thời gian tại Nhật",
    type: "1",
    category: "Người thân bên Nhật",
    order: "3",
    options: [],
    answer: "10 năm",
    position: "TTS",
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
  },
  {
    questionId: "5",
    questionName: "Điện thoại/Facebook của họ",
    type: "1",
    category: "Người thân bên Nhật",
    order: "5",
    options: [],
    answer: "0333565542",
    position: "TTS",
  },
  {
    questionId: "6",
    questionName: "Họ tên người thân tại Nhật",
    type: "1",
    category: "Người thân bên Nhật",
    order: "6",
    options: [],
    answer: "Nguyễn Thị C",
    position: "TTS",
  },
  {
    questionId: "7",
    questionName: "Sở thích cá nhân",
    type: "1",
    category: "Sở thích tính cách",
    order: "7",
    options: [],
    answer: "Bóng đá",
    position: "TTS",
  },
  {
    questionId: "8",
    questionName: "Nhược điểm",
    type: "1",
    category: "Sở thích tính cách",
    order: "8",
    options: [],
    answer: "Nghe nhạc",
    position: "TTS",
  },
  {
    questionId: "9",
    questionName: "Sở trường, chuyên môn",
    type: "1",
    category: "Sở thích tính cách",
    order: "9",
    options: [],
    answer: "Chạy bộ",
    position: "TTS",
  },
  {
    questionId: "10",
    questionName: "Tự nhận xét tính cách bản thân",
    type: "1",
    category: "Sở thích tính cách",
    order: "10",
    options: [],
    answer: "Tốt bụng",
    position: "TTS",
  },
  {
    questionId: "11",
    questionName: "Đã nộp tiền cho ai",
    type: "1",
    category: "Tài chính sơ tuyển",
    order: "11",
    options: [],
    answer: "Nguyễn Văn A",
    position: "TTS",
  },
  {
    questionId: "12",
    questionName: "Số tiền là",
    type: "1",
    category: "Tài chính sơ tuyển",
    order: "12",
    options: [],
    answer: "10.000.000",
    position: "TTS",
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
    answer: "Gia đình đồng ý cho đi Nhật",
    position: "TTS",
  },
  {
    questionId: "15",
    questionName: "Vì sao muốn đi Nhật",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "15",
    options: [],
    answer: "Kiếm tiền",
    position: "TTS",
  },
  {
    questionId: "16",
    questionName: "Thu nhập gia đình 1 tháng khoảng bao nhiêu (triệu)",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "16",
    options: [],
    answer: "10.000.000",
    position: "TTS",
  },
  {
    questionId: "17",
    questionName: "Đã từng học tiếng Nhật chưa? Học trong bao lâu? Ở đâu?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "17",
    options: [],
    answer: "Rồi. 3 năm",
    position: "TTS",
  },
  {
    questionId: "18",
    questionName: "Đã từng dự tuyển đơn hàng Nhật nào chưa? Ngành nghề tuyển? Bao giờ? Ở đâu?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "18",
    options: [],
    answer: "Chưa",
    position: "TTS",
  },
  {
    questionId: "19",
    questionName: "Đã từng nộp hồ sơ đi TTS Nhật Bản ở cty nào chưa?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "19",
    options: [],
    answer: "Chưa",
    position: "TTS",
  },
  {
    questionId: "20",
    questionName: "Đã từng gửi hồ sơ đi du học Nhật chưa",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "20",
    options: [],
    answer: "Chưa",
    position: "TTS",
  },
  {
    questionId: "21",
    questionName: "Đã từng nộp hồ sơ xin visa vào Nhật chưa?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "21",
    options: [],
    answer: "Chưa",
    position: "TTS",
  },
  {
    questionId: "22",
    questionName: "Nếu có, xin visa theo tư cách nào?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "22",
    options: [],
    answer: "Không rõ",
    position: "TTS",
  },
  {
    questionId: "23",
    questionName: "Sau khi về nước muốn có bao nhiêu tiền (triệu)?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "23",
    options: [],
    answer: "10.000.000",
    position: "TTS",
  },
  {
    questionId: "24",
    questionName: "Sau khi về nước muốn làm việc gì?",
    type: "1",
    category: "Nguyện vọng đăng ký",
    order: "24",
    options: [],
    answer: "Bán hàng",
    position: "TTS",
  },
  {
    questionId: "25",
    questionName: "Bạn đã có từng sống tập thể chưa?",
    type: "2",
    category: "Nguyện vọng đăng ký",
    order: "25",
    options: ["Không có lựa chọn", "Đã từng sống tập thể", "Chưa từng sống tập thể"],
    answer: "Đã từng sống tập thể",
    position: "TTS",
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
    answer: "Người thân giới thiệu",
    position: "TTS",
  },
];

export default function TabProfile() {
  // const [state, dispatch] = useApp();
  // const { intern } = state;
  // const { hoSo } = intern;

  const renderFormField = (question) => {
    const commonProps = {
      variant: "outlined",
      required: true,
      size: "small",
      fullWidth: true,
      sx: { margin: "4px", marginTop: "12px" },
    };

    const handleFieldChange = (value) => {
      const questionId = question.questionId;
      const newValue = value;

      dispatch({
        type: HANDLERS_INTERN.SET_PROFILE_FIELD,
        payload: { questionId, newValue },
      });
    };

    if (question.type === "3") {
      return (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
          key={question.order}
        >
          <DatePicker
            sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
              },
            }}
            label={question.questionName}
            value={question.answer}
            onChange={(date) => handleFieldChange(date)}
            InputProps={{
              readOnly: true,
            }}
          />
        </LocalizationProvider>
      );
    } else if (question.type === "2") {
      return (
        <Autocomplete
          {...commonProps}
          options={question.options}
          renderInput={(params) => (
            <TextField {...params} label={question.questionName} variant="outlined" />
          )}
          value={question.answer}
          onChange={(e, value) => handleFieldChange(value)}
          readOnly
        />
      );
    } else {
      return (
        <TextField
          label={question.questionName}
          {...commonProps}
          value={question.answer}
          onChange={(e) => handleFieldChange(e.target.value)}
          InputProps={{
            readOnly: true,
          }}
        />
      );
    }
  };

  const groupFieldsByCategory = (data) => {
    const groupedFields = {};
    data.forEach((question) => {
      const { category } = question;
      if (!groupedFields[category]) {
        groupedFields[category] = [];
      }
      groupedFields[category].push(renderFormField(question));
    });
    return groupedFields;
  };

  const groupedFields = groupFieldsByCategory(profile);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {Object.entries(groupedFields)
          .slice(0, 3)
          .map(([category, fields], index) => (
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                {category}
              </Typography>
              {fields}
            </Box>
          ))}
      </Grid>
      <Grid item xs={6}>
        {Object.entries(groupedFields)
          .slice(3)
          .map(([category, fields], index) => (
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                {category}
              </Typography>
              {fields}
            </Box>
          ))}
      </Grid>
    </Grid>
  );
}
