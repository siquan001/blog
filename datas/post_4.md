

最近用canvas做了一个贪吃蛇，总的来说算比较简单，但是要考虑的点还是很多的。

话不多说，直接上源码：

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>贪吃蛇</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .game_container{
      position: absolute;
      top: 0;
      left:0;
      bottom:0;
      right:0;
      background-color: #000;
      color: #fff;
    }
    canvas{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      display: block;
      background-color: #02002b;
    }
    .game_tip{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      display: none;
      background-color: rgba(0,0,0,.6);
    }
    .game_tip p{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      text-align: center;
      font-size: 5vh;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="game_container">
    <canvas></canvas>
    <div class="game_tip"></div>
  </div>
  <script src="./index.js"></script>
</body>
</html>
```

```javascript
// index.js

var canvas=document.querySelector('canvas');
var ctx=canvas.getContext('2d');

var sqWH=11;

// 蛇
var snack=[[(sqWH-1)/2,(sqWH-1)/2]] //初始化默认中心位置

// 食物
var food;

// 行走速度
var speed=4 //格/s

// 颜色
var snackColor=[0,0x99,0xff];
var foodColor=[0xff,0,0];

// 用于判断方向是否正确
var lastDir=[0,0];
// 当前行走的方向
var nowDir=[0,0];

// 游戏状态 0:未开始 1：进行中 2：结束
var STATE=0;

var interval;

function _resize(){
  var wh=Math.min(window.innerWidth,window.innerHeight);
  canvas.width=canvas.height=wh;
  draw();
}

window.addEventListener('resize',_resize);

function tip(t){
  var game_tip=document.querySelector('.game_tip');
  if(typeof t=='string'){
    game_tip.innerHTML='<p>'+t+'</p>';
    game_tip.style.display='block';
  }else if(typeof t=='boolean'){
    if(t){
      game_tip.style.display='block'
    }else{
      game_tip.style.display='none';
    }
  }
}

tip('按任意方向键开始游戏');

function draw(){
  // 清空画布
  ctx.clearRect(0,0,canvas.width,canvas.height);

  var sqSize=canvas.width/sqWH;
  // 画蛇
  for(var i=0;i<snack.length;i++){
    ctx.fillStyle='rgba('+snackColor.join(',')+','+(1-i*0.5/snack.length)+')';// 渐变
    ctx.fillRect(sqSize*snack[i][0],sqSize*snack[i][1],sqSize,sqSize);
  }
  // 画食物
  ctx.fillStyle='rgb('+foodColor.join(',')+')';
  ctx.fillRect(sqSize*food[0],sqSize*food[1],sqSize,sqSize)
}

function getNewFood(){
  var af=[];
  for(var i=0;i<sqWH;i++){
    for(var j=0;j<sqWH;j++){
      var a=true;
      for(var k=0;k<snack.length;k++){
        if(snack[k][0]==i&&snack[k][1]==j){
          a=false;
          break;
        }
      }
      if(a) af.push([i,j]);
    }
  }
  return af[parseInt(Math.random()*af.length)];
}

food=getNewFood();
_resize();

document.addEventListener('keydown',function(e){
  if(e.key=='ArrowUp'){
    changeDir([0,-1]);
  }else if(e.key=='ArrowDown'){
    changeDir([0,1]);
  }else if(e.key=='ArrowLeft'){
    changeDir([-1,0])
  }else if(e.key=='ArrowRight'){
    changeDir([1,0]);
  }
})

function changeDir(dir){
  function d(dir){
    if(checkDirCorrect(dir)){
      nowDir=dir;
    }
  }
  d(dir);
  STATE=1;
  tip(false);
  inter=setInterval(function(){
    move(nowDir);
  },1000/speed);
  changeDir=d;
}

function move(dir){
  if(!checkDirCorrect(dir)) return;
  lastDir=dir;

  var newSnack=[snack[0][0]+dir[0],snack[0][1]+dir[1]];

  if(newSnack[0]<0||newSnack[0]>sqWH-1||newSnack[1]<0||newSnack[1]>sqWH-1){
    tip('游戏结束，得分：'+snack.length);
    clearInterval(inter);
    STATE=2;
    return;
  }

  // 判断是否吃到食物
  if(food[0]==newSnack[0]&&food[1]==newSnack[1]){
    // 因为食物本身不在蛇上，所以在吃到食物的情况下，不可能会撞到自己
    snack.unshift(newSnack);
    food=getNewFood();
    draw();
  }else{
    // 在没有吃到食物的情况下，有可能会撞到自己
    for(var i=0;i<snack.length;i++){
      if(snack[i][0]==newSnack[0]&&snack[i][1]==newSnack[1]){
        // 撞到自己
        tip('游戏结束，得分：'+snack.length);
        clearInterval(inter);
        STATE=2;
        return;
      }
    }

    snack.unshift(newSnack);
    snack.pop();
    draw();
  }
}

function checkDirCorrect(dir){
  if(snack.length>1){
    // 在蛇的长度大于1时，往原来的相反方向走是不正确的
    if((dir[0]!=0&&dir[0]==-1*lastDir[0])||(dir[1]!=0&&dir[1]==-1*lastDir[1])){
      return false;
    }
  }
  return true;
}
```

可以当作参考，希望可以帮助到你。
  