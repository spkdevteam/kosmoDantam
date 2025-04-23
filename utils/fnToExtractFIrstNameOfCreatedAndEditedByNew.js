const fnToExtractFirstNameOfCreatedAndEditedBy = (collection) => {
    const getUniqueUsers = (users) => {
        const map = new Map();
        users
            .filter(user => user?._id && user?.firstName)
            .forEach(user => {
                if (!map.has(user._id)) {
                    map.set(user._id, {
                        _id: user._id,
                        firstName: user.firstName
                    });
                }
            });
        return Array.from(map.values());
    };

    const createdByFirstNames = getUniqueUsers(collection.map(e => e.createdBy));
    const updatedByFirstNames = getUniqueUsers(collection.map(e => e.updatedBy));

    return { createdByFirstNames, updatedByFirstNames };
};


module.exports = fnToExtractFirstNameOfCreatedAndEditedBy;







// const fnToExtractFirstNameOfCreatedAndEditedBy = (collection) => {
//     const createdByFirstNames = Array.from(new Set(
//         collection
//             .map(e => e.createdBy?.firstName)
//             .filter(Boolean) // remove undefined/null
//     ));
    
//     const updatedByFirstNames = Array.from(new Set(
//         collection
//             .map(e => e.updatedBy?.firstName)
//             .filter(Boolean)
//     ));
//     return { createdByFirstNames, updatedByFirstNames };
// }