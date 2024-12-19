import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-richblack-800 mx-7 rounded-3xl mb-10">
      <div className="w-11/12 max-w-maxContent mx-auto py-10">
        <div className="text-center text-richblack-400">
          <div className="flex items-center justify-center gap-2">
            <span>Tạo bởi</span>
            <span className="text-pink-200">❤️</span>
            <Link to="#" className="text-white hover:text-yellow-50 transition-all duration-200">
              Kim Xuyến
            </Link>
          </div>
          <p className="mt-2 text-sm">© 2024 Tri Thức Mới</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
