import { Workbook, Worksheet } from 'exceljs';
import { IExcel } from './IExcel';

class Excel implements IExcel {
  private workbook: Workbook;
  public filename: string;

  constructor(filePath: string) {
    this.workbook = new Workbook();
    this.filename = filePath;
  }

  async sheet(sheetName: string): Promise<Worksheet> {
    return (await this.workbook.xlsx.readFile(this.filename)).getWorksheet(sheetName);
  }

  async read(callbackFunction: Function): Promise<void> {
    await callbackFunction();
  }

  async write(callbackFunction: Function): Promise<void> {

    await callbackFunction();
    await this.workbook.xlsx.writeFile(this.filename).then(() => console.log("Excel finished!"));
  }
}

export { Excel };