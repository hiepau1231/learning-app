import loginImg from "../assets/Images/login.png";
import Template from "../components/core/Auth/Template";

function Login() {
  return (
    <Template
      title="Chào Mừng Quay Lại"
      description1="Xây dựng kỹ năng cho hiện tại, tương lai và xa hơn."
      description2="Giáo dục để bảo vệ sự nghiệp của bạn trong tương lai."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
