/**
 * @swagger
 * /api/client/bu/services/getAllActiveServices:
 *   get:
 *     summary: Get all active services
 *     description: Retrieves all active services for a specified client, including details like service name, department, procedures, and pricing.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         description: The unique ID of the client for whom to fetch the services.
 *         schema:
 *           type: string
 *           example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Successfully retrieved all active services.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Active services retrieved successfully."
 *               services:
 *                 - serviceId: "SVC001"
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *                   branchId: "BR001"
 *                   deptId: "UT-AB-2024-DP100008"
 *                   procedures: ["Procedure 1", "Procedure 2"]
 *                   serviceName: "General Checkup"
 *                   description: "A routine checkup for patients."
 *                   price: 100.0
 *                   status: "active"
 *                 - serviceId: "SVC002"
 *                   clientId: "6735e64c5c58f271b1ce1678"
 *                   branchId: "BR002"
 *                   deptId: "UT-AB-2024-DP100009"
 *                   procedures: ["Procedure 3", "Procedure 4"]
 *                   serviceName: "Dental Checkup"
 *                   description: "A routine dental checkup for patients."
 *                   price: 150.0
 *                   status: "active"
 *       400:
 *         description: Bad request, invalid client ID or missing parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid clientId or missing parameters."
 *       404:
 *         description: No active services found for the provided client ID.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No active services found for the provided client ID."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
