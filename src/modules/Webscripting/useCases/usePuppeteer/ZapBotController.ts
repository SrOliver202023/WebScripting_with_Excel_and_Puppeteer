import { Browser, HTTPResponse, Page } from 'puppeteer';
import { ZapBotUSeCase, IZapBotUseCase } from './ZapBotUseCase';
import { IClient, ICheckContactFound } from '../../dtos';

const client = {
  row: 1,
  name: "Cleiton SAV",
  contact: "+55 73 9927-8378"
};

class ZapBotController {
  private zapBotUseCase;

  constructor() {
    this.zapBotUseCase = new ZapBotUSeCase();
  }
  async initWhatsAppWeb() {
    await this.zapBotUseCase.accessWhatssapWeb('https://web.whatsapp.com/');
    await this.zapBotUseCase.showContacts(await this.zapBotUseCase.page);
  }

  async execute({ row, name, contact }: IClient): Promise<Boolean> {
    await this.zapBotUseCase.findContact(await this.zapBotUseCase.page, contact);

    const resultFound: ICheckContactFound = await this.zapBotUseCase.checkFoundContact(await this.zapBotUseCase.page, contact, name);
    console.log(resultFound);
    return resultFound.haveWhatsApp === true ? true : false;
  }

  async endWhatsAppWeb() {
    await this.zapBotUseCase.endWhatsAppWeb(await this.zapBotUseCase.browser);
  }
}

// async function run() {
//   const zapBotController = new ZapBotController();
//   await zapBotController.initWhatsAppWeb();
//   await zapBotController.execute(client);
//   await zapBotController.execute(client);
//   await zapBotController.execute(client);
//   await zapBotController.execute(client);
//   await zapBotController.execute(client);
// }
// run();

export { ZapBotController };