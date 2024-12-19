import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="p-[40px] bg-white pt-[100px] ">
      <div>
        <div>
          <div>
            <div className="text-center">
              <div className="h-[400px] bg-center bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] ">
                <h1 className="text-center text-6xl font-extrabold text-black ">
                  404
                </h1>
              </div>

              <div className="-mt-12 ">
                <h3 className="text-4xl mb-1 ">Có vẻ như bạn đã lạc đường</h3>

                <p>Trang bạn tìm kiếm không có sẵn!</p>

                <Link
                  to="/"
                  className=" py-[13px] px-10 text-lg bg-caribbeangreen-200 hover:bg-caribbeangreen-400 my-5 inline-block rounded-full font-semibold duration-300"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;