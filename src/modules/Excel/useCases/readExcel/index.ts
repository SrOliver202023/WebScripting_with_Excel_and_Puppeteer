import { Excel } from '../../service/Excel';
const directory = __dirname + "/../../../../archives/";

const excel = new Excel(directory + "AutoSombra.xlsx");

async function readFull(){
    let result = await excel.read("Contatos",)
    console.log(result)
}

async function writeFull(){
    await excel.write("Contatos")
}
// readFull();
writeFull()


// console.log(directory + "AutoSombra.xlsx");