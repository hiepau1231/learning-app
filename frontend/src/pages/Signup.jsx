import signupImg from "../assets/Images/signup.png";
import Template from "../components/core/Auth/Template";

function Signup() {
  return (
    <Template
      title="Tham gia cùng hàng triệu người học tin học với Tri Thức Mới miễn phí"
      description1="Xây dựng kỹ năng cho hiện tại, tương lai và xa hơn."
      description2="Giáo dục để bảo vệ sự nghiệp của bạn trong tương lai."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
