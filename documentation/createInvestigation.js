/**
 * @swagger
 * /api/client/bu/investigation/create:
 *   post:
 *     summary: Create a new investigation
 *     description: Adds a new investigation with the provided details such as `investigationName`, `description`, and associates it with a client using `clientId`.
 *     tags:
 *       - Investigation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the investigation.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               investigationName:
 *                 type: string
 *                 description: Name of the investigation.
 *                 example: "ECG"
 *               discription:
 *                 type: string
 *                 description: Detailed description of the investigation.
 *                 example: "A test to analyze heart activity."
 *     responses:
 *       201:
 *         description: Investigation created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 201
 *               message: "Investigation created successfully."
 *               data:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 investigationName: "ECG"
 *                 discription: "A test to analyze heart activity."
 *       400:
 *         description: Bad request due to missing or invalid input.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please provide all required fields."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
