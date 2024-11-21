/**
 * @swagger
 * /api/client/bu/services/editService:
 *   put:
 *     summary: Edit an existing service
 *     description: Updates the details of an existing service for a specified client, including branch, department, procedures, and pricing information.
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             branchId: "6736e43eecc4dfe280f90d03"
 *             serviceId: "673f1a23c071b7a57c123a0e"
 *             deptId: "673efa60c071b7a57c1238b7"
 *             procedures: ["Procedure 1", "Updated Procedure 2"]
 *             serviceName: "asGeneral Checkup"
 *             description: "An updated routine checkup for patients."
 *             price: 120.0
 *     responses:
 *       200:
 *         description: Service updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Service updated successfully."
 *               service:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 branchId: "BR001"
 *                 serviceId: "UT-AB-2024-SV1017"
 *                 deptId: "UT-AB-2024-DP100008"
 *                 procedures: ["Procedure 1", "Updated Procedure 2"]
 *                 serviceName: "asGeneral Checkup"
 *                 description: "An updated routine checkup for patients."
 *                 price: 120.0
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Service not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Service not found with the provided serviceId."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
