import { ExcelUseCase } from '../useExcel/ExcelUseCase';
import { Excel } from '../../services/MakeExcel/Excel';
const directory = 'src/archives/xlsx/AutoSombra.xlsx';

import { Worksheet } from 'exceljs';
import { IClient } from '../../dtos';
import { ZapBotController } from '../usePuppeteer/ZapBotController';

class VerifyWhatsAppUseCase {
  async parseSoldsToObject(worksheet: Worksheet): Promise<IClient[]> {
    const skipInt = 2;

    const numberRows = worksheet.getColumn('A').values.length;

    const formattedArray: IClient[] = [];

    const rows = worksheet.getRows(skipInt, 10 - skipInt);

    rows?.map(async (row, index) => {
      const item = row.model?.cells?.map((item) => item.result);
      const skipInt = 2;

      if (!item) throw new Error("There are no values in cells!");

      const newClient = {
        row: index + skipInt,
        name: item[2],
        contact: item[5]
      };
      console.log(newClient);
      formattedArray.push(newClient);
    });

    return formattedArray;

  }

  async insertValues(worksheet: Worksheet, listRows: IClient[]) {
    const zapBotController = new ZapBotController();
    // this.parseSoldsToObject(worksheet);
    // const listRows = await list;

    if (!listRows) throw new Error("There are no values in cells!");
    await zapBotController.initWhatsAppWeb();
    listRows.map(async (client) => {
      await zapBotController.execute(client)
        .then(resp => console.log(resp));
    });

    // worksheet.getCell(`H${client.row}`).value = `${text}`;

    // await zapBotController.endWhatsAppWeb();
  }
}

export { VerifyWhatsAppUseCase };