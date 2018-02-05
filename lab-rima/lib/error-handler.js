'use strict';

module.exports = function(err, res){
  let msg = err.message.toLowerCase();
//  console.log('error handler', msg);
  /*  switch(true){
    case msg.includes('validation error'):
      return res.status(400).send(`${err.name}: ${err.message}`);
      break;
    case msg.includes('enoent'):
      return res.status(404).send(`${err.name}: ${err.message}`);
      break;
    case msg.includes('path error'):
      return res.status(404).send(`${err.name}: ${err.message}`);
      break;
    default:
      return res.status(500).send(`${err.name}: ${err.message}`);
  }
*/
  if(msg.includes('validation error')){
    return res.status(400).send(`${err.name}: ${err.message}`);
  }
  if(msg.includes('no such file')){
    return res.status(404).send(`${err.name}: ${err.message}`);
  }
  if(msg.includes('path error')){
    return res.status(404).send(`${err.name}: ${err.message}`);
  }

  return res.status(500).send(`${err.name}: ${err.message}`);
};
