import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
const urlWindows = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const urlLinux = '/snap/bin/brave';

interface IZapBotUseCase {
  acessWhatssapWeb: void;
}

class ZapBotUSeCase {
  public browser: Promise<Browser>;
  public page: Promise<Page>;

  constructor() {
    this.browser = puppeteer.launch({ headless: false, userDataDir: "./src/user_data" });
    this.page = this.browser.then(item => item.newPage());
  }
  async accessWhatssapWeb(url: string): Promise<void> {
    await (await this.page).goto(url);
  }
  async showContacts(): Promise<void> {
    await (await this.page).waitForSelector("#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg");
    await (await this.page).click("#side > header > div._3yZPA > div > span > div:nth-child(2) > div > span > svg");
  }

  async findContact(contact: string): Promise<void> {
    await (await this.page).waitForSelector("._13NKt.copyable-text.selectable-text");
    await (await this.page).type("._13NKt.copyable-text.selectable-text", contact);
  }

  async openChat(contactName: string): Promise<void> {
    await (await this.page).waitForSelector(`._3q9s6 span[title='${contactName}']`);
    await (await this.page).click(`._3q9s6 span[title='${contactName}']`);
  }

  async sendMessage(message: string): Promise<void> {
    await (await this.page).waitForSelector("._1UWac._1LbR4");
    await (await this.page).type("._1UWac._1LbR4", `      ${message}`);

    await (await this.page).waitForSelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button > span > svg");
    await (await this.page).click("#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div._3HQNh._1Ae7k > button > span > svg");
  }

  async checkFoundContact(contactName: string): Promise<void> {
    const contactFound = (await this.page).$eval("._3q9s6", (el) => el.textContent);
    if (await contactFound !== contactName) {
      throw new Error(`Nenhum resultado encontrado para “${contactName}”`);
    }
  }

}

export { ZapBotUSeCase, IZapBotUseCase };