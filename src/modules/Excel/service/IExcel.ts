import ExcelJS, { Workbook, Worksheet } from 'exceljs';
import { IClient } from '../dtos/index'

interface IExcel {
  read(sheetname: string): Promise<IClient[]>;
  write(sheetname: string): Promise<void>;
}

export { IExcel };