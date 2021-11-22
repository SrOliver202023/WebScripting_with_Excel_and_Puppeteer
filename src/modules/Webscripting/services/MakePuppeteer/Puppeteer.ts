// const puppeteer = require('puppeteer');
import { Page } from 'puppeteer';
import puppeteer from 'puppeteer';
const urlBrowser = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const urlBraveLinux = '/snap/bin/brave';
const userData = '../../../../../user_data';

const iconContacts = "#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg";
const searchBox = "._13NKt.copyable-text.selectable-text";
const resultFindContact = ".f8jlpxt4.r5qsrrlp.hp667wtd";
const messageBox = "._1UWac._1LbR4";

// Cleiton SAV, +55 73 9927-8378
const client = {
  row: 1,
  name: "Fulano",
  contact: "+55 73 9999-999"
};
async function initExecution() {
  const browser = await puppeteer.launch({ executablePath: urlBrowser, headless: false, userDataDir: userData });
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com/');

  await showContacts(page);
  await findContact(page);
  await contactFind(page);
  await getContactName(page);
  await message(page, `Hi 2`);

  // await page.screenshot({ path: 'src/archives/images/nadas.png' });
  // await browser.close();
};

initExecution();

async function showContacts(page: Page) {
  // Click to show contacts
  await page.waitForSelector("#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg");
  await page.click("#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg");

}
async function findContact(page: Page) {
  // FindBox -> FindContact (insert number)
  await page.waitForSelector("._13NKt.copyable-text.selectable-text");
  await page.type("._13NKt.copyable-text.selectable-text", client.contact);
}
async function message(page: Page, message: string) {
  // Write message
  await page.waitForSelector("._1UWac._1LbR4");
  await page.type("._1UWac._1LbR4", `      ${message}`);

  // Send message
  await page.waitForSelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button > span > svg");
  await page.click("#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button > span > svg");
}

async function contactFind(page: Page) {
  // Contact Found
  await page.waitForSelector("._3q9s6");
  await page.click("._3q9s6");
}

async function getContactName(page: Page) {
  // Get InnerTextFromContactFound 
  const contactFound = await page.$eval("._3q9s6", (el) => el.textContent);
  if (contactFound !== client.name) {
    throw new Error(`Nenhum resultado encontrado para “${client.contact}”`);
  }
}