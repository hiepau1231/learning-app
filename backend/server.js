const express = require("express");
const app = express();

// packages
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// connection to DB and cloudinary
const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const seedData = require("./utils/seed");

// routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");

// middleware
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

const PORT = process.env.PORT || 5000;

// mount route
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send(`<div>
    This is Default Route
    <p>Everything is OK</p>
    </div>`);
});

// Khởi động server
const startServer = async () => {
    try {
        // Kết nối database
        await connectDB();
        
        // Kết nối cloudinary
        cloudinaryConnect();
        
        // Thêm dữ liệu mẫu
        await seedData();
        
        // Khởi động server
        app.listen(PORT, () => {
            console.log(`Server Started on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
