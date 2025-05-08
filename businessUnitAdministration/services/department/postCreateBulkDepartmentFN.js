
const postCreateBulkDepartmentFN = async ({clientId, buId, branchId, arrayObj, mainUser_id}) =>{
    try {
        const results = [];
    
        arrayObj.forEach((element, index) => {
          const { deptName, name, description } = element;
    
          if (!deptName || !name || !description) {
            results.push({
              message: "Missing Department",
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
          message: "Bulk department created successfully.",
        };
      } catch (error) {
        console.log("Error", error.message)
    };
}

module.exports = postCreateBulkDepartmentFN