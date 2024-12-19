import IconBtn from "../components/common/IconBtn";

export default function AddEditCategory({
    initialValues,
    onSubmit,
    open,
    onClose,
    onChangeValues,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(initialValues);
    };

    if (!open) return null;

    return (
        <form
            onSubmit={handleSubmit}
            className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"
        >
            <div className="w-10/12 max-w-[600px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <p className="text-2xl font-semibold text-richblack-5">
                    {initialValues?._id ? "Cập nhật danh  mục" : "Thêm danh mục"}
                </p>

                <div className="my-8">
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Tên danh mục <sup className="text-pink-200">*</sup>
                        </p>

                        <input
                            required
                            type="text"
                            name="text"
                            value={initialValues?.name}
                            onChange={(e) => onChangeValues("name", e.target.value)}
                            placeholder="Nhập tên danh mục"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                        />
                    </label>

                    <label className="w-full mt-4 block">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Mô tả <sup className="text-pink-200">*</sup>
                        </p>

                        <textarea
                            required
                            type="text"
                            name="text"
                            value={initialValues?.description}
                            onChange={(e) => onChangeValues("description", e.target.value)}
                            placeholder="Nhập đoạn mô tả ngắn"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
                        ></textarea>
                    </label>
                </div>

                <div className="flex items-center gap-x-4">
                    <IconBtn onclick={onClose} text={"Hủy bỏ"} type={"button"} />

                    <button
                        className="cursor-pointer rounded-md bg-richblack-200 text-richblack-900 hover:bg-richblack-900 hover:text-richblack-200
                                   py-[8px] px-[20px] font-semibold duration-300"
                        type="submit"
                    >
                        {initialValues?._id ? "Cập nhật" : "Thêm"}
                    </button>
                </div>
            </div>
        </form>
    );
}
