
export default function token(data) {
  let length;
  let type;
  let alpha = 'abcdefghijklmnopqrstuv';
  let num = '0123456789'
  let opt = '';
  let token = "";
  if(typeof data == Object) {
    length = data.len;
    type = data.type;
  } else {
    length = data
  }
  if(type == 'number') {
    opt+=num;
  } else if(type == 'alpha') {
    opt+=alpha;
  } else {
    opt+=alpha;
    opt+=num;
  }
  opt= opt.split[''];
  console.log(opt.join('')); 
  for(let i=0;i<length;i++) {
    let rnd = Math.floor(Math.random()*opt.length);
    token+=opt[rnd]; 
  }
  return token;   
} 