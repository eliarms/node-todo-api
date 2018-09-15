var logger = (req,res,next) => {
  var start = +new Date();
  var stream = process.stdout;
  var url = req.url;
  var method = req.method;

  res.on('finish',()=>{
    var duration = +new Date() - start;
    var message = method + ' to ' + url +
    '\ntook '+ duration + ' ms \n\n';
    stream.write(message+req);

  },(e)=>{
    console.log('unable to execute function',e);
  });
  next();
}
module.exports ={logger}
