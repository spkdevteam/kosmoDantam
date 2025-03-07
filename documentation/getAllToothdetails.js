/**
 * @swagger
 * /api/superAdmin/tooth/getallTooths:
 *   get:
 *     summary: Get all teeth
 *     description: Fetches a list of all teeth records from the database.
 *     tags:
 *       - Teeth
 *     responses:
 *       200:
 *         description: List of teeth fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Teeth records fetched successfully."
 *               data:
 *                 - toothNumber: 1
 *                   toothName: "Central Incisor"
 *                   toothType: "Incisor"
 *                   quadrant: "Upper Right"
 *                   eruptionAge: "7-8 years"
 *                   permanent: true
 *                 - toothNumber: 2
 *                   toothName: "Lateral Incisor"
 *                   toothType: "Incisor"
 *                   quadrant: "Upper Right"
 *                   eruptionAge: "8-9 years"
 *                   permanent: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
