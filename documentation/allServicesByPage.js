/**
 * @swagger
 * /api/client/bu/services/allServicesByPage:
 *   get:
 *     summary: Get services by page
 *     description: Retrieve a paginated list of services with optional keyword search.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6735e64c5c58f271b1ce1678"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: keyWord
 *         schema:
 *           type: string
 *           example: "consultation"
 *         description: Keyword to filter services (default is an empty string).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *           example: 1
 *         description: Page number for pagination (default is 0).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 5
 *         description: Number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: Services retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Services fetched successfully."
 *               data:
 *                 totalCount: 50
 *                 services:
 *                   - serviceId: "service123"
 *                     serviceName: "General Consultation"
 *                     description: "Provides initial medical consultation for patients."
 *                     isActive: true
 *                     createdAt: "2024-12-01T10:00:00Z"
 *                   - serviceId: "service124"
 *                     serviceName: "Specialist Appointment"
 *                     description: "Booking appointments with a specialist doctor."
 *                     isActive: true
 *                     createdAt: "2024-12-01T11:00:00Z"
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: Services not found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No services found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
