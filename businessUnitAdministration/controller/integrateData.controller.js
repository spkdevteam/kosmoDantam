const findingsSchema = require("../../client/model/findings");
const ServiceMaster = require("../../client/model/serviceMaster");
const serviceSchema = require("../../client/model/service");
const procedureSchema = require("../../client/model/procedure");
const CheifComplaint = require("../../client/model/cheifComplaintMaster");
const complaintSchema = require("../../client/model/complaint");
const departmentSchema = require("../../client/model/department");
const { getClientDatabaseConnection } = require("../../db/connection");
const FindingMaster = require("../../client/model/findingsMster");
const CheifComplaintMaster = require("../../client/model/cheifComplaintMaster");
const departmentMaster = require("../../client/model/department.Master");
const InvestigationMaster = require("../../client/model/investigationMaster");
const ProcedureMaster = require("../../client/model/procedureMasterS");
const investigationSchema = require("../../client/model/investigationSchema");
const clinetBranchSchema = require("../../client/model/branch");
const getserialNumber = require("../../model/services/getserialNumber");
const mongoose = require("mongoose");

const integrateData = async (req, res) => {
    try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const data = req.query;
        if (!data.clientId) {
            res.write("Error: clientId is required\n");
            res.end(JSON.stringify({ success: false, error: "clientId is required" }));
            return;
        }

        res.write("Processing: Connecting to client database...\n");
        const db = await getClientDatabaseConnection(data.clientId);
        const ClientFindings = db.model("findings", findingsSchema);
        const ClientInvestigations = db.model("investigations", investigationSchema);
        const ClientServices = db.model("service", serviceSchema);
        const ClientProcedures = db.model("procedure", procedureSchema);
        const ClientCheifComplaint = db.model("cheifcomplaints", complaintSchema);
        const ClientDepartmentCollection = db.model("department", departmentSchema);
        const ClientBranchCollection = db.model('branches', clinetBranchSchema);
        const clientBranch = await ClientBranchCollection.find({ deletedAt: null });

        const syncData = async (serverModel, clientModel, fieldName) => {
            try {

                res.write(`Processing: Fetching ${fieldName} from server...\n`);
                const serverData = await serverModel.find({});
                res.write(`Processing: ${serverData.length} ${fieldName} records on server...\n`);
                const clientData = await clientModel.find({});
                res.write(`Processing: ${clientData.length} ${fieldName} records on client...\n`);

                let missingData = serverData.filter(serverItem =>
                    !clientData.some(clientItem => clientItem.old_Id?.toString() === serverItem._id.toString())
                );

                if (missingData.length > 0) {
                    if (missingData.length > 0) {
                        if (fieldName === 'department' || fieldName === 'procedure' || fieldName === 'service') {
                            res.write(`Processing: Assigning ${fieldName} to branches...\n`);
                            missingData = await Promise.all(missingData.flatMap(async (department) => {
                                return Promise.all(clientBranch.map(async (branch) => {
                                    const newId = new mongoose.Types.ObjectId();
                                    return {
                                        ...department.toObject(),
                                        old_Id: department._id,
                                        _id: newId,
                                        branchId: branch._id,
                                        displayId: await getserialNumber(
                                            fieldName, data.clientId, branch._id, branch.businessUnit
                                        )
                                    };
                                }));
                            }));
                            missingData = missingData.flat();
                        }
                        if(fieldName == 'findings')
                        {
                            console.log(missingData,'missing')
                        }

                        console.log('------------------<<<<<<<<<>>>>>>>>>>>>>>>---------------------');
                        const status = await clientModel.insertMany(missingData);
                        res.write(`Processing: ${missingData.length} ${fieldName} added to client database\n`);
                    }
                }
            } catch (error) {
                res.write("Error: " + error.message + "\n");
            }
        };

        const updateProcedureMaster = async () => {
            try {
                res.write("Processing: validation for inserted recors on progress .\n");
                const services = await ClientServices.find({}, { _id: 1, old_Id: 1 }); // Fetch new IDs and old IDs
                const procedures = await ClientProcedures.find(); // Fetch all procedures
        
                const serviceMap = new Map(services.map(service => [service.old_Id?.toString(), service._id?.toString()]));
        
                for (const procedure of procedures) {
                    const updatedServices = procedure.services
                        .map(serviceId => serviceMap.get(serviceId.toString())) // Replace old service IDs with new ones
                        .filter(Boolean); // Remove undefined/null values
        
                    if (updatedServices.length > 0) {
                        await ClientProcedures.updateOne(
                            { _id: procedure._id },
                            { $set: { services: updatedServices } }
                        );
                        console.log(`Updated procedure ${procedure._id} with new services`);
                        res.write("Updated procedure ${procedure._id} with new services .\n");
                
                    }
                }
        
                console.log("✅ All procedures updated successfully!");
            } catch (error) {
                console.error("❌ Error updating procedures:", error);
            }
        };

        const updateServicesWithNewDepartment = async () => {
            try {
                const departments = await ClientDepartmentCollection.find({}, { _id: 1, old_Id: 1 }); // Fetch new IDs and old IDs
                const services = await ClientServices.find(); // Fetch all services
        
                const departmentMap = new Map(departments.map(dept => [dept.old_Id.toString(), dept._id.toString()]));
        
                for (const service of services) {
                    const newDepartmentId = departmentMap.get(service.departmentId?.toString()); // Get the new department ID
        
                    if (newDepartmentId) {
                        await ClientServices.updateOne(
                            { _id: service._id },
                            { $set: { departmentId: newDepartmentId } }
                        );
                        console.log(`Updated service ${service._id} with new department ID: ${newDepartmentId}`);
                        res.write(`Updated service ${service._id} with new department ID: ${newDepartmentId}.\n` );
                
                    }
                }
        
                console.log("✅ All services updated successfully!");
            } catch (error) {
                console.error("❌ Error updating services:", error);
            }
        };

        
        await syncData(CheifComplaintMaster, ClientCheifComplaint, "cheifcomplaints");
        await syncData(departmentMaster, ClientDepartmentCollection, "department");
        await syncData(FindingMaster, ClientFindings, "findings");
        await syncData(InvestigationMaster, ClientInvestigations, "investigations");
        await syncData(ServiceMaster, ClientServices, "service");
        await syncData(ProcedureMaster, ClientProcedures, "procedure");
        await updateServicesWithNewDepartment()
        await updateProcedureMaster()
        res.write("Processing: Sync completed.\n");
        res.end(JSON.stringify({ success: true }));
    } catch (error) {
        res.write("Error: " + error.message + "\n");
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
};

module.exports = integrateData;
