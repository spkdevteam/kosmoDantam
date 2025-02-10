/**
 * @swagger
 * /initialise/defaultDataForBranch:
 *   get:
 *     summary: Initialise default data for a branch
 *     description: Fetches and integrates default data for a specified branch, including chief complaints and branch details.
 *     tags:
 *       - Branch Management
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client to fetch branch data for.
 *     responses:
 *       200:
 *         description: Successfully fetched default data for the branch.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cheifComplaintmaster:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a5b0e8451bda17bb4e420f"
 *                       complaintName:
 *                         type: string
 *                         example: "Implant in relation"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                 clientBranch:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a5b65e451bda17bb4e427c"
 *                       branchName:
 *                         type: string
 *                         example: "Downtown Clinic"
 *                       location:
 *                         type: string
 *                         example: "New York"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Missing or invalid clientId parameter.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "clientId is required"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 */

 
