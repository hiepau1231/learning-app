import { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "./../../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import Loading from "./../../common/Loading";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { setOpenSideMenu, setScreenSize } from "../../../slices/sidebarSlice";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Theo dõi trạng thái của modal xác nhận
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Xử lý mở / đóng menu bên
  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Nếu kích thước màn hình nhỏ, thì đóng menu bên
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setOpenSideMenu(false));
    } else dispatch(setOpenSideMenu(true));
  }, [screenSize]);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer "
        onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}
      >
        {openSideMenu ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
      </div>

      {openSideMenu && (
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ">
          <div className="flex flex-col mt-6">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                  setOpenSideMenu={setOpenSideMenu}
                />
              );
            })}
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Cài đặt", path: "/dashboard/settings" }}
              iconName={"VscSettingsGear"}
              setOpenSideMen={setOpenSideMenu}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Bạn có chắc không?",
                  text2: "Bạn sẽ bị đăng xuất khỏi tài khoản của mình.",
                  btn1Text: "Đăng xuất",
                  btn2Text: "Hủy",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className=" "
            >
              <div className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 relative">
                <VscSignOut className="text-lg" />
                <span>Đăng xuất</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}