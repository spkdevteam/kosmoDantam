/**
 * @swagger
 * paths:
 *   /human/createUser:
 *     post:
 *       summary: Create a new user
 *       description: Creates a new user in the system with the provided details.
 *       tags:
 *         - User Management
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   example: "Admin"
 *                 roleId:
 *                   type: string
 *                   example: "RL10000001"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 middleName:
 *                   type: string
 *                   example: "A"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 gender:
 *                   type: string
 *                   example: "Male"
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "john.doe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 optionalEmail:
 *                   type: string
 *                   format: email
 *                   example: "john.optional@example.com"
 *                 emergencyPhone:
 *                   type: string
 *                   example: "+0987654321"
 *                 city:
 *                   type: string
 *                   example: "New York"
 *                 state:
 *                   type: string
 *                   example: "NY"
 *                 zipCode:
 *                   type: string
 *                   example: "10001"
 *                 address:
 *                   type: string
 *                   example: "123 Main St"
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: "Password@123"
 *                 tc:
 *                   type: boolean
 *                   example: true
 *                 isUserVerified:
 *                   type: boolean
 *                   example: false
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 profileImage:
 *                   type: string
 *                   format: uri
 *                   example: "https://example.com/images/profile.jpg"
 *                 profileCreated:
 *                   type: boolean
 *                   example: true
 *                 verificationOtp:
 *                   type: string
 *                   example: "123456"
 *                 otpGeneratedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-18T10:00:00Z"
 *                 OTP:
 *                   type: string
 *                   example: "654321"
 *                 createdBy:
 *                   type: string
 *                   example: "adminUser"
 *                 isCreatedBySuperAdmin:
 *                   type: boolean
 *                   example: true
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *               required:
 *                 - role
 *                 - roleId
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - phone
 *                 - password
 *                 - tc
 *       responses:
 *         201:
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "User created successfully"
 *                   userId:
 *                     type: string
 *                     example: "USR10000001"
 *         400:
 *           description: Invalid input data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Invalid input data"
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */
