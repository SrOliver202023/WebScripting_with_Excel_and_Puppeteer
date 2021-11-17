import ExcelJS, { Workbook, WorksheetModel, Worksheet } from 'exceljs';
import { IExcel } from './IExcel';
import { IClient } from '../dtos/index';

class Excel implements IExcel {
  private workbook: Workbook;

  public filename: string;

  constructor(filePath: string) {
    this.workbook = new Workbook();
    this.filename = filePath;
  }

  private async sheet(sheetName: string): Promise<Worksheet> {
    const workbook = (await this.workbook.xlsx.readFile(this.filename)).getWorksheet(sheetName);
    return workbook;
  }

  async read(sheetName: string): Promise<IClient[]> {
    const worksheet = await this.sheet(sheetName);

    const skipInt = 2;

    const numberRows = worksheet.getColumn('A').values.length;
    const formattedArray: IClient[] = [];

    const rows = worksheet.getRows(skipInt, numberRows - skipInt);
    rows.map(async (row, index) => {
      const item = row.model.cells.map(item => item.result);
      const skipInt = 2;

      const newClient = {
        row: index + skipInt,
        name: item[2],
        contact: item[5]
      };

      formattedArray.push(newClient);
    });
    return formattedArray;
  }

  async write(sheetName: string, listRows: IClient[]): Promise<void> {
    const worksheet = await this.sheet(sheetName);

    listRows.map((item, index) => {
      worksheet.getCell(`H${item.row}`).value = `Hi`;
    });
    await this.workbook.xlsx.writeFile(this.filename).then(() => console.log("OKS"));
  }
}


export { Excel };