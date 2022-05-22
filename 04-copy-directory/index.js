const { readdir, mkdir, rm, copyFile } = require('fs/promises');
const path = require('path');

(async function copyDir() {
  const dirPath = path.join(__dirname, 'files');
  await mkdir( dirPath +'-copy',{recursive: true});
  const copyDirFiles = await readdir(dirPath +'-copy', {withFileTypes: true});
  for(let file of copyDirFiles){
    await rm(`${dirPath}-copy\\${file.name}`);
  }
  const dirFiles = await readdir(dirPath, {withFileTypes: true});
  for( let file of dirFiles){
    if(file.isFile()){
      console.log(`${dirPath}\\${file.name}`);
      console.log(`${dirPath}-copy\\${file.name}`);
      await copyFile(`${dirPath}\\${file.name}`, `${dirPath}-copy\\${file.name}`);
    }
  }
})();

