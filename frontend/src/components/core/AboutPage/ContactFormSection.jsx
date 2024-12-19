import ContactUsForm from "../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">
        Liên Hệ Với Chúng Tôi
      </h1>
      <p className="text-center text-richblack-300 mt-3">
        Chúng tôi rất mong nhận được phản hồi từ bạn, vui lòng điền vào mẫu form
        này.
      </p>

      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
