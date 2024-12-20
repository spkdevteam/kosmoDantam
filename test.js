const BASE_URL = "https://kosmobackendforhost.onrender.com";
const CLIENT_ID = "6735e64c5c58f271b1ce1678";

// Function to fetch active services
const fetchActiveServices = async () => {
  try {
    const response = await fetch(`https://kosmobackendforhost.onrender.com/api/client/bu/services/getAllActiveServices?clientId=6735e64c5c58f271b1ce1678`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Active Services:", data);
    // Handle the data here (update UI, store in state, etc.)
  } catch (error) {
    console.error("Failed to fetch active services:", error);
  }
};

// Call the function periodically every 5 minutes (300,000ms)
setInterval(fetchActiveServices, 150000); // Adjust interval as needed
