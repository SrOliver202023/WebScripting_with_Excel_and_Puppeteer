import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
const urlWindowsPC1 = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const urlWindowsPC2 = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";

import { IClient, ICheckContactFound } from '../../dtos';

const urlBrowser = urlWindowsPC1;

interface IZapBotUseCase {
  acessWhatssapWeb: void;
}

class ZapBotUSeCase {
  public browser: Promise<Browser>;
  public page: Promise<Page>;

  constructor() {
    this.browser = puppeteer.launch({ defaultViewport: { width: 900, height: 800 }, headless: false, userDataDir: "./src/user_data", executablePath: urlBrowser });

    this.page = this.browser.then(item => item.newPage());
  }
  async accessWhatssapWeb(url: string): Promise<void> {
    await (await this.page).goto(url);
  }
  async showContacts(page: Page): Promise<void> {
    await page.waitForSelector("#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg");
    await page.click("#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg");
  }

  async findContact(page: Page, contact: string): Promise<void> {
    const innerText = await page.$eval("._13NKt.copyable-text.selectable-text", (el) => el.textContent);
    if (String(innerText) !== '') {
      try {
        await page.click("#app > div._1ADa8._3Nsgw.app-wrapper-web.os-win > div._1XkO3.two > div._3ArsE > div.ldL67._2i3T7 > span > div._1N4rE > span > div.nBIOd.tm2tP.copyable-area > div:nth-child(2) > div > span > button");
      } catch (error) {
        await page.click('#side > div.uwk68 > div > span > button');
      }
    }
    await page.waitForSelector("._13NKt.copyable-text.selectable-text");
    await page.type("._13NKt.copyable-text.selectable-text", contact);
  }

  async openChat(page: Page, contactName: string): Promise<void> {
    await page.waitForSelector(`._3q9s6 span[title='${contactName}']`);
    await page.click(`._3q9s6 span[title='${contactName}']`);
  }

  async sendMessage(page: Page, message: string): Promise<void> {
    await page.waitForSelector("._1UWac._1LbR4");
    await page.type("._1UWac._1LbR4", `      ${message}`);

    await page.waitForSelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button > span > svg");
    await page.click("#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button > span > svg");
  }

  async checkFoundContact(page: Page, contact: string, name: string): Promise<ICheckContactFound> {
    await page.waitForTimeout(100);
    const contactFound: ICheckContactFound = await page.$eval(".cm280p3y.p357zi0d.tvf2evcx.f8m0rgwh.gndfcl4n.fhf7t426.bvcnfjzh.cihm0v32.td5bf8pq.ctv2fiom.l3k7h4x6.hp667wtd.qfejxiq4.oq44ahr5.lb5m6g5c", (el) => el.textContent)
      .then(resp => { return { haveWhatsApp: false, message: 'Contact nonexistent!' }; })
      .catch(async (err) => {
        return { haveWhatsApp: true, message: 'Contact exists!' };
      });
    return contactFound;
  }

  async endWhatsAppWeb(browser: Browser) {
    await browser.close();
  }

}

export { ZapBotUSeCase, IZapBotUseCase };