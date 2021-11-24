import fs from 'fs';
const filePath = './src/archives/json/';

let result: [] = JSON.parse(fs.readFileSync(filePath + 'customers-checked.json', 'utf8'));
result.map((item) => console.log(item));