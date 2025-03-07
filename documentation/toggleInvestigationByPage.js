/**
 * @swagger
 * /api/client/bu/investigation/toggleInvestigationByPage:
 *   put:
 *     summary: Toggle Status of an Investigation
 *     description: Toggles the status (active/inactive) of an investigation identified by `investigationId` and `clientId`. Includes pagination and keyword filters for related investigations.
 *     tags:
 *       - Investigation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               investigationId:
 *                 type: string
 *                 description: Unique identifier of the investigation to toggle status.
 *                 example: "6745406eb193ebcde507ef86"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related investigations.
 *                 example: "MRI"
 *               page:
 *                 type: integer
 *                 description: Page number for pagination (default is 0).
 *                 example: 1
 *               perPage:
 *                 type: integer
 *                 description: Number of items per page (default is 10).
 *                 example: 5
 *     responses:
 *       200:
 *         description: Investigation status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Investigation status toggled successfully."
 *               data:
 *                 investigationId: "investigation123"
 *                 investigationName: "MRI Scan"
 *                 isActive: false
 *                 relatedInvestigations:
 *                   totalCount: 15
 *                   investigations:
 *                     - investigationId: "investigation124"
 *                       investigationName: "CT Scan"
 *                       isActive: true
 *                     - investigationId: "investigation125"
 *                       investigationName: "X-Ray"
 *                       isActive: false
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please verify the details."
 *       404:
 *         description: Investigation not found for the provided `investigationId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Investigation not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
