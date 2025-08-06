const { ConvexHttpClient } = require("convex/browser");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Convex client
const convexUrl = process.env.REACT_APP_CONVEX_URL || "https://relaxed-otter-24.convex.cloud";
if (!convexUrl) {
  console.error("Error: REACT_APP_CONVEX_URL is not defined in .env file");
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

// Function to convert data to CSV
function convertToCSV(data) {
  if (data.length === 0) {
    return "";
  }
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(",");
  
  // Create CSV data rows
  const rows = data.map(obj => {
    return headers.map(header => {
      // Handle different data types
      let value = obj[header];
      
      // Format timestamp as m/d/yyyy and hour:minutes
      if (header === 'timestamp') {
        const date = new Date(value);
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Format as m/d/yyyy h:mm (AM/PM)
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        const formattedMinutes = minutes.toString().padStart(2, '0');
        
        value = `${month}/${day}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
      }
      
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'string') {
        // Escape quotes and wrap in quotes
        return `"${value.replace(/"/g, '""')}"`;
      } else if (typeof value === 'object') {
        // Convert objects/arrays to JSON strings
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      return value;
    }).join(",");
  }).join("\n");
  
  return `${headerRow}\n${rows}`;
}

// Function to save CSV to file
function saveToCSV(data, filename) {
  const csvData = convertToCSV(data);
  const filePath = path.join(__dirname, "convex_data_csv", filename);
  
  // Create directory if it doesn't exist
  const dirPath = path.join(__dirname, "convex_data_csv");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  fs.writeFileSync(filePath, csvData);
  console.log(`Data saved to ${filePath}`);
}

// Function to export users data
async function exportUsers() {
  try {
    console.log("Fetching users data...");
    const users = await client.query("users:getAllUsers");
    
    if (users && users.length > 0) {
      console.log(`Found ${users.length} users`);
      saveToCSV(users, "users.csv");
    } else {
      console.log("No users data found");
    }
  } catch (error) {
    console.error("Error exporting users:", error);
  }
}

// Function to fetch and export conversations table
async function exportConversations() {
  try {
    console.log("Fetching conversations data...");
    const conversations = await client.query("conversations:getAllConversations");
    
    if (!conversations || conversations.length === 0) {
      console.log("No conversations found");
      return;
    }
    
    console.log(`Found ${conversations.length} conversations`);
    saveToCSV(conversations, "conversations.csv");
  } catch (error) {
    console.error("Error exporting conversations:", error);
  }
}

// Main function to run the export
async function main() {
  console.log("Starting Convex data export to CSV...");
  
  await exportUsers();
  await exportConversations();
  
  console.log("Export completed!");
}

// Run the main function
main().catch(error => {
  console.error("Export failed:", error);
  process.exit(1);
});
