const path = require('path');
const fs = require('fs');
const { readdir, mkdir, rm, copyFile } = require('fs/promises');

const pathBundleDir = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'assets');
function newDir(path){
  mkdir( path, {recursive: true});
}

async function  copyAssets(pathDir, pathCopy){
  const assetsStorage = await readdir(pathDir, {withFileTypes: true});
  for(let item of assetsStorage){
    if(item.isFile()){
      await copyFile(pathDir +`\\${item.name}`, pathCopy+`\\${item.name}`);
    } else {
      await mkdir(pathCopy+`\\${item.name}`);
      await copyAssets(pathDir +`\\${item.name}`, pathCopy+`\\${item.name}`);
    }
       
  }
}

async function mergeStyle(pathDir, pathDirResult){
  const arr =[];
  const startFiles = await readdir(pathDir, {withFileTypes: true});
  for(let file of startFiles){
    if(file.isFile()){
      let fileExtname = path.extname(file.name);
      if(fileExtname.toString() === '.css'){ 
        const read = fs.createReadStream(`${pathDir}\\${file.name}`, );
        for await (let chunk of read){
          arr.push(chunk);
        }
      }
      const write = fs.createWriteStream(`${pathDirResult}\\style.css`);
      write.write(arr.join('\n'));
    }
  }

}



(async function done() {
  await rm(pathBundleDir, {recursive: true, force: true});
  await newDir(pathBundleDir);
  await newDir(pathBundleDir+'\\assets');
  await copyAssets(pathAssets, pathBundleDir+'\\assets');
  await mergeStyle(path.join(__dirname, 'styles'), pathBundleDir);
})();
