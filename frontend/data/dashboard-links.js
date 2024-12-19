import { ACCOUNT_TYPE } from "./../src/utils/constants";

export const sidebarLinks = [
    {
        id: 1,
        name: "Hồ sơ của tôi",
        path: "/dashboard/my-profile",
        icon: "VscAccount",
    },
    {
        id: 3,
        name: "Bảng điều khiển",
        path: "/dashboard/instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        icon: "VscDashboard",
    },
    {
        id: 4,
        name: "Khóa học của tôi",
        path: "/dashboard/my-courses",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        icon: "VscVm",
    },
    {
        id: 5,
        name: "Thêm khóa học",
        path: "/dashboard/add-course",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        icon: "VscAdd",
    },
    {
        id: 6,
        name: "Khóa học đăng ký",
        path: "/dashboard/enrolled-courses",
        type: ACCOUNT_TYPE.STUDENT,
        icon: "VscMortarBoard",
    },
    {
        id: 7,
        name: "Lịch sử khóa học",
        path: "/dashboard/purchase-history",
        type: ACCOUNT_TYPE.STUDENT,
        icon: "VscHistory",
    },
    {
        id: 8,
        name: "Danh mục khóa học",
        path: "/dashboard/category",
        type: ACCOUNT_TYPE.ADMIN,
        icon: "VscBrowser",
    },
];
