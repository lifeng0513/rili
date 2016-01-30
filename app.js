var express = require('express');   //express
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var pics = {};
fs.readdir('./public/img/',function(err,files){
	// console.log(files);
	for( var i=0;i<files.length;i++){
		fs.stat('./public/img/'+files[i],(function(i){
	    return function(err,info){
           // console.log(files[13]);
           // console.log(info.mtime);
           var mtime = info.mtime;
           var key = mtime.getFullYear()+'-'+(mtime.getMonth()+1)+'-'+mtime.getDate();
           console.log(key);
           if(!pics[key]){
           	 pics[key] = [];
           }
           pics[key].push(files[i]);
           console.log(pics);
	  }

})(i));
	}
	
	// for(var i=0;i<files.length;i++){
	// 	fs.stat('./public/img/'+files[i],(function(i){  
 //      return function(err,info){
 //      	var mtime = info.mtime;
 //        console.log(info.mtime);      //某个照片的信息
 //        var key = mtime.getFullYear()+'-'+mtime.getMonth()+'-'+mtime.getDate();
 //        console.log(key);
 //        if(!database[key]){
 //           database[key] = [];
 //        }
 //        database[key].push(files);
 //        console.log(database);
	//   }
	// 	})(i));
	
	// }
	
});

app.use(express.static('public'));  //让 public 这个文件夹中的内容可以通过  /  直接访问
// var data = {a:1,b:2};
// var data = [{name:1,src:2},{name:1,src:2},{name:1,src:2}]

// var database = [
//     {id:0,name:'你给的快乐',geshou:'胡夏'  ,duration:'03:47',src:'./music/1.mp3'},
//     {id:1,name:'没那么简单',geshou:'黄小琥',duration:'05:07',src:'./music/2.mp3'},
//     {id:2,name:'星月神话'  ,geshou:'金莎'  ,duration:'04:09',src:'./music/3.mp3'},
//     {id:3,name:'陪我看电影',geshou:'魏晨'  ,duration:'04:07',src:'./music/4.mp3'},
//     {id:4,name:'用一生'    ,geshou:'唐嫣'  ,duration:'04:38',src:'./music/5.mp3'},
//     {id:5,name:'我要夏天'  ,geshou:'王俊凯',duration:'03:28',src:'./music/6.mp3'},
//     {id:6,name:'爱我就陪我看电影',geshou:'魏晨',duration:'04:46',src:'./music/7.mp3'},
//     {id:7,name:'爱不后悔'  ,geshou:'罗晋'  ,duration:'04:32',src:'./music/8.mp3'},
//     {id:8,name:'幸福的花'  ,geshou:'棉花糖',duration:'00:38',src:'./music/9.mp3'},
//     {id:9,name:'放心去飞'  ,geshou:'欧豪'  ,duration:'04:04',src:'./music/10.mp3'},
//     {id:10,name:'雨天'      ,geshou:'戚薇'  ,duration:'04:30',src:'./music/11.mp3'},
//     {id:11,name:'独一无二'  ,geshou:'泳儿'  ,duration:'03:38',src:'./music/12.mp3'}
// ];
// var ttt = [
//      {src:'img/11.jpg'},
//      {src:'img/12.jpg'},
//      {src:'img/13.jpg'},
// ];
// var pics = {
// 	  '2015-11-27':['16.jpg','17.jpg','18.jpg'],
// 	  '2015-11-26':['1.jpg','2.jpg','3.jpg'],
// 	  '2015-11-25':['4.jpg','5.jpg','6.jpg'],
// 	  '2015-11-24':['7.jpg','8.jpg','9.jpg'],
// 	  '2015-11-23':['10.jpg','11.jpg','12.jpg'],
// 	  '2015-11-22':['13.jpg','14.jpg','15.jpg']
// };
app.get('/ziyuan',function(req,res){
	// console.log(req.query.time); 
	if(pics[req.query.time]){
     res.json(pics[req.query.time]);   
	} else{
	 res.send('none');
	} 
   
});
//res.json 发送的对象:   类似数组      {}   []  [{}] {[]}
//res.send 发送的对象:   数字,字符串   14 '烦恼'
//res.sendFile()
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');     //dirname前面有两个_
});
http.listen(80,function(){
	console.log('listening on *:80');            //浏览器地址栏输入网址不带端口号
});

// 我们的目标:把shenqi = {} 变成
// var shenqi = {
// 	1231:[{time:早上3点,src:'a.jpg'},{time:中午3点,src:'b.jpg'}]
// };
// var shenqi = {};
// var fs = require('fs');  //读取目录
// fs.readdir('./public/img',function(err,files){   
//         console.log(files);   //会得到一个数组
//     for( var i=0;i<files.length;i++){
//       fs.stat('./public/img/'+c[i],function(err,stats){
//         console.log(stats.mtime);    //ctime创建时间
//         console.log(stats.ctime.getFullYear() );
//       });
//     }
// }); 
// 生成shenqi   console.log(shenqi);
// var shenqi = {
//   1:[{time:03:00,src:'1.jpg'},{},{}]
// };
// app.get('/ziyuan',function(req,res){
//   var r = shenqi[req.query.time];   
//     res.json(r) ;  
// });
// ctime 不是create time 而是change time;
// atime access time 查看后会改变
// mtime modify time 编辑时间