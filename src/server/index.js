const express = require('express');
const os = require('os');
const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch');

require('dotenv').config();

const {
    getAuthToken,
    getSpreadSheetValues,
    updateSpreadSheetValues
} = require('./googleSheetsService.js');

async function getGeocode(city, country) {
  const key = process.env.GEO_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${key}`
  const result = await fetch(url)
    .then(res => res.json())
    .then(data => data)
  return result;
}
  
const spreadsheetId = process.env.SHEET_ID;
const sheetName = process.env.SHEET_NAME;
let sheetData = [];

function cleanString(input) {
  var output = "";
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
          output += input.charAt(i);
      }
  }
  return output;
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
      // remove question headers
      sheetData = Promise.all(values.slice(1).map(async (arr, idx) => {
            const obj = {};
            let iso = ''
            let city = '';
            let country = '';
            for (const key in headers) {
              if (headers[key] === "coordinates") {
                // check if lon, lat already exist
                if(arr[key]) {
                  const coords = {
                    lat: arr[key],
                    lng: arr[parseInt(key)+1]
                  }
                  obj[headers[key]] = coords
                } else {
                  // fetch from Google geocode API and write back to form responses spreadsheets
                  const geo = await getGeocode(city, country);
                  const lat = geo.results[0].geometry.location.lat;
                  const long = geo.results[0].geometry.location.lng;;
                  const values = [
                    [lat, long]
                  ]
                  const range = `'${sheetName}'!M${idx + 2}:N${idx + 2}`;
                  const body = {
                    values: values
                  }
                  updateSpreadSheetValues({spreadsheetId, auth, range, body})
                  obj[headers[key]] = geo.results[0].geometry.location;

                }
              } else if(headers[key] === "image") {
                if(arr[key]) {
                  const id = arr[key].split("id=")[1];
                  const downloadString = `http://drive.google.com/u/0/uc?id=${id}&export=download`
                  obj[headers[key]] = downloadString;
                } else obj[headers[key]] = '';
              }
              else {
                let val = arr[key];
                if (headers[key] === 'country') {
                    const countrySplit = arr[key].replace(/\(/g, "").replace(/\)/g, "").split(/\s/g); // remove all parentheses
                    iso = countrySplit[countrySplit.length - 1]; // gets iso value from country
                    countrySplit.pop()
                    country = cleanString(countrySplit.join("+"))
                    val = countrySplit.join(" ");
                } else if (headers[key] === 'city') {
                  city = cleanString(arr[key].replace(/\s/g, "+"));
                }
                obj[headers[key]] = val;
              }
            }
            obj["iso"] = iso;
            return obj
        }))
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
  sheetData.then(data => {
    while (data.length === 0) {}
    console.log('data', data)
    res.send({ responses: data })
  })
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
