import { getData } from "./getData";

const url = process.argv[2];

getData(url).then(console.log);

console.log(url);