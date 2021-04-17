const express = require('express');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config();

const {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues
  } = require('./googleSheetsService.js');
  
  const spreadsheetId = process.env.SHEET_ID;
  const sheetName = process.env.SHEET_NAME;
  
  async function testGetSpreadSheet() {
    try {
      const auth = await getAuthToken();
      const response = await getSpreadSheet({
        spreadsheetId,
        auth
      })
    //   console.log('output for getSpreadSheet', JSON.stringify(response.data, null, 2));
    } catch(error) {
      console.log(error.message, error.stack);
    }
  }
  
  async function testGetSpreadSheetValues() {
    try {
      const auth = await getAuthToken();
      const response = await getSpreadSheetValues({
        spreadsheetId,
        sheetName,
        auth
      })
      console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
    } catch(error) {
      console.log(error.message, error.stack);
    }
  }
  
  function main() {
    // testGetSpreadSheet();
    // testGetSpreadSheetValues();
  }
  
main()

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
  