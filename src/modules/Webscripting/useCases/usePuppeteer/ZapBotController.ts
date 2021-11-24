import { ZapBotUSeCase } from './ZapBotUseCase';
import { IClient, ICheckContactFound } from '../../dtos';

const client = {
  row: 1,
  name: "Client",
  contact: "+55 73 9999-9999"
};

interface IZapBotController {
  initWhatsAppWeb(): Promise<void>;
  execute({ row, name, contact }: IClient): Promise<String>;
  endWhatsAppWeb(): Promise<void>;
}

class ZapBotController implements IZapBotController {
  private zapBotUseCase;

  constructor() {
    this.zapBotUseCase = new ZapBotUSeCase();
  }

  async initWhatsAppWeb() {
    await this.zapBotUseCase.accessWhatssapWeb('https://web.whatsapp.com/');
  }

  async execute({ row, name, contact }: IClient): Promise<String> {
    await this.zapBotUseCase.showContacts(await this.zapBotUseCase.page);
    await this.zapBotUseCase.findContact(await this.zapBotUseCase.page, contact);
    const resultFound: ICheckContactFound = await this.zapBotUseCase.checkFoundContact(await this.zapBotUseCase.page, contact, name);
    console.log(resultFound);
    return resultFound.haveWhatsApp === true ? "Yes" : "No";
  }

  async endWhatsAppWeb() {
    await this.zapBotUseCase.endWhatsAppWeb(await this.zapBotUseCase.browser);
  }
}

export { ZapBotController, IZapBotController };