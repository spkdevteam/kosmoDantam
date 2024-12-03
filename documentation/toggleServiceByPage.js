/**
 * @swagger
 * /api/client/bu/services/toggleServiceByPage:
 *   put:
 *     summary: Toggle Status of a Service
 *     description: Toggles the status (active/inactive) of a service identified by `serviceId` and `clientId`. Includes pagination and keyword filters for related services.
 *     tags:
 *       - Services
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
 *               serviceId:
 *                 type: string
 *                 description: Unique identifier of the service to toggle status.
 *                 example: "6746b2deb193ebcde5080439"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter related services.
 *                 example: "consultation"
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
 *         description: Service status toggled successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Service status toggled successfully."
 *               data:
 *                 serviceId: "service123"
 *                 serviceName: "General Consultation"
 *                 isActive: false
 *                 relatedServices:
 *                   totalCount: 20
 *                   services:
 *                     - serviceId: "service124"
 *                       serviceName: "Dental Cleaning"
 *                       isActive: true
 *                     - serviceId: "service125"
 *                       serviceName: "Eye Examination"
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
 *         description: Service not found for the provided `serviceId`.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "Service not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
