/**
 * @swagger
 * /api/client/bu/findings/revokeDeletedFindings:
 *   put:
 *     summary: Revoke a deleted finding
 *     description: Reactivates a previously deleted finding by removing the `deletedAt` timestamp.
 *     tags:
 *       - Findings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _Id:
 *                 type: string
 *                 description: The ID of the finding to be reactivated.
 *                 example: "67413850c071b7a57c126372"
 *               clientId:
 *                 type: string
 *                 description: The ID of the client associated with the finding.
 *                 example: "6735e64c5c58f271b1ce1678"
 *           example:
 *             _Id: "67413850c071b7a57c126372"
 *             clientId: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Finding reactivated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Finding reactivated successfully."
 *               data:
 *                 findingsId: "67413850c071b7a57c126372"
 *                 findingsName: "Blood Test Results"
 *       400:
 *         description: Validation error or missing fields in the request body.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Finding not found or is already active.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Finding not found or is already active."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
