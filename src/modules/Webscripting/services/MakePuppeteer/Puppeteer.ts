// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';

const urlBrowser = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const urlBraveLinux = '/snap/bin/brave';


async function initExecution() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  await page.screenshot({ path: 'src/archives/images/nadas.png' });


  // await browser.close();
}

initExecution();
