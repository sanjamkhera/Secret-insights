// src/lib/celestialDataService.ts
// - Create a service to fetch and cache celestial data
// - Add functions to:
//   - Fetch data for tomorrow's date
//   - Store data in localStorage with date stamp
//   - Check if we need to fetch new data
//   - Parse stored data

// Create function to check if we need new data
// const needsFreshData = () => {
//   const storedData = localStorage.getItem('celestialData');
//   if (!storedData) return true;
  
//   const { timestamp } = JSON.parse(storedData);
//   const oneDayAgo = new Date().setHours(0, 0, 0, 0);
//   return new Date(timestamp) < oneDayAgo;
// }

// // Function to fetch and store data
// const fetchAndStoreCelestialData = async () => {
//   // Only fetch if needed
//   if (needsFreshData()) {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     // Make API call and store data
//   }
// }