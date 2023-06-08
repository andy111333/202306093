class Bullet{
    constructor(args){
      this.r = args.r || 20 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有參數就已10為主
      this.p = args.p || shipP.copy()//createVector(width/2,height/2)//建立一個向量{x:width/2,y:height/2}
      this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(20)
      this.color = args.color || "white"
     }
     draw(){ //匯出物件程式碼
       push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
       pop()
     }
     update(){   //計算移動後的位子
      this.p.add(this.v) 
     }
  }