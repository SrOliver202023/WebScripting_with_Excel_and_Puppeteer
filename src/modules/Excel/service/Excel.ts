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
    const workbook = (await this.workbook.xlsx.readFile(this.filename)).getWorksheet(sheetName)
    return workbook
  }

  async read(sheetName: string): Promise<IClient[]> {
    const worksheet = await this.sheet(sheetName);

    const skipInt = 2;

    const numberRows = worksheet.getColumn('A').values.length;
    const formattedArray:IClient[] = [];

    const rows = worksheet.getRows(skipInt, numberRows - skipInt)
    rows.map(async (row, index)=>{
      const item = row.model.cells.map(item=>item.result)
      const newClient = { 
        row: index, 
        name: item[2], 
        contact: item[5]
      }
      formattedArray.push(newClient)
    })
    return formattedArray;

  }

  async write(sheetName: string): Promise<void> {
    const worksheet = await this.sheet(sheetName);
    const skipInt = 2;

    // await this.read(sheetName)
    // .then(async(resp)=>{
    //    resp.map(async(item, index)=>{
    //     if(index<5){
    //       console.log(item.row)
    //       worksheet.getCell(`I${item.row + skipInt}`).value = "nada"
    //       await this.workbook.xlsx.writeFile(this.filename)
    //     }
    //   })
    // })
    worksheet.getCell("I2").value = "nada"
    await this.workbook.xlsx.writeFile(this.filename).then(()=> console.log("OKS"))
    // array.forEach(async (item, index)=>{
    //   if(index < 5){
    //     console.log(item.row)
    //     const range = `I${item.row + skipInt}`
    //     worksheet.getCell(range).value = "nada"
    //     await this.workbook.xlsx.writeFile(this.filename)
    //   }
    // })
    
    // worksheet.getCell("G2").value = "nada"
  }
}

export { Excel };