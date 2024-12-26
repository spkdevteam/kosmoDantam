function searchValueIncludes(obj, targetValue) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Recursively search in nested objects
        if (searchValueIncludes(obj[key], targetValue)) {
          return true;
        }
      } else if (typeof obj[key] === "string" && obj[key].includes(targetValue)) {
        return true;
      }
    }
    return false;
  }

  module.exports = searchValueIncludes