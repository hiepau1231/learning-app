const { eventNames } = require("../../models/section");

const otpTemplate = (otp, name) => {
  return `<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title>Email Xác Thực OTP</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}

			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}

			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}

			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}

			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}

			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}

			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}

			.highlight {
				font-weight: bold;
			}
		</style>

	</head>

	<body>
		<div class="container">
			<a href=""><img class="logo"
					src="https://i.ibb.co/Lh00NLp/Black-Illustrated-School-Logo.png" alt="Logo Tri Thức Mới"></a>
			<div class="message">Email Xác Thực OTP</div>
			<div class="body">
				<p>Chào ${name},</p>
				<p>Cảm ơn bạn đã đăng ký với Tri Thức Mới. Để hoàn tất quá trình đăng ký, vui lòng sử dụng OTP (Mật khẩu một lần) dưới đây để xác thực tài khoản của bạn:</p>
				<h2 class="highlight">${otp}</h2>
				<p>Mã OTP này có hiệu lực trong vòng 3 phút. Nếu bạn không yêu cầu xác thực này, vui lòng bỏ qua email này. Khi tài khoản của bạn được xác thực, bạn sẽ có quyền truy cập vào nền tảng của chúng tôi và các tính năng của nó.</p>
			</div>
			<div class="support">Nếu bạn có bất kỳ câu hỏi nào hoặc cần trợ giúp, vui lòng liên hệ với chúng tôi qua <a
					href="mailto:nguyenthikimxuyen@gmail.com">nguyenthikimxuyen@gmail.com</a>. Chúng tôi luôn sẵn sàng hỗ trợ bạn!</div>
		</div>
	</body>

	</html>`;
};

module.exports = otpTemplate;
