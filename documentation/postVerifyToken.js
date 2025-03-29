/**
 * @swagger
 * components:
 *   schemas:
 *     TokenVerificationRequest:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token to be verified.
 *           example: "your.jwt.token.here"
 *       required:
 *         - token
 * 
 *     TokenVerificationSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         decodedToken:
 *           type: object
 *           example:
 *             id: "123456789"
 *             email: "user@example.com"
 *             iat: 1711840672
 *             exp: 1712445472
 *         message:
 *           type: string
 *           example: "Token decoded successfully"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message here"
 * 
 * paths:
 *   /api/client/auth/verifyToken:
 *     post:
 *       summary: Verify JWT Token
 *       description: Decodes and verifies the provided JWT token.
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenVerificationRequest'
 *       responses:
 *         200:
 *           description: Token decoded successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TokenVerificationSuccess'
 *         400:
 *           description: Missing token in request body.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 message: "No token is sent!"
 *         403:
 *           description: Token verification failed.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 message: "Token decodation failed!!!"
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 message: "An error occurred while processing the request"
 */
