
/**
 * @swagger
 * /api/client/bu/prescription/deletePrescription:
 *   delete:
 *     summary: Delete a prescription
 *     description: Marks a prescription as deleted by setting the `deletedAt` timestamp.
 *     tags:
 *       - Prescription
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client requesting the deletion.
 *         example: "client12345"
 *       - in: query
 *         name: prescriptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prescription to delete.
 *         example: "prescription67890"
 *     responses:
 *       200:
 *         description: Prescription successfully marked as deleted.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Prescription has been deleted."
 *       404:
 *         description: Prescription not found or deletion failed.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Prescription deletion failed."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
