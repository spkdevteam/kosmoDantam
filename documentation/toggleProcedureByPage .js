/**
 * @swagger
 * /api/client/bu/procedures/toggleProcedureByPage:
 *   put:
 *     summary: Toggle Status of a Procedure
 *     description: Toggles the status (active/inactive) of a procedure identified by `procedureId` and `clientId`. Includes pagination and keyword filters for related procedures.
 *     tags:
 *       - Procedures
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
 *               procedureId:
 *                 type: string
 *                 description: Unique identifier of the procedure to toggle status.
 *                 example: "673da3c1c071b7a57c122c92"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related procedures.
 *                 example: "surgery"
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
 *         description: Procedure status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Procedure status toggled successfully."
 *               data:
 *                 procedureId: "procedure123"
 *                 procedureName: "Knee Surgery"
 *                 isActive: false
 *                 relatedProcedures:
 *                   totalCount: 15
 *                   procedures:
 *                     - procedureId: "procedure124"
 *                       procedureName: "Hip Replacement"
 *                       isActive: true
 *                     - procedureId: "procedure125"
 *                       procedureName: "Spinal Fusion"
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
 *         description: Procedure not found for the provided `procedureId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Procedure not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
