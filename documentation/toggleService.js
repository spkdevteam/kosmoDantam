/**
 * @swagger
 * /api/client/bu/services/toggleService:
 *   patch:
 *     summary: Toggle service status (on/off)
 *     description: Toggles the status of a service (activates or deactivates) based on the provided `clientId` and `serviceId`.
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: "6735e64c5c58f271b1ce1678"
 *             serviceId: "UT-AB-2024-SV1001"
 
 *     responses:
 *       200:
 *         description: Service status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Service status updated successfully."
 *               data:
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *                 serviceId: "UT-AB-2024-SV1001"
 *                 status: true  # or false depending on the operation
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Service not found by serviceId.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Service with the specified ID not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
