import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

// ================ Lấy Thông Tin Người Dùng ================
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Kết quả API LẤY THÔNG TIN NGƯỜI DÙNG............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("LỖI API LẤY THÔNG TIN NGƯỜI DÙNG............", error);
      toast.error("Không thể lấy thông tin người dùng");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

// ================ Lấy Các Khóa Học Người Dùng Đã Đăng Ký ================
export async function getUserEnrolledCourses(token, userId) {
  const toastId = toast.loading("Đang tải...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      `${GET_USER_ENROLLED_COURSES_API}?userId=${userId}`,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log(
      "LỖI API LẤY CÁC KHÓA HỌC NGƯỜI DÙNG ĐÃ ĐĂNG KÝ............",
      error
    );
    toast.error("Không thể lấy các khóa học đã đăng ký");
  }
  toast.dismiss(toastId);
  return result;
}

// ================ Lấy Dữ Liệu Giảng Viên ================
export async function getInstructorData(token) {
  // const toastId = toast.loading("Đang tải...")
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Kết quả API LẤY DỮ LIỆU GIẢNG VIÊN............", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("LỖI API LẤY DỮ LIỆU GIẢNG VIÊN............", error);
    toast.error("Không thể lấy dữ liệu giảng viên");
  }
  // toast.dismiss(toastId)
  return result;
}
