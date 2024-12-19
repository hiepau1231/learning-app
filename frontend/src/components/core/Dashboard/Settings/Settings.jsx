import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5  text-center sm:text-left">
                Chỉnh sửa hồ sơ
            </h1>
            {/* Change Profile Picture */}
            <ChangeProfilePicture />
            {/* Profile */}
            <EditProfile />
            {/* Password */}
            <UpdatePassword />
            {/* Delete Account */}
            <DeleteAccount />
        </>
    );
}