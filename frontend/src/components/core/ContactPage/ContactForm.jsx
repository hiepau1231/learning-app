import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Có ý tưởng? Chúng tôi có kỹ năng. Hãy cùng hợp tác
      </h1>
      <p className="">
        Hãy cho chúng tôi biết thêm về bạn và những gì bạn đang nghĩ.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
