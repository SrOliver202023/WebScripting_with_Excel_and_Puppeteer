import { Browser, HTTPResponse, Page } from 'puppeteer';
import { ZapBotUSeCase, IZapBotUseCase } from './ZapBotUseCase';

const client = {
  row: 1,
  name: "Wagner",
  contact: "+55 73 9999-9999"
};


class ZapBotController {
  private zapBotUseCase;

  constructor() {
    this.zapBotUseCase = new ZapBotUSeCase();
  }
  async execute() {
    await this.zapBotUseCase.accessWhatssapWeb('https://web.whatsapp.com/');
    await this.zapBotUseCase.showContacts();
    await this.zapBotUseCase.findContact(client.contact);
    // await this.zapBotUseCase.checkFoundContact(client.contact);
    await this.zapBotUseCase.openChat(client.name);
    await this.zapBotUseCase.sendMessage('Hello Man!');
  }

}

const zapBotController = new ZapBotController();

zapBotController.execute();

export { ZapBotController };