const fs = require('fs');
const path = require('path');

const {stdin, stdout} = process;


const file = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(file);

function exit(){
  console.log('Спасибо, Удачи! Процесс завершен');
  process.exit();
}

stdout.write('введите текст, для выхода введите exit или нажмите Ctrl+C \n');

stdin.on('data', (data) => {
  if( data.toString().trim() === 'exit') exit();
  writeStream.write(data);
});

process.on('SIGINT', exit);
