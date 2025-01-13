/**
 * @swagger
 * /api/client/bu/patient/patient/{clientId}/{patientId}:
 *   get:
 *     tags:
 *       - Patient
 *     summary: Retrieve patient details
 *     description: Fetch patient details using the client ID and an optional patient ID.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the client.
 *       - in: path
 *         name: patientId
 *         required: false
 *         schema:
 *           type: string
 *           nullable: true
 *         description: The optional unique ID of the patient. If not provided, retrieves all patients for the client.
 *     responses:
 *       200:
 *         description: Successfully retrieved patient details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       patientId:
 *                         type: string
 *                         example: "64f8e29e4aeb9d001b6c3d9e"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       age:
 *                         type: integer
 *                         example: 34
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *       400:
 *         description: Bad Request - Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid clientId or patientId."
 *       404:
 *         description: Patient not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No patient found for the given ID."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
