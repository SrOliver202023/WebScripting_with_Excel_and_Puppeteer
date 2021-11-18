// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';

const urlBrowser = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function initExecution() {
  const browser = await puppeteer.launch({ headless: false, executablePath: urlBrowser });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  await page.screenshot({ path: 'nadas.png' });


  await browser.close();
}

initExecution();
// t:/EMMERSON/Node.js/WebScriptExcel/
// src/modules/Webscripting/services/Puppeteer/Puppeteer.ts