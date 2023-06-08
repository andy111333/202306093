//class:類別，粒子
class Obj{ //宣告一個類別，一個圖案
    constructor(args){ //預設值，基本資料(物件顏色，移動速度，大小，初始顯示位置...)
     //this.p = args.p || {x:random(width),y:random(height)} //描述為該物件的初始位置(x,y) ，||(or)當產生一個物件，有傳給位子參數，則使用該參數，就以日後設定產出
     //this.v = {x:random(-1,1),y:random(-1,1)}//設定一個物件的移動速度 
     this.p = args.p ||createVector(random(width),random(height))
     this.v=createVector(random(-1,1),random(-1,1))
     this.size = random(3,5)  //設定一個物件的放大倍率
     this.color = random(fill_colors)
     this.stroke = random(line_colors)
    }
    draw(){ //畫出單一個物件形狀
      push() //執行push的指令後，依照自己的設定，設定原點(0,0的位置 
       translate(this.p.x,this.p.y)
       scale(this.v.x<0?1:-1,-1)
       fill(this.color)
       stroke(this.stroke)
       strokeWeight(4)//線條粗細
       beginShape()
       for(var k=0;k<points.length;k=k+1){
        // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
        //vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endshape()，會把所有點串接再一起
        curveVertex(points[k][0]*this.size,points[k][1]*this.size)
       }
       endShape()
     pop() //執行pop過後，原點(0,0)回到整個視窗的上角
   }
   update() {
    //this.p.x = this.p.x+this.v.x //x軸目前位置加上x軸的移動速度
    //this.p.y = this.p.y+this.v.y
    this.p.add(this.v)//上面兩行的效果

    //  let mouseV = createVector(mouseX,mouseY)
    //  let delta= mouseV.sub(this.p).limit(this.v.mag()*20)
    //  this.p.add(delta)

     if(this.p.x<=0||this.p.x>=width){
     this.v.x=-this.v.x  
    }
     if(this.p.y<=0||this.p.y>=height){
     this.v.y=-this.v.y
     }
  }
  isBallInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在物件範圍內
    let d = dist(x,y,this.p.x,this.p.y) //計算兩個點之間的具距離
    if (d<5*this.size){
     return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回rue的值
    }else{
      return false
    }    
  }
}
