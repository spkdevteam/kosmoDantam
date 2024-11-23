/**
 * @swagger
 * /api/client/bu/findings/delete:
 *   delete:
 *     summary: Delete a finding
 *     description: Removes a specific finding from the system using query parameters.
 *     tags:
 *       - Findings
 *     parameters:
 *       - in: query
 *         name: _Id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the finding to be deleted.
 *         example: "67413850c071b7a57c126372"
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client associated with the finding.
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Finding deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Finding deleted successfully."
 *               data:
 *                 findingsId: "67413850c071b7a57c126372"
 *       400:
 *         description: Validation error or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the query parameters."
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
