import { Excel } from '../../service/Excel';
const directory = __dirname + "/../../../../archives/";

const excel = new Excel(directory + "AutoSombra.xlsx");
class ExecuteExcel {
    async readFull() {
        return await excel.read("Contatos",);
    }

    async writeFull() {
        const arrayExcel = await this.readFull();
        await excel.write("Contatos", arrayExcel);
    }
}


const executeExcel = new ExecuteExcel();
executeExcel.writeFull();
