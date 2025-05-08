const postCreateBulkServiceFNN = async ({ clientId, buId, branchId, arrayObj, mainUser_id }) => {
    try {
      const results = [];
  
      arrayObj.forEach((element, index) => {
        const { deptName, serviceName } = element;
  
        if (!deptName || !serviceName) {
          results.push({
            message: "Missing deptName or serviceName",
            status: false,
          });
        // } else {
        //   results.push({
        //     index: index + 1,
        //     message: "Inserted",
        //     status: true,
        //   });
        }
      });
  
      return {
        status: true,
        message: "Bulk service created successfully.",
      };
    } catch (error) {
      console.log("Error", error.message)
  };
}
  
  module.exports = postCreateBulkServiceFNN;
  