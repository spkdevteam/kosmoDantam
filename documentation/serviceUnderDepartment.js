/**
 * @swagger
 * /api/client/bu/services/serviceUnderDepartment:
 *   get:
 *     summary: Get services under a specific department
 *     description: Retrieves all services associated with a specified department for a given client.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the department.
 *         example: "673efa60c071b7a57c1238b7"
 *     responses:
 *       200:
 *         description: List of services under the specified department.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Services retrieved successfully."
 *               services:
 *                 - serviceId: "SVC001"
 *                   serviceName: "General Checkup"
 *                   description: "A routine checkup for patients."
 *                   price: 100
 *                   procedures: ["Procedure 1", "Procedure 2"]
 *                 - serviceId: "SVC002"
 *                   serviceName: "Dental Cleaning"
 *                   description: "Professional cleaning of teeth to maintain oral hygiene."
 *                   price: 150
 *                   procedures: ["Procedure 3"]
 *       400:
 *         description: Validation error or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid clientId and departmentId."
 *       404:
 *         description: No services found for the specified client and department.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No services found for the given department."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
