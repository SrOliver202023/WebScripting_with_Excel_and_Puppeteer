import { Excel } from '../../service/Excel';
const directory = __dirname + "/../../../../archives/";

const excel = new Excel(directory + "AutoSombra.xlsx");

excel.read("Contatos");


console.log(directory + "AutoSombra.xlsx");