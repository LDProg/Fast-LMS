// Array of routes accessible to the public
// Do not require authentication
export const publicRoutes = [
  // "/",
  "/auth/email-verification",
  "/api/uploadthing",
  "/api/webhook",
];

// Array of routes used for authentication
// Routes will redirect logged in users to /admin/dashboard
export const authRoutes = ["/auth/login", "/auth/register", "/auth"];

// Array of routes used for admin authentication
// Routes will redirect logged in users to /admin/dashboard
export const adminRoutes = ["/teacher/courses", "/teacher/analytics"];

// Array of routes used for salesforce authentication
// Routes will redirect logged in users to /admin/dashboard
export const salesforceRoutes = ["/salesforce/*"];

// Prefix for API authentication routes
// Routes that start with this prefix are used for API authentication purposes
export const apiAuthPrefix = "/api/auth";

// Prefix for API stripe routes
// Routes that start with this prefix are used for API payment purposes
export const apiStripePrefix = "/api/webhook";

// Prefix for API uploadthing routes
// Routes that start with this prefix are used for API uploading purposes
export const apiUploadthingPrefix = "/api/uploadthing";

// Default redirect path after user logged in successfully
export const DEFAULT_LOGGEDIN_REDIRECT = ["/lms"];

// Default redirect path after salesforce logged in successfully
export const DEFAULT_SALESFORCE_LOGGEDIN_REDIRECT = ["/salesforce/dashboard"];

// Default redirect path after admin logged in successfully
export const DEFAULT_ADMIN_LOGGEDIN_REDIRECT = ["/lms/teacher/courses"];
