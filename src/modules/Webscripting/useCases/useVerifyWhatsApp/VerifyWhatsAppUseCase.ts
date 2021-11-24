import { Worksheet } from 'exceljs';
import { IClient } from '../../dtos';
import { ZapBotController, IZapBotController } from '../usePuppeteer/ZapBotController';
import { Excel } from '../../services/MakeExcel/Excel';

import fs from 'fs';
import { IExcel } from '../../services/MakeExcel/IExcel';

const dirFileJson = "./src/archives/json/";

interface IProcessForEachClient {
  zapBotController: IZapBotController,
  clientListJSON: IClient[],
  worksheet: Worksheet,
  excel: IExcel;
}
interface IVerifyWhatsAppUseCase {
  execute(filePath: string, sheetName: string): Promise<void>;
}

class VerifyWhatsAppUseCase implements IVerifyWhatsAppUseCase {
  private async parseSoldsToObject(worksheet: Worksheet): Promise<IClient[]> {
    const skipInt = 2;

    const numberRows = worksheet.getColumn('A').values.length;
    const formattedArray: IClient[] = [];
    const rows = worksheet.getRows(skipInt, numberRows - skipInt);

    rows?.map(async (row, index) => {
      const item = row.model?.cells?.map((item) => item.result);
      const skipInt = 2;

      if (!item) throw new Error("There are no values in cells!");

      const newClient = {
        row: index + skipInt,
        name: item[2],
        contact: item[5]
      };
      formattedArray.push(newClient);
    });
    return formattedArray;
  }

  private async transformJsonAndSave(fileName: string, data: string): Promise<IClient[]> {
    fs.writeFileSync(dirFileJson + fileName, data, 'utf8');
    return await JSON.parse(fs.readFileSync(dirFileJson + fileName, 'utf8'));
  }

  async processForEachClient(
    { zapBotController, clientListJSON, worksheet, excel }: IProcessForEachClient): Promise<void> {
    let j = 0;
    let limit = 26;
    const clientsVerifiedWhatsApp: Object[] = [];

    for (let i = 0; i <= limit; i++ && j++) {
      let doLoop = await (async () => {
        const text = await (zapBotController).execute(clientListJSON[i]);

        console.log(clientListJSON[i]);

        clientsVerifiedWhatsApp.push({ ...clientListJSON[i], whatsapp: text });

        worksheet.getCell(`G${clientListJSON[i].row}`).value = `${text}`;
      })();

      if (j === 10 || i === limit) {
        j = 0;
        await excel.write(async () => { doLoop; }).then(() => console.log('To Save ...'));
      }
    };
    let result = await this.transformJsonAndSave('customers-checked.json', JSON.stringify(clientsVerifiedWhatsApp));
    console.log(result);
    await zapBotController.endWhatsAppWeb();
  }

  async execute(filePath: string, sheetName: string) {
    const excel = new Excel(filePath);
    const worksheet = await excel.sheet(sheetName);
    const receiveArrayFromSheet = await this.parseSoldsToObject(worksheet);

    let clientListJSON = await this.transformJsonAndSave('customers.json', JSON.stringify(receiveArrayFromSheet));
    if (!clientListJSON) throw new Error("There are no values in cells!");

    const zapBotController = new ZapBotController();
    await zapBotController.initWhatsAppWeb()
      .then(async () => {
        await this.processForEachClient({ excel, worksheet, clientListJSON, zapBotController });
      });
  }
}

export { VerifyWhatsAppUseCase, IVerifyWhatsAppUseCase };