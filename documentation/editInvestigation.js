/**
 * @swagger
 * /api/client/bu/investigation/edit:
 *   put:
 *     summary: Edit an existing investigation
 *     description: Updates the details of an existing investigation by providing a valid `investigationId` and new data to update.
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
 *                 description: Unique identifier for the investigation to be edited.
 *                 example: "6745406eb193ebcde507ef86"
 *               investigationName:
 *                 type: string
 *                 description: Name of the investigation.
 *                 example: "ECG Test"
 *               discription:
 *                 type: string
 *                 description: Updated detailed description of the investigation.
 *                 example: "An updated test description for analyzing cardiac activity."
 *               clientId:
 *                 type: string
 *                 description: Unique identifier for the client associated with the investigation.
 *                 example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: Investigation updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Investigation updated successfully."
 *               data:
 *                 investigationId: "6745406eb193ebcde507ef86"
 *                 investigationName: "ECG Test"
 *                 discription: "An updated test description for analyzing cardiac activity."
 *                 clientId: "6735e64c5c58f271b1ce1678"
 *       400:
 *         description: Invalid input data provided.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please provide valid fields."
 *       404:
 *         description: Investigation not found for the provided `investigationId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Investigation not found."
 *       409:
 *         description: Conflict due to duplicate investigation name or other constraints.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 409
 *               message: "Investigation update failed. Duplicate investigation name."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error. Unable to update investigation."
 */
