import { Excel } from '../../services/MakeExcel/Excel';
import { ExcelUseCase } from '../useExcel/ExcelUseCase';
import { VerifyWhatsAppUseCase } from './VerifyWhatsAppUseCase';

const directory = 'src/archives/xlsx/AutoSombra.xlsx';

class VerifyWhatsAppController {
  async execute() {

    const verifyWhatsAppUseCase = new VerifyWhatsAppUseCase();
    const excel = new Excel(directory);

    const worksheet = await excel.sheet("Contatos");
    const iArray = await verifyWhatsAppUseCase.parseSoldsToObject(worksheet);
    const callbackFunction = await verifyWhatsAppUseCase.insertValues(worksheet, iArray);

    await excel.write(async () => { callbackFunction; });
  }
}

const verifyWhatsAppController = new VerifyWhatsAppController();

async function run() {
  await verifyWhatsAppController.execute();
}

run();
export { VerifyWhatsAppController };