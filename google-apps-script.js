/**
 * Google Apps Script to sync lead details from Reachmore AI website to Google Sheets.
 * 
 * Instructions:
 * 1. Open your Google Spreadsheet: https://docs.google.com/spreadsheets/d/1V5FqkoNP8bLd8zVeMNU39ufXZQpvhHfb89rXgxWAYIo/edit
 * 2. Click "Extensions" -> "Apps Script" in the top menu.
 * 3. Delete any default code inside the editor and paste this entire script.
 * 4. Click the "Save" (floppy disk) icon.
 * 5. Click "Deploy" -> "New deployment" in the top right.
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set the fields:
 *    - Description: Reachmore Lead Webhook
 *    - Execute as: Me (your email)
 *    - Who has access: Anyone
 * 8. Click "Deploy", authorize any Google permissions requested.
 * 9. Copy the generated "Web app URL" (it will end in "/exec").
 * 10. Paste this URL in your website's `.env.local` file as:
 *     GOOGLE_SHEET_WEBHOOK_URL=your_copied_web_app_url
 */

function doPost(e) {
  try {
    // Parse the incoming POST body
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists with custom Reachmore AI branding if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Name", "Phone", "Company", "Requirement", "Session ID", "Lead Source"];
      sheet.appendRow(headers);
      
      // Style the header row (Bold, white text, Reachmore Orange #FE5D26 background)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FE5D26");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      
      // Set column widths to be nicely readable
      sheet.setColumnWidth(1, 200); // Timestamp
      sheet.setColumnWidth(2, 180); // Name
      sheet.setColumnWidth(3, 150); // Phone
      sheet.setColumnWidth(4, 180); // Company
      sheet.setColumnWidth(5, 300); // Requirement
      sheet.setColumnWidth(6, 200); // Session ID
      sheet.setColumnWidth(7, 120); // Lead Source
    }
    
    // Extract variables with defaults
    var timestamp = data.timestamp || new Date().toISOString();
    var name = data.name || "";
    var phone = data.phone || "";
    var company = data.company || "";
    var requirement = data.requirement || "";
    var sessionId = data.sessionId || "";
    var leadSource = data.leadSource || "Chatbot Form";
    
    // Append the lead row to the sheet
    sheet.appendRow([timestamp, name, phone, company, requirement, sessionId, leadSource]);
    
    // Auto-adjust rows/grid lines formatting
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, 7);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontFamily("Arial");
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: "Lead synchronized successfully",
      row: lastRow 
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "online", 
    message: "Reachmore AI lead receiver node is active!" 
  }))
  .setMimeType(ContentService.MimeType.JSON);
}
