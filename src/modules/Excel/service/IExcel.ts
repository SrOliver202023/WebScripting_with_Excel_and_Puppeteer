import ExcelJS, { Workbook, Worksheet } from 'exceljs';

interface IExcel {
  read(sheetname: string): Promise<void>;
  write(sheetname: string): Promise<void>;
}

export { IExcel };