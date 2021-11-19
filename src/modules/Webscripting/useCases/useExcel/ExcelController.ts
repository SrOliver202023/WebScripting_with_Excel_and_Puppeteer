import { ExcelUseCase } from './ExcelUseCase';
import { Excel } from '../../services/MakeExcel/Excel';

const directory = 'src/archives/xlsx/AutoSombra.xlsx';

class ExcelController {

  async execute() {

    const excelUseCase = new ExcelUseCase();
    const excel = new Excel(directory);

    const worksheet = await excel.sheet("Contatos");
    const callbackFunction = await excelUseCase.insertValues(worksheet);

    await excel.write(() => { callbackFunction; });

  }
}

const excelController = new ExcelController;

excelController.execute();