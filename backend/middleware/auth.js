const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================ AUTH ================
exports.auth = (req, res, next) => {
  try {
    // Extract token from body, cookies, or headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // If token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Log the source of the token for debugging
    console.log(
      "Token received from:",
      req.body?.token ? "Body" : req.cookies?.token ? "Cookies" : "Headers"
    );

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = decoded; // Attach decoded user to request object
    } catch (error) {
      console.log("Error while decoding token:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Error while decoding token",
        error: error.message,
      });
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log("Error while token validating:", error);
    return res.status(500).json({
      success: false,
      message: "Error while token validating",
      error: error.message,
    });
  }
};

// ================ IS STUDENT ================
exports.isStudent = (req, res, next) => {
  try {
    if (req.user?.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This page is protected only for students",
      });
    }
    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log(
      "Error while checking user validity with student accountType:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error while checking user validity with student accountType",
      error: error.message,
    });
  }
};

// ================ IS INSTRUCTOR ================
exports.isInstructor = (req, res, next) => {
  try {
    if (req.user?.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This page is protected only for instructors",
      });
    }
    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log(
      "Error while checking user validity with Instructor accountType:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error while checking user validity with Instructor accountType",
      error: error.message,
    });
  }
};

// ================ IS ADMIN ================
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user?.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This page is protected only for admins",
      });
    }
    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log(
      "Error while checking user validity with Admin accountType:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error while checking user validity with Admin accountType",
      error: error.message,
    });
  }
};
