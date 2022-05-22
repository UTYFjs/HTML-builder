const path = require('path');
const fs = require('fs');

fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, (err, files)=>{
  files.forEach( (file) => {if(file.isFile()){
    let fileExtname = path.extname(file.name);
    let filePath = path.join(__dirname + `/secret-folder/${file.name}`);
    let fileName = path.basename(filePath, fileExtname.toString());
    fs.stat( filePath, (err, data) => {
      let fileSSize = (data.size/1024).toFixed(3) +'kb';
      console.log( fileName+' - '+fileExtname.slice(1)+' - '+ fileSSize);
    });
  }
  });
});

