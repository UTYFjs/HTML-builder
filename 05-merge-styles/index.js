const path = require('path');
const fs = require('fs');
const { readdir, rm, } = require('fs/promises');
const arr =[];


(async function mergeStyles(){
  const dirPath = path.join(__dirname, 'styles');
  const dirPathResult = path.join(__dirname, 'project-dist');
  const startFiles = await readdir(dirPath, {withFileTypes: true});
  for(let file of startFiles){
    if(file.isFile()){
      let fileExtname = path.extname(file.name);
      if(fileExtname.toString() === '.css'){ 
        const read = fs.createReadStream(`${dirPath}\\${file.name}`, );
        for await (let chunk of read){
          arr.push(chunk);
        }
      }
      const write = fs.createWriteStream(`${dirPathResult}\\bundle.css`);
      write.write(arr.join('\n'));
    }
  }
})();