// googleSheetsService.js
const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const sheets = google.sheets('v4');
const { GoogleAuth } = require('google-auth-library');

// Source snippet from https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f
async function getAuthToken() {
    const auth = new GoogleAuth({
        scopes: SCOPES,
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      auth,
    });
    return res;
  }
  
  async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName
    });
    return res;
  }
  
  
  module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues
  }