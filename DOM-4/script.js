var start = 4;

function Board(el1,el2,rows=4,cols=4){
    this.el1 = document.querySelector(el1)
    this.el2 = document.querySelector(el2);
    
    this.rows = rows;
    this.cols = cols;
    this.score = 0;
    this.generateBoard(this.rows,this.cols);
    this.bindEvents();


}
const getRandomColors = function(row){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
Board.prototype.generateBoard = function(r,c){
    console.log({r,c})
    const {color,oddColor} = getRandomColors();
    this.randomRow = getRandomInt(r);
    this.randomColumn = getRandomInt(c);
    console.log(this.randomRow,this.randomColumn);
    const fragment = document.createDocumentFragment("div");
    for(let i=0;i<this.rows;i++){
        var row = document.createElement("div");
        row.classList.add("row");
        for(let j=0;j<this.cols;j++){
            var col = document.createElement("div");
            col.classList.add("col");
            col.dataset['cell']=i+":"+j;
            if(i===this.randomRow&&j===this.randomColumn){
                col.style.background=oddColor; 
                col.classList.add("odd-box");
            }
            else{
            col.style.background=color
            }
            row.appendChild(col);
        }
        fragment.appendChild(row);
    }
    this.el2.appendChild(fragment);
    // this.bindEvents();
    
}


Board.prototype.bindEvents = function(){
    document.addEventListener("click",(e)=>{
        // console.log("hi");
        if(e.target.classList.contains('odd-box')){
            // console.log("odd");
            this.score+=1;
            this.el1.innerHTML = `Score:${this.score}`;
            this.el2.innerHTML="";
            this.generateBoard(++this.rows,++this.cols);    
        }
        else{
            this.el2.classList.add("shake");
            setTimeout(this.shakethegrid,1000);
            this.score = 0;
            this.el1.innerHTML = `Score:${this.score}`;
            this.el2.innerHTML="";
            this.rows=4;
            this.cols=4;
            this.generateBoard(this.rows,this.cols);    




        }
    })
}

Board.prototype.shakethegrid = function(){
    // console.log(this.el2);
    var doc = document.getElementById("board");
    doc.classList.remove("shake");
}






new Board("#score","#board",4,4) ;