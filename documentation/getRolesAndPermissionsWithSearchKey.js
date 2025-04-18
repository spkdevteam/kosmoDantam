/**
 * @swagger
 * /api/client/bu/role/getRolesAndPermissionsWithSearchKey:
 *   get:
 *     summary: Get roles and permissions with search key
 *     description: Retrieves a paginated list of roles and their associated permissions based on a search key and client ID.
 *     tags:
 *       - Roles & Permissions
 *     parameters:
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
 *           example: 10
 *         description: Number of items per page (default is 10).
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *           example: "partner"
 *         description: Keyword to filter roles (e.g., role name).
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6782084da840f3a7bf1a2f72"
 *         description: Unique identifier of the client.
 *     responses:
 *       200:
 *         description: All roles and permissions retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "All roles and permissions retrieved successfully."
 *               data:
 *                 rolesAndPermissions:
 *                   - _id: "6782084da840f3a7bf1a2f74"
 *                     id: 1
 *                     name: "Partner"
 *                     capability:
 *                       - name: "Administration"
 *                         access: false
 *                         menu:
 *                           - name: "Roles & Permissions"
 *                             displayName: "All Roles & Permissions"
 *                             access: false
 *                             subMenus:
 *                               create: { id: 2, access: false, api: "/demo/path" }
 *                               view: { id: 3, access: false, api: "/demo/path" }
 *                               update: { id: 4, access: false, api: "/demo/path" }
 *                               softDelete: { id: 5, access: false, api: "/demo/path" }
 *                           - name: "Employee"
 *                             displayName: "All Employee"
 *                             access: false
 *                             subMenus:
 *                               create: { id: 9, access: false, api: "/demo/path" }
 *                               view: { id: 10, access: false, api: "/demo/path" }
 *                               update: { id: 11, access: false, api: "/demo/path" }
 *                               softDelete: { id: 12, access: false, api: "/demo/path" }
 *                       - name: "Patient"
 *                         access: false
 *                         menu:
 *                           - name: "Token"
 *                             displayName: "All Token"
 *                             access: true
 *                             subMenus:
 *                               create: { id: 86, access: false, api: "/demo/path" }
 *                               view: { id: 87, access: false, api: "/demo/path" }
 *                               update: { id: 88, access: false, api: "/demo/path" }
 *                               softDelete: { id: 89, access: false, api: "/demo/path" }
 *                 metadata:
 *                   page: 1
 *                   perPage: 1
 *                   totalCount: 1
 *                   totalPages: 1
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please check the query parameters."
 *       404:
 *         description: No roles found matching the criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No roles found for the given client or search key."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */