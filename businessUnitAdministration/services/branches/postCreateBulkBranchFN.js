const postCreateBulkBranchFN = async ({clientId, buId, branchId, arrayObj, mainUser_id}) =>{
    try {
        const results = [];
    
        arrayObj.forEach((element, index) => {
          const { name, branchPrefix, contactNumber, emailContact } = element;
    
          if (!name || !branchPrefix || !contactNumber || !emailContact) {
            results.push({
              message: "Missing name, branchPrefix, contactNumber, emailContact ",
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
          message: "Bulk branch created successfully.",
        };
      } catch (error) {
        console.log("Error", error.message)
    };
}

module.exports = postCreateBulkBranchFN