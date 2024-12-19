import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// Bảng hiển thị các danh mục
export default function TableCategory({ categories, loading, onEdit, onDelete }) {
    // Skeleton loading
    const skItem = () => {
        return (
            <div className="flex border-b border-richblack-800 px-6 py-8 w-full">
                <div className="flex flex-1 gap-x-4 ">
                    <div className="h-[148px] min-w-[300px] rounded-xl skeleton "></div>
                    <div className="flex flex-col w-[40%]">
                        <p className="h-5 w-[50%] rounded-xl skeleton"></p>
                        <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>
                        <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
                        <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Table className="rounded-2xl border border-richblack-800 ">
                {/* Tiêu đề bảng */}
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Tên danh mục
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Mô tả
                        </Th>

                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Hành động
                        </Th>
                    </Tr>
                </Thead>

                {/* Skeleton khi loading */}
                {loading && (
                    <div>
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}

                <Tbody>
                    {!loading && categories?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                Chưa có danh mục khóa học
                            </Td>
                        </Tr>
                    ) : (
                        categories?.map((category) => (
                            <Tr
                                key={category._id}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                            >
                                <Td className="flex flex-1 gap-x-4 relative">{category.name}</Td>

                                {/* Thời lượng khóa học */}
                                <Td className="text-sm font-medium text-richblack-100">
                                    {category.description}
                                </Td>

                                {/* Các nút hành động */}
                                <Td className="text-sm font-medium text-richblack-100 ">
                                    {/* Nút sửa */}
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            onEdit(category);
                                        }}
                                        title="Sửa"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    {/* Nút xóa */}
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            onDelete?.(category);
                                        }}
                                        title="Xóa"
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </>
    );
}
