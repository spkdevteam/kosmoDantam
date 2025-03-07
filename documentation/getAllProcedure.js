/**
 * @swagger
 * /api/client/bu/procedures/getAllProcedures:
 *   get:
 *     summary: Get all procedures
 *     description: Fetches a list of all procedures available for a specific client.
 *     tags:
 *       - Procedures
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: List of procedures fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedures fetched successfully."
 *               data:
 *                 - procedureId: "PROC001"
 *                   procedureName: "Blood Test"
 *                   description: "A diagnostic test for analyzing blood samples."
 *                   price: 50
 *                   isActive: true
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *                 - procedureId: "PROC002"
 *                   procedureName: "X-Ray"
 *                   description: "A radiographic image of internal body structures."
 *                   price: 100
 *                   isActive: true
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *       400:
 *         description: Missing required query parameter.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input data. Missing `clientId`."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
