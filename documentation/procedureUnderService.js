/**
 * @swagger
 * /api/client/bu/procedures/procedureUnderService:
 *   get:
 *     summary: Get procedures under a specific service
 *     description: Retrieves all procedures associated with a specified service for a given client.
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
 *       - in: query
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the service.
 *         example: "673d6103c071b7a57c1227dc"
 *     responses:
 *       200:
 *         description: List of procedures under the specified service.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Procedures retrieved successfully."
 *               procedures:
 *                 - procedureId: "PRC001"
 *                   procedureName: "Tooth Extraction"
 *                   description: "Removing a decayed or damaged tooth."
 *                 - procedureId: "PRC002"
 *                   procedureName: "Root Canal"
 *                   description: "Treatment of the tooth's pulp to eliminate infection."
 *       400:
 *         description: Validation error or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid clientId and serviceId."
 *       404:
 *         description: No procedures found for the specified service.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No procedures found for the given service."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
