/**
 * @swagger
 * /api/client/bu/services/deleteService:
 *   delete:
 *     summary: Delete a service
 *     description: Marks a service as deleted for a specified client and service ID.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service to delete.
 *         example: "6746b373b193ebcde5080449"
 *     responses:
 *       200:
 *         description: Service deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Service deleted successfully."
 *       404:
 *         description: Service not found or already deleted.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Service not found or already deleted."
 *       400:
 *         description: Bad request due to missing inputs or validation errors.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Client ID and Service ID are required."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "An unexpected error occurred."
 */
