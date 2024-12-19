import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const BASE_URL = "http://localhost:8080/api/v1/course";

export const createCategory = async (data) => {
    const toastId = toast.loading("Đang thêm danh mục khóa học...");
    let token = localStorage.getItem("token");

    if (!token) {
        toast.error("Vui lý đăng nhập");
        toast.dismiss(toastId);
        return;
    }

    token = token.replace(/"/g, "");

    try {
        const response = await apiConnector("POST", `${BASE_URL}/createCategory`, data, {
            Authorization: `Bearer ${token}`,
        });
        toast.success("Danh mục thêm thành công");
        return response.data;
    } catch (error) {
        toast.error(error.message);
    } finally {
        toast.dismiss(toastId);
    }
};

export const updateCategory = async (data) => {
    const toastId = toast.loading("Đang cập nhật danh mục khóa học...");
    let token = localStorage.getItem("token");

    if (!token) {
        toast.error("Vui lý đăng nhập");
        toast.dismiss(toastId);
        return;
    }

    token = token.replace(/"/g, "");

    try {
        const response = await apiConnector("POST", `${BASE_URL}/updateCategory`, data, {
            Authorization: `Bearer ${token}`,
        });
        toast.success("Danh mục cập nhật thành công");
        return response.data;
    } catch (error) {
        toast.error(error.message);
    } finally {
        toast.dismiss(toastId);
    }
};

export const deleteCategory = async (data) => {
    const toastId = toast.loading("Đang xóa mục khóa học...");
    let token = localStorage.getItem("token");

    if (!token) {
        toast.error("Vui lý đăng nhập");
        toast.dismiss(toastId);
        return;
    }

    token = token.replace(/"/g, "");

    try {
        const response = await apiConnector("POST", `${BASE_URL}/deleteCategory`, data, {
            Authorization: `Bearer ${token}`,
        });
        toast.success("Danh mục xóa thành công");
        return response.data;
    } catch (error) {
        toast.error(error.message);
    } finally {
        toast.dismiss(toastId);
    }
};

export const getCategories = async () => {
    const response = await apiConnector("GET", `${BASE_URL}/showAllCategories`);
    return response.data?.data;
};
