import { Worksheet } from 'exceljs';

interface IExcel {
  read(callbackFunction: Function): Promise<void>;
  write(callbackFunction: Function): Promise<void>;
  sheet(sheetName: string): Promise<Worksheet>;
}

export { IExcel };