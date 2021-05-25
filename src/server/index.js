const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

require('dotenv').config();

const {
  getAuthToken,
  getSpreadSheetValues,
  updateSpreadSheetValues
} = require('./googleSheetsService.js');

async function getGeocode(city, country) {
  const key = process.env.GEO_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${key}`;
  const result = await fetch(url)
    .then(res => res.json())
    .then(data => data);
  return result;
}

const spreadsheetId = process.env.SHEET_ID;
const sheetName = process.env.SHEET_NAME;
const numSubmissionsPerTag = {};
let sheetData = [];
let finishedFetch = false;

function cleanString(input) {
  let output = '';
  [...input].forEach((val, i) => {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  });
  return output;
}

async function getSpreadSheetValuesResponse() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    });
    //   console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
    const headers = ['timestamp', 'title', 'name', 'email', 'affiliation', 'keywords', 'description', 'image', 'country', 'city', 'url', 'permission', 'coordinates'];
    const { values } = response.data;
    // remove question headers
    sheetData = Promise.all(values.slice(1).map(async (arr, idx) => {
      const obj = {};
      let iso = '';
      let city = '';
      let country = '';
      headers.forEach(async (val, key) => {
        if (headers[key] === 'coordinates') {
          // check if lon, lat already exist
          if (arr[key]) {
            const coords = {
              lat: arr[key],
              lng: arr[parseInt(key, 10) + 1]
            };
            obj[headers[key]] = coords;
          } else {
            // fetch from Google geocode API and write back to form responses spreadsheets
            const geo = await getGeocode(city, country);
            let lat = 'none';
            let long = 'none';
            if (geo.results.length) {
              [lat, long] = geo.results[0].geometry.location;
              obj[headers[key]] = [lat, long];
            }
            const coordinates = [
              [lat, long]
            ];
            const range = `'${sheetName}'!M${idx + 2}:N${idx + 2}`;
            const body = {
              coordinates
            };
            updateSpreadSheetValues({
              spreadsheetId, auth, range, body
            });
            obj[headers[key]] = 'null';
          }
        } else if (headers[key] === 'keywords') {
          if (arr[key]) {
            const listTags = arr[key].split(', ');
            listTags.forEach((tag) => { numSubmissionsPerTag[tag] = numSubmissionsPerTag[tag] + 1 || 1; });
            obj[headers[key]] = listTags;
          }
        } else if (headers[key] === 'image') {
          if (arr[key]) {
            const id = arr[key].split('id=')[1];
            const downloadString = `http://drive.google.com/u/0/uc?id=${id}&export=download`;
            obj[headers[key]] = downloadString;
          } else obj[headers[key]] = '';
        } else if (headers[key] === 'country') {
          const countrySplit = arr[key].replace(/\(/g, '').replace(/\)/g, '').split(/\s/g); // remove all parentheses
          iso = countrySplit[countrySplit.length - 1]; // gets iso value from country
          countrySplit.pop();
          country = cleanString(countrySplit.join('+'));
          const countryValue = countrySplit.join(' ');
          obj[headers[key]] = countryValue;
        } else if (headers[key] === 'city') {
          city = cleanString(arr[key].replace(/\s/g, '+'));
        } else if (headers[key] === 'email') obj[headers[key]] = 'redacted';
        else {
          obj[headers[key]] = arr[key];
        }
      });
      obj.iso = iso;
      finishedFetch = true;
      return obj;
    }));
  } catch (error) {
    console.log(error.message, error.stack);
  }
}

function main() {
  // testGetSpreadSheet();
  getSpreadSheetValuesResponse();
}

main();

const app = express();

app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/api/responses', async (req, res) => {
  if (finishedFetch) {
    sheetData.then((data) => {
      if (data.length !== 0) {
        res.send({ responses: data });
      }
    });
  } else {
    res.send({ responses: [] });
  }
});

app.get('/api/keywords', async (req, res) => {
  if (finishedFetch) {
    res.send({ keywords: numSubmissionsPerTag });
  } else {
    res.send({ keywords: {} });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
