window.onload = function(){
   var d = new Date();
   var meiyuetianshu = [31,28,31,30,31,30,31,31,30,31,30,31];
// cursor:pointer;
// cursor:default;
// ------------------------------------------------------------------------------
// 给他一个div ,Class = ' aaaa  aa  aaa' 给他一个字符串 'a'
//  aaaa  aa  aaa  a;
// split(' ') 转为数组

// addClass = function(el,s){
//     var tmp = el.getAttribute('class').split(' ');    //取出原来的所有class放入数组tmp
//     var dict = {};       //[aaaa :true, aa :true, aaa :true]   
//     for( var i = 0;i<tmp.length;i++){
//     	dict[ tmp[i] ] = true;
//     }
//     // 判断有没有s(要加的类),如果有不管,没有添加
//     if( !dict[s] ){                 //s为要加的class
//     	el.setAttribute('class',el.getAttribute('class') + ' ' + s);
//     	                          // 原来的class  中间加空格   现在的class
//     }
// };
// // 删除一个类
// removeClass = function(el,s){
//    var tmp = el.getAttribute('class').split(' '); 
//    var dict = {}; 
//     for( var i = 0;i<tmp.length;i++){
//     	dict[ tmp[i] ] = true;
//     }
//     delete dict[s];           //有就删除没有就返回undefined
//     var ns = '';
//     for( var name in dict){       //对象的遍历
//     	ns += ' ' + name;          //字符串拼接     ns放的删除后的class
//     }
//     el.setAttribute('class',ns);
// };

// 检测对不对   去掉var在控制台点一个div  $0可以去除点击的div  
// 调用 addClass($0,'aaa');   $0给谁添加,'aaa'要添加的内容
//        remove($0,'aaa');
// -------------------------------------------------------------------------------------

var ajax = function(o){
   var req = new XMLHttpRequest();
   req.open('get',o.url);
   req.send();
   req.onreadystatechange = function(){
    if( this.readyState == this.DONE && this.status == 200){
        o.onsuccess(this.response);
    }
   };
};
// var d = new Date();
var data2string = function(){
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
};


  // 闰年
   var isrunnian = function(year){
   	if(year%4 == 0 && year %100 !=0 && year %400 == 0){
   		return true;
   	}
   	    return false;
   };
   var previousDay = function(){
   	// 当前年月日
    var currentyear  = d.getFullYear();
    var currentmonth = d.getMonth();
    var currentdate  = d.getDate();
    // 目标年月日
   	var targetyear, targetmonth,targetdate;
   	//日在一直减  日期-1 
    targetdate = currentdate-1;
    if(targetdate == 0){
    	 targetyear = currentyear;
    	 targetmonth = currentmonth-1;
	    	 if(targetmonth == -1){
	    	 	targetyear = currentyear-1;
	    	 	targetmonth = 11;
	    	 }
	    	 if(targetmonth == 1 && isrunnian(targetyear)){
	    	 		meiyuetianshu[1] = 29;           //判断闰年
	    		}
	    	 targetdate = meiyuetianshu[targetmonth];
    	}else{
         targetmonth = currentmonth;
         targetyear = currentyear;
    	}
    // console.log(targetyear,targetmonth,targetdate);

   	d = new Date(targetyear,targetmonth,targetdate);

   	// console.log(d.getFullYear(),d.getMonth()+1,d.getDate());
   };

    var nextDay = function(){
   	var currentyear  = d.getFullYear();
    var currentmonth = d.getMonth();
    var currentdate  = d.getDate();
   	var targetyear,targetmonth,targetdate;
    targetdate = currentdate+1;
    //判断闰年
    if(currentmonth==1){
      if(isrunnian(currentyear)){
        meiyuetianshu[1]=29;
      }
    }
      if(targetdate > meiyuetianshu[currentmonth]){
      	targetmonth = currentmonth+1;
      	targetyear = currentyear;
      	 if(targetmonth == 12){
      	 	targetyear = currentyear+1;
      	 	targetmonth = 0;
      	 }
	     targetdate = 1;
      }else{
      	 targetmonth = currentmonth;
         targetyear = currentyear;
      }
   	d = new Date(targetyear,targetmonth,targetdate);
   	// console.log(d.getFullYear(),d.getMonth()+1,d.getDate());
   };
   // 给<添加点击事件
// 注意
//一个函数不要超过80行 ,逻辑差不多的重新写一个函数,然后调用此函数
// 一行代码不要让编译器出现横向滚动条,
// 一行代码的长度,保证打印到纸上不换行(不要超过80)

var cc=['日','一','二','三','四','五','六'];
  var shangyige;
  var ondatechange=function(){
  ajax({
  url:'http://localhost/ziyuan?time='+data2string(),
  onsuccess:function(res){
    console.log(res);
   var infor = document.getElementById('infor');
   var guanbi = document.getElementById('guanbi');
   guanbi.onclick = function(){
     infor.style.display ='none';
   };
   var tukuk=document.getElementsByClassName('tuku');
   var tupianx = document.getElementById('tupianx');
    for(var i = 0;i<tukuk.length;i++){
      tukuk[i].innerHTML = '';
      tukuk[i].onclick = function(){
        infor.style.display = 'block';
        tupianx.innerHTML=this.innerHTML;
        
        // var tt = document.createElement('img');
        // tupianx.appendChild(tt);
      };
    }
    if( res!='none'){
      res = JSON.parse(res);
      console.log(res);
    for(var i=0;i<res.length;i++){
      var el = document.createElement('img');
      el.src = './img/'+res[i];
      tukuk[i].appendChild(el);
      // tukuk[i].style.backgroundImage='url(./img/'+res[i]+')';
    }
  } 
 }
       
});
    if(shangyige){
      shangyige.style.color='black';
      shangyige.style.background='';
    }
    var dangqian=d.getDate();
    var el=document.getElementById('d'+ dangqian);
    el.style.color='white';
    el.style.background='red';
    shangyige=el;
    data.innerHTML = d.getDate();
    var ss = d.getFullYear()+'年'+(d.getMonth()+1)+ '月' +d.getDate()+ '日' + '星期' +cc[d.getDay()];
    riqi1.innerHTML = ss;
    riqi.innerHTML = ss.slice(0,-3);
    xq.innerHTML ='星期' +cc[d.getDay()];
 };

var blocks = document.getElementsByClassName('nav_block');
var huarili = function(){
	var i = 0;
	// 画前一个月(移除id)
	var tmp = d.getDate();
	d.setDate(1);
	var xingqi = d.getDay();
	// console.log(xingqi);
	L = xingqi == 0?6 : xingqi -1;
	if( d.getMonth()- 1 == -1){
		var shangyigeyutianshu = 31;
	}else{
		var shangyigeyutianshu = meiyuetianshu[d.getMonth()-1];   //30
	}
   d.setDate(tmp);
	for( ; i<L;i++){
		  blocks[i].innerHTML = shangyigeyutianshu - (L - i -1);
	    blocks[i].style.color='#ccc';
	    blocks[i].removeAttribute('id');
	    blocks[i].setAttribute('pr',true);
	}
	// 画当月(加id)
	for( ; i<meiyuetianshu[d.getMonth()] + L;i++){      //L= 6
		blocks[i].setAttribute('id','d'+(i - L +1) );
		blocks[i].innerHTML = i - L + 1 ;
		blocks[i].style.color = 'black';
		blocks[i].removeAttribute('pr');
		blocks[i].removeAttribute('nx');
	}
	// 画下一个月(移除id)
	var s = i;
	for( ; i<42;i++){      //L= 6
		blocks[i].innerHTML = i - s + 1;
		blocks[i].style.color='#A5A5A7';
		blocks[i].removeAttribute('id');
	  blocks[i].setAttribute('nx',true);
	}
};
huarili();
ondatechange();   //显示今天日期

// 点击切换日期
// (当月)
// 根据a b c 得到 逻辑正确的x y z(点击灰色部分进行跳转)
for(var i=0;i<blocks.length;i++){
    blocks[i].onclick=function(){

      var a=d.getFullYear(),
        b=d.getMonth(),
        c=d.getDate();
      if(this.hasAttribute('id')){
        d.setDate(this.innerHTML);
        ondatechange();
      }else if(this.hasAttribute('pr')){        
        //根据a,b,c得到逻辑正确的x,y,z
        var z=this.innerHTML;
        var y=b-1;
        var x=a;
        d=new Date(x,y,z);
        huarili();
        ondatechange();
      }else if(this.hasAttribute('nx')){
        var z=this.innerHTML;
        var y=b+1;
        var x=a;
        d=new Date(x,y,z);
        huarili();
        ondatechange();
        // ajax();
      }
    };
  }

left.onclick = function(){
  previousDay();
  ondatechange();  //这个函数专门用来根据日期更新页面显示
  huarili();
};
right.onclick = function(){
  nextDay();
  ondatechange();  //这个函数专门用来根据日期更新页面显示
  huarili();
};

// 上一个月 blocks[i].setAttribute('nx',true);

// 前往今天


back.onclick = function(){

	this.setAttribute('class','bianse');
	var d = new Date();
    var currentyear  = d.getFullYear();
    var currentmonth = d.getMonth();
    var currentdate  = d.getDate();
    data.innerHTML = d.getDate();
 	var ss = d.getFullYear()+'年'+(d.getMonth()+1)+ '月' +d.getDate()+ '日' + '星期' +cc[d.getDay()];
    riqi1.innerHTML = ss;
    riqi.innerHTML = ss.slice(0,-3);
    xq.innerHTML ='星期' +cc[d.getDay()];
    // blocks[i].innerHTML = currentdate;
};
// var sj = document.getElementById('sj');
// var d = new Date;
// sj.innerHTML = d.getHours() +':'+ d.getMinutes();

// var yuan = document.getElementById('yuan');
//     var line = document.getElementById('line');
//     var dangqian = document.getElementById('dangqian');
//     var jisuan =function(){
//         var ww = new Date();
//         var h = ww.getHours();
//         var m = ww.getMinutes();
//         var s = ww.getSeconds();
//         var shijiantiao = Number(h*3600+m*60+s)/3600;
//         line.style.top = Math.floor(shijiantiao*43.1)+'px';
//         yuan.style.top = Math.floor(shijiantiao*44.2)+'px';
//         dangqian.innerHTML = h+':'+m;
//     };
//     setInterval(jisuan,10);





document.onmousedown = function(e){
   e.preventDefault();
};





};













// 样式  1.block:hove
         // 2.当前日期---灰色黑字,鼠标放上粉色白字
         // 3.点到别的日期加背景
         // 4.行数处理:< 向前推   42-7 间距拉大(非闰年的2月   4行)
         // 5.字体间距不要用text-align 用定位
         // 6.星期天的变化(右边 )
         // 7.(右边)星期天背景颜色灰色
         // 8.红线---点击前往今天才会出现
         // 9.前往今天的功能
         // 右侧布局:overflow:scroll  红线相对于大div定位








