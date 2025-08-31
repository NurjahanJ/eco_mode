const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

// Path to the conversations CSV file
const inputFile = path.join(__dirname, 'convex_data_csv', 'conversations.csv');
const outputFile = path.join(__dirname, 'convex_data_csv', 'conversations_filtered.csv');

// Define the cutoff date (8/30/2025)
const cutoffDate = new Date('2025-08-30T00:00:00');

// Array to store filtered conversations
const filteredConversations = [];

// Read the CSV file
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // Parse the date from the _creationTime field
    const dateStr = row._creationTime;
    const dateParts = dateStr.match(/(\d+)\/(\d+)\/(\d+),\s+(\d+):(\d+)\s+(AM|PM)/);
    
    if (dateParts) {
      const month = parseInt(dateParts[1]);
      const day = parseInt(dateParts[2]);
      const year = parseInt(dateParts[3]);
      let hours = parseInt(dateParts[4]);
      const minutes = parseInt(dateParts[5]);
      const ampm = dateParts[6];
      
      // Convert to 24-hour format
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      const rowDate = new Date(year, month - 1, day, hours, minutes);
      
      // Keep only rows with dates on or after the cutoff date
      if (rowDate >= cutoffDate) {
        filteredConversations.push(row);
      }
    }
  })
  .on('end', () => {
    // Write the filtered data to a new CSV file
    const csvWriter = createObjectCsvWriter({
      path: outputFile,
      header: Object.keys(filteredConversations[0] || {}).map(id => ({ id, title: id }))
    });
    
    csvWriter.writeRecords(filteredConversations)
      .then(() => {
        console.log(`Filtered data saved to ${outputFile}`);
        
        // Replace the original file with the filtered file
        fs.unlinkSync(inputFile);
        fs.renameSync(outputFile, inputFile);
        console.log(`Original file replaced with filtered data`);
      });
  });
