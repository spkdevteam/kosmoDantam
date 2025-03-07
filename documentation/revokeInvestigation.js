/**
 * @swagger
 * /api/client/bu/investigation/revoke:
 *   post:
 *     summary: Revoke an investigation
 *     description: Revokes an investigation by marking it as no longer valid or active based on its `investigationId`.
 *     tags:
 *       - Investigation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               investigationId:
 *                 type: string
 *                 description: Unique identifier for the investigation to be revoked.
 *                 example: "6745406eb193ebcde507ef86"
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the investigation.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Investigation revoked successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Investigation revoked successfully."
 *               data:
 *                 investigationId: "6745406eb193ebcde507ef86"
 *       400:
 *         description: Bad request due to missing or invalid input.
 *         content:
 *           application/json:
 *             example:
 *               status: false,
 *               statusCode: 400,
 *               message: "Invalid input data. Please provide all required fields."
 *       404:
 *         description: Investigation not found for the given `investigationId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false,
 *               statusCode: 404,
 *               message: "Investigation not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false,
 *               statusCode: 500,
 *               message: "Internal server error."
 */
