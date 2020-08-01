function Board(el,rows,cols){
    this.el = document.querySelector(el);
    this.rows=rows;
    this.cols=cols;
    this.draw=false;
    this.btn = document.querySelector("#btn");
    // console.log(this.rows);
    this.activeColor = "black";
    this.generateBoard();
    this.colorPalette();
    this.bindEvents();
}

Board.prototype.generateBoard=function(){
    var div=document.createDocumentFragment("div");
    for(var i=0;i<this.rows;i++){
        var row=document.createElement("div");
        row.classList.add("row");
        for(var j=0;j<this.cols;j++){
            var col=document.createElement("div");
            col.classList.add("column");
            col.dataset["cell"]=i+":"+j;
            // console.log(col);   
            row.appendChild(col);
        }
        div.appendChild(row);
    }
    this.el.appendChild(div);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


Board.prototype.colorPalette = function(){
    var r = document.createElement("div");
    r.classList.add("row");
    for(var i=0;i<this.cols;i++){
        var color = getRandomColor();
        var c = document.createElement("div");
        c.classList.add("column");
        c.style.background = color;
        c.dataset["color"] = color;
        r.appendChild(c);
    }
    this.el.appendChild(r);

}

Board.prototype.fill = function(e){
    var cell = e.target.dataset['cell'];
    var color = e.target.dataset['color'];
    color && (this.activeColor = color);
    cell && (e.target.style.background = this.activeColor);
}

Board.prototype.bindEvents = function(){
    this.el.addEventListener("mousedown",(e)=>{
        console.log("mousedown");
        this.draw = true;
        this.fill(e);
        
    })
    this.el.addEventListener("mouseup",(e)=>{
        // console.log("mouseup")
        this.draw=false;
    })
    this.el.addEventListener("mouseover",(e)=>{
     
        this.draw && (
            this.fill(e)
        )
        }
    )
    // this.btn.addEventListener("click",(e)=>{

    //     var columns = document.querySelectorAll("div[data-cell]");
        
    //     columns.forEach(cl=>{
    //         cl.style.background="white";
    //     })

    // })
}

new Board("#board",30,30);