/**
 * @swagger
 * /api/client/bu/prescription/prescription/{clientId}/{prescriptionId}:
 *   get:
 *     tags:
 *       - Prescription
 *     summary: Retrieve prescription details
 *     description: Fetch prescription details using the client ID and optional prescription ID.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the client.
 *       - in: path
 *         name: prescriptionId
 *         required: false
 *         schema:
 *           type: string
 *           nullable: true
 *         description: The optional unique ID of the prescription. If not provided, retrieves all prescriptions for the client.
 *     responses:
 *       200:
 *         description: Successfully retrieved prescription details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     prescriptionId:
 *                       type: string
 *                       example: "64f8e29e4aeb9d001b6c3d9f"
 *                     clientId:
 *                       type: string
 *                       example: "64f8e29e4aeb9d001b6c3d9e"
 *                     medication:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Paracetamol"
 *                           dosage:
 *                             type: string
 *                             example: "500mg"
 *                           frequency:
 *                             type: string
 *                             example: "Twice a day"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T12:34:56.789Z"
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
 *                   example: "Invalid clientId or prescriptionId."
 *       404:
 *         description: Prescription not found.
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
 *                   example: "No prescription found for the given ID."
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
