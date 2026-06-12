/**
 * Google Apps Script — receives PGP site-visit form submissions and appends
 * them to the bound Google Sheet. Optionally emails an alert.
 *
 * Setup: see docs/google-sheets-setup.md
 */

// Where to email new-lead alerts. Leave "" to disable email.
var NOTIFY_EMAIL = "info@primegoldenproperties.in";

var HEADERS = [
  "Timestamp",
  "Source",
  "Name",
  "Phone",
  "Email",
  "Location",
  "Preferred Date",
  "Message",
];

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter; // fallback for form-encoded posts
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write the header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    var row = [
      new Date(),
      data.source || "Website",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.location || "",
      data.preferred_date || "",
      data.message || "",
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New site-visit lead: " + (data.name || "Unknown") +
          " (" + (data.location || "-") + ")",
        body:
          "Name: " + (data.name || "") + "\n" +
          "Phone: " + (data.phone || "") + "\n" +
          "Email: " + (data.email || "") + "\n" +
          "Location: " + (data.location || "") + "\n" +
          "Preferred date: " + (data.preferred_date || "") + "\n" +
          "Message: " + (data.message || "") + "\n\n" +
          "Source: " + (data.source || "Website"),
      });
    }

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

// Lets you open the /exec URL in a browser to confirm it's deployed.
function doGet() {
  return json({ ok: true, message: "PGP leads endpoint is live." });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
