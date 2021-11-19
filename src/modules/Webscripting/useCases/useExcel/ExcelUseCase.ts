import { Worksheet } from 'exceljs';
import { IClient } from '../../dtos/index';

class ExcelUseCase {

    async parseSoldsToObject(worksheet: Worksheet) {
        const skipInt = 2;

        const numberRows = worksheet.getColumn('A').values.length;

        const formattedArray: IClient[] = [];

        const rows = worksheet.getRows(skipInt, numberRows - skipInt);

        rows?.map(async (row, index) => {
            const item = row.model?.cells?.map(item => item.result);
            const skipInt = 2;

            if (!item) throw new Error("There are no values in cells!");

            const newClient = {
                row: index + skipInt,
                name: item[2],
                contact: item[5]
            };
            console.log(newClient);
            formattedArray.push(newClient);
        });

        return formattedArray;

    }

    async insertValues(worksheet: Worksheet) {

        const listRows = await this.parseSoldsToObject(worksheet);
        if (!listRows) throw new Error("There are no values in cells!");

        listRows.map((item, index) => {
            worksheet.getCell(`H${item.row}`).value = `OK`;
        });

    }
}
export { ExcelUseCase };