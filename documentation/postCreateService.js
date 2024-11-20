/**
 * @swagger
 * /api/client/bu/services/createServices:
 *   post:
 *     summary: Create a new service
 *     description: Adds a new service to the system for a specified client, including branch, department, procedures, and pricing information.
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             branchId: "BR001"
 *             serviceId: null
 *             deptId: "UT-AB-2024-DP100008"
 *             procedures: ["Procedure 1", "Procedure 2"]
 *             serviceName: "General Checkup"
 *             description: "A routine checkup for patients."
 *             price: 100
 *     responses:
 *       201:
 *         description: Service created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Service created successfully."
 *               service:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 branchId: "BR001"
 *                 serviceId: "SVC001"
 *                 deptId: "UT-AB-2024-DP100008"
 *                 procedures: ["Procedure 1", "Procedure 2"]
 *                 serviceName: "General Checkup"
 *                 description: "A routine checkup for patients."
 *                 price: 100
 *       400:
 *         description: Validation error or duplicate entry.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Duplicate entry. serviceId or serviceName already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
