const express = require('express');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config();

const {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues,
    updateSpreadSheetValues
  } = require('./googleSheetsService.js');
  
  const spreadsheetId = process.env.SHEET_ID;
  const sheetName = process.env.SHEET_NAME;
  let sheetData = [];
  
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
  
  async function getSpreadSheetValuesResponse() {
    try {
      const auth = await getAuthToken();
      const response = await getSpreadSheetValues({
        spreadsheetId,
        sheetName,
        auth
      })
    //   console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
      const headers = ['timestamp', 'title', 'name', 'email', 'affiliation', 'keywords', 'description', 'image', 'country', 'city', 'url', 'permission', 'coordinates']
      const values = response.data.values;
      console.log("data", response.data.range)
      // remove question headers
      sheetData = values.slice(1).map((arr, idx) => {
            const obj = {};
            let iso = ''
            for (const key in headers) {
              if (headers[key] === "coordinates") {
                const lat = 547;
                const long = 678;
                const values = [
                  [lat, long]
                ]
                const range = `'${sheetName}'!M${idx + 2}:N${idx + 2}`;
                const body = {
                  values: values
                }
                // check if lon, lat already exist
                if(!arr[key]) {
                  updateSpreadSheetValues({spreadsheetId, auth, range, body})
                }
                obj[headers[key]] = [lat, long];
              } else {
                let val = arr[key];
                if (headers[key] === 'country') {
                    const countrySplit = arr[key].replace(/\(/g, "").replace(/\)/g, "").split(" "); // remove all parentheses
                    iso = countrySplit[countrySplit.length - 1]; // gets iso value from country
                    countrySplit.pop()
                    val = countrySplit.join(" ");
                }
                obj[headers[key]] = val;
              }
            }
            obj["iso"] = iso;
            return obj
        })
        // console.log(sheetData)
    } catch(error) {
      console.log(error.message, error.stack);
    }
  }
  
  function main() {
    // testGetSpreadSheet();
    getSpreadSheetValuesResponse();
  }
  
main()

const app = express();

app.use(express.static('dist'));
app.get('/api/responses', async (req, res) => {
    while (sheetData.length === 0) {}
    console.log(sheetData)
    res.send({ responses: sheetData })
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
