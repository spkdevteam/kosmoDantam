/**
 * @swagger
 * /api/client/bu/findings/toggleFindings:
 *   post:
 *     summary: Toggle the active status of a finding
 *     description: Enables or disables the active status of a specified finding for a client.
 *     tags:
 *       - Findings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             _Id: "67413850c071b7a57c126372"
 *             clientId: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Finding status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Finding status toggled successfully."
 *               data:
 *                 findingsId: "67413850c071b7a57c126372"
 *                 isActive: false
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *       400:
 *         description: Validation error or missing fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Finding not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Finding not found. Please check the findingsId."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
