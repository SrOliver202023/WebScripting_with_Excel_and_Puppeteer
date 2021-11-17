import ExcelJS, { Workbook, Worksheet } from 'exceljs';
import { IExcel } from './IExcel';

class Excel implements IExcel {
  private workbook: Workbook;

  public filename: string;

  constructor(filePath: string) {
    this.workbook = new Workbook();
    this.filename = filePath;
  }

  private async sheet(sheetName: string): Promise<Worksheet> {
    const workbook = await this.workbook.xlsx.readFile(this.filename);
    const worksheet = workbook.getWorksheet(sheetName);
    return worksheet;
  }

  async read(sheetName: string): Promise<void> {
    const worksheet = await this.sheet(sheetName);
    const rows = worksheet.getColumn('A').values.length - 1;
    const intSolt = 2;

    const unformattedArray = [];
    const formattedArray = [];

    const ivalue = worksheet.getRows(0, 3);

    const iValue2 = ivalue.map(item => item.values);

  }

  async write(sheetName: string): Promise<void> {


    throw new Error('Method not implemented.');
  }

}

export { Excel };