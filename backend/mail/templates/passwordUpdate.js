exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Xác Thực Cập Nhật Mật Khẩu</title>
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
            <a href="http://localhost:5173"><img class="logo"
                    src="https://i.ibb.co/Lh00NLp/Black-Illustrated-School-Logo.png" alt="Logo Tri Thức Mới"></a>
            <div class="message">Xác Thực Cập Nhật Mật Khẩu</div>
            <div class="body">
                <p>Chào ${name},</p>
                <p>Mật khẩu của bạn đã được cập nhật thành công cho email <span class="highlight">${email}</span>.</p>
                <p>Nếu bạn không yêu cầu thay đổi mật khẩu này, vui lòng liên hệ với chúng tôi ngay lập tức để bảo vệ tài khoản của bạn.</p>
            </div>
            <div class="support">Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua
                <a href="mailto:info@nguyenthikimxuyen.com">info@nguyenthikimxuyen.com</a>. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </div>
        </div>
    </body>

    </html>`;
};
