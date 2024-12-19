import React, { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import IconBtn from "../components/common/IconBtn";
import TableCategory from "../components/core/Dashboard/Category/TableCategory";
import useFetchData from "../hooks/useFetchData";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../services/operations/categoryAPI";
import AddEditCategory from "./AddEditCategory";
import ConfirmationModal from "../components/common/ConfirmationModal";

const Category = () => {
    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [initialValues, setInitialValues] = useState({
        _id: null,
        name: "",
        description: "",
    });

    const [confirmationModal, setConfirmationModal] = useState(null);
    const { data, loading, refetchData } = useFetchData({
        fn: getCategories,
        defaultValue: [],
    });

    const handleSubmit = async (values) => {
        let result = false;

        if (values._id) {
            result = await updateCategory(values);
        } else {
            result = await createCategory(values);
        }

        if (result) {
            refetchData();
            setOpenAddEdit(false);
        }
    };

    const handleCategoryDelete = async (id) => {
        const result = await deleteCategory({ _id: id });
        if (result) {
            refetchData();
            setConfirmationModal(null);
        }
    };

    return (
        <div className="text-white">
            <div className="mb-14 flex justify-between">
                <h1 className="text-4xl font-medium text-richblack-5  text-center lg:text-left">
                    Danh mục khóa học
                </h1>
                <IconBtn onclick={() => setOpenAddEdit(true)} text="Thêm danh mục">
                    <VscAdd />
                </IconBtn>
            </div>

            <AddEditCategory
                open={openAddEdit}
                onClose={() => setOpenAddEdit(false)}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onChangeValues={(name, value) => {
                    setInitialValues((prev) => ({
                        ...prev,
                        [name]: value,
                    }));
                }}
            />

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

            <TableCategory
                categories={data}
                loading={loading}
                onEdit={(value) => {
                    setOpenAddEdit(true);
                    setInitialValues(value);
                }}
                onDelete={(value) => {
                    setConfirmationModal({
                        text1: "Bạn có muốn xóa danh mục này không?",
                        text2: "Tất cả dữ liệu liên quan đến danh mục này sẽ bị xóa",
                        btn1Text: !loading ? "Xóa" : "Đang tải...",
                        btn2Text: "Hủy",
                        btn1Handler: !loading ? () => handleCategoryDelete(value._id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                    });
                }}
            />
        </div>
    );
};

export default Category;
