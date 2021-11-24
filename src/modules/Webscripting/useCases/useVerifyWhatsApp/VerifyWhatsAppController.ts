import { VerifyWhatsAppUseCase, IVerifyWhatsAppUseCase } from './VerifyWhatsAppUseCase';
const directory = 'src/archives/xlsx/AutoSombra.xlsx';

class VerifyWhatsAppController {
  async handle() {
    const verifyWhatsAppUseCase: IVerifyWhatsAppUseCase = new VerifyWhatsAppUseCase();
    await verifyWhatsAppUseCase.execute(directory, "Contatos");

  }
}

const verifyWhatsAppController = new VerifyWhatsAppController();
(async () => await verifyWhatsAppController.handle())();
export { VerifyWhatsAppController };