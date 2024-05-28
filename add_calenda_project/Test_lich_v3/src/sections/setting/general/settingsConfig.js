import { PencilSquareIcon, Squares2X2Icon, UserIcon } from "@heroicons/react/24/solid";
import {
    School,
    Apartment,
    Business,
    Assignment,
    AccessibilityNew,
    SettingsApplications,
    Description,
    BusinessCenter,
    Work,
    People,
    LocalLibrary,
    LocationCity,
    LocalHospital,
    Home,
    FlightTakeoff,
    PeopleAlt,
    Group,
    Movie,
    Groups,
    Groups2,
    Diversity1,
    AddLocationAlt,
    HelpCenter,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const settingsConfig = [
    // {
    //     title: "Giáo viên",
    //     path: "/setting/teacher",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><UserIcon /></SvgIcon>,
    //     group: "Quản lý Nhân Sự"
    // },
    // {
    //     title: "Lớp học",
    //     path: "/setting/classroom",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><School /></SvgIcon>,
    //     group: "Quản lý Nhân Sự"
    // },
    {
        title: "KTX",
        path: "/setting/dormitory",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><Apartment /></SvgIcon>,
        group: "Quản lý Nhân Sự"
    },
    {
        title: "Phòng",
        path: "/setting/room",
        icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><Home /></SvgIcon>,
        group: "Quản lý Nhân Sự"
    },
    {
        title: "Nhóm câu hỏi",
        path: "/setting/question-group",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><HelpCenter /></SvgIcon>,
        group: "Quản lý thực tập sinh"
    },
    {
        title: "Tạo câu hỏi",
        path: "/setting/create-question",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><PencilSquareIcon /></SvgIcon>,
        group: "Quản lý thực tập sinh"
    },
    {
        title: "Tài sản - Dụng cụ",
        path: "/setting/item",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff9800' }}><Assignment /></SvgIcon>,
        group: "Quản lý Tài Sản"
    },
    {
        title: "Ngành nghề",
        path: "/setting/profession",
        icon: <SvgIcon fontSize="medium" style={{ color: '#9c27b0' }}><Business /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Thị trường",
        path: "/setting/market",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><BusinessCenter /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Trình độ văn hóa",
        path: "/setting/educationLevel",
        icon: <SvgIcon fontSize="medium" style={{ color: '#3f51b5' }}><AccessibilityNew /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Cấu hình hệ thống",
        path: "/setting/system",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><SettingsApplications /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Giấy tờ",
        path: "/setting/documents",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><Description /></SvgIcon>,
        group: "Quản lý Văn Thư"
    },
    {
        title: "Công ty chứng nghề",
        path: "/setting/professionalCertification",
        icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><BusinessCenter /></SvgIcon>,
        group: "Quản lý Văn Thư"
    },
    {
        title: "Trường học",
        path: "/setting/school",
        icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><LocalLibrary /></SvgIcon>,
        group: "Quản lý Văn Thư"
    },
    {
        title: "Chuyên ngành",
        path: "/setting/major",
        icon: <SvgIcon fontSize="medium" style={{ color: '#9c27b0' }}><Work /></SvgIcon>,
        group: "Quản lý Văn Thư"
    },
    {
        title: "Tỉnh thành",
        path: "/setting/province",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><LocationCity /></SvgIcon>,
        group: "Quản lý Văn Thư"
    },
    {
        title: "Cơ quan cấp hộ chiếu",
        path: "/setting/passport-issuing-agency",
        icon: <SvgIcon fontSize="medium" style={{ color: '#3f51b5' }}><LocalHospital /></SvgIcon>,
        group: "Quản lý Văn Thư"
    },
    // {
    //     title: "Chương trình tham gia",
    //     path: "/setting/participation-program",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><Movie /></SvgIcon>,
    //     group: "Quản lý Hệ Thống và Cấu Hình"
    // },
    {
        title: "Dân tộc",
        path: "/setting/ethnicity",
        icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><Diversity1 /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Nhóm xuất cảnh",
        path: "/setting/emigration-group",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><Groups /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Sân bay",
        path: "/setting/airport",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><AddLocationAlt /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
    {
        title: "Menu",
        path: "/setting/menu",
        icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><Squares2X2Icon /></SvgIcon>,
        group: "Quản lý Hệ Thống và Cấu Hình"
    },
];


export default settingsConfig;
