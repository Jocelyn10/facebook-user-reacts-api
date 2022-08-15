const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');

const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = require('./config');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get('/', async ({ query }, res) => {
  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--disable-features=AudioServiceOutOfProcess',
      '--no-sandbox',
      '--use-gl=egl',
      '--disable-setuid-sandbox',
    ],
  });
  let response = [];

  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/', { timeout: 0 });
  console.log('🤖🤖🤖🤖🤖 WAITING FOR LOGIN INPUTS 🤖🤖🤖🤖🤖🤖');
  await page.waitForSelector('input[name="email"]');

  await page.type('input[name="email"]', FACEBOOK_EMAIL);
  await delay(2000);
  await page.type('input[name="pass"]', FACEBOOK_PASSWORD);
  await delay(3000);
  await page.keyboard.press('Enter');

  console.log('🤖🤖🤖🤖🤖 LOGING 🤖🤖🤖🤖🤖🤖');

  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  console.log('🤖🤖🤖🤖🤖 GOING TO THE POST 🤖🤖🤖🤖🤖🤖');

  await page.goto(query.url, { waitUntil: 'networkidle2', timeout: 0 });

  console.log('🤖🤖🤖🤖🤖 CLICK ON LIKE BTN 🤖🤖🤖🤖🤖🤖');

  await page.waitForSelector('img[role="presentation"]');
  await page.click('img[role="presentation"]');

  page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.waitForSelector('div[aria-label="Fermer"]');

  await delay(7000);

  console.log('🤖🤖🤖🤖🤖 GETING DATA FROM MODAL 🤖🤖🤖🤖🤖');

  const links = await page.$$eval('div[role="dialog"]', (divs) =>
    divs.map((div) => {
      return {
        html: div.innerHTML,
      };
    })
  );

  const modal = links[0];

  var patt = /<a[^>]*label=["']([^"']*)["']/g;

  console.log('🤖🤖🤖🤖🤖 PERSONS WHO LIKE THE POST 🤖🤖🤖🤖🤖🤖');
  console.log('                                             ');
  console.log('                                             ');
  console.log('                ---🤖---                     ');

  while ((match = patt.exec(modal.html))) {
    response.push(match[0].replace('<a aria-label=', ''));
  }

  console.log('                ---🤖---                     ');

  await browser.close();

  return res.status(200).send(response);
});

// This endpoint is used to test if backend work safely
app.get('/test', (req, res) => {
  res.status(200).send('Success !');
});

module.exports = app;
