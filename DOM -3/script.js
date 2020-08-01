function Board(el,rows,cols){
    this.el = document.querySelector(el);
    
    this.rows=rows;
    this.cols= cols;
    
    this.generateBoard();
    this.colorBoard();
     
    this.bind();
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
    
    Board.prototype.colorBoard = function(){
        var blackcols = this.el.querySelectorAll("div[data-cell]")
        // console.log(blackcols);
        blackcols.forEach((col)=>{
            
            
            var arr = col.dataset["cell"].split(":");
            if(arr[0]%2==0){
                if(arr[1]%2==1){
                    col.style.backgroundColor = "black";
                }
                else{
                    col.style.backgroundColor = "white";
                    
                }
            }
            else if(arr[0]%2==1){
                if(arr[1]%2==0){
                    col.style.backgroundColor = "black";

                }
                else{
                    col.style.backgroundColor = "white";
                    
                }
            }


        })
        
    }

        Board.prototype.bindEvents = function(e){
            // console.log(this.el);
            let dr,dc;
            

                console.log(e.target.dataset["cell"]);
                var arr1 = e.target.dataset["cell"].split(":");
                var r =Number(arr1[0]);
                var c = Number(arr1[1]);
                var colArr = [];
                colArr.push(r+":"+c);
                var finalColArr=this.generateArray(arr1,colArr,r,c);
                
                console.log(finalColArr);

                finalColArr.forEach((c)=>{
                    
                    
                    console.log(c)
                
                    var a = this.el.querySelector("div[data-cell='"+c+"']");
                    console.log(a);
                    a.style.backgroundColor = "blue";
                   
                })
        
            
                
            }

            Board.prototype.generateArray=function(arr1,colArr,r,c){
               
                while((r>0)&&(c>0)){
                    r = r-1;
                    c=c-1;
                    colArr.push(r+":"+c);
                }
                var r =Number(arr1[0]);
                var c = Number(arr1[1]);
                while((r<this.rows-1)&&(c<this.cols-1)){
                    r = r+1;
                    c=c+1;
                    // colArr.push([r,c]);
                    colArr.push(r+":"+c);

                }
                var r =Number(arr1[0]);
                var c = Number(arr1[1]);
                while (r < this.rows-1 && c > 0){
                r += 1
                c -= 1
                // colArr.push([r, c])
                colArr.push(r+":"+c);

                }
                var r =Number(arr1[0]);
                var c = Number(arr1[1]);
                while (r > 0 && c < this.cols-1){
                r -= 1
                c += 1
                // colArr.push([r, c])
                colArr.push(r+":"+c);

                }

                return colArr;

            }
            Board.prototype.bind = function(){
            var divs = document.querySelector("body");
            divs.addEventListener("click",(e)=>{
                // console.log(e);
                // console.log(e.target.className=="column");
                if(e.target.className==="column"){
                this.colorBoard();

                    this.bindEvents(e);
                }
                else{
                    this.colorBoard();
                }
            })
        }
    new Board("#board",8,8)