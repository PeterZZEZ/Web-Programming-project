const gameBoard = document.querySelector('#gameboard');
const playerPiece = document.querySelector('#gamepiece');
const scoreboardDiv = document.querySelector('#scoreboard');
const timeDiv = document.querySelector('#time');
const mirrorButton = document.querySelector('#mirror');
const rotateButton = document.querySelector('#rotate');
const seasonDiv = document.querySelector('#season');
const timeSomething = document.querySelector('.timeCons');
mirrorButton.addEventListener('click',mirrorUpdate);
rotateButton.addEventListener('click',rotateUpdate);
const width=11;
const curPiece=[];
const curSeason={0:'Spring',1:'Summer',2:'Autumn',3:'Winter'};
let chosenMissions=[]
const missionFuncs =[ 
    {
        func:function (){
        let out=0;
        let board=gameBoard.children[0].children[0].children;
        
        for(let i=0;i<11;i++){
            let scr=true;
            for(let j=0;j<11;j++){   
                if(board[i].children[j].children[0].children.length==0){
                    scr=false;
                }
            }
            if(scr){
                out+=6
            }
        }
        for(let i=0;i<11;i++){
            let scr=true;
            for(let j=0;j<11;j++){   
                if(board[j].children[i].children[0].children.length==0){
                    scr=false;
                }
            }
            if(scr){
                out+=6
            }
        }
        return out;
    },
        img:"assets/Borderlands.png"
    },
    {
    func:function (){
        let out = 0;
        let board=gameBoard.children[0].children[0].children
        for(let i=0;i<11;i++){
            for(let j=0;j<11;j++){
                if(i==0||i==10||j==0||j==10){
                    if(board[i].children[j].children[0].id=='forest'){
                        out+=1
                    }
                }
                
            }
        }
        return out;
    },
    img:"assets/EdgeOfForest.png"
    },
    {
    func: function (){
        let out=0;
        for(let row of gameBoard.children[0].children[0].children) {
            let count=0;
            for(let cell of row.children){
                
                if(cell.children[0].children.length != 0){
                    if(cell.children[0].id=='forest'){
                        count+=1;
                    }
                }
            }
            if(count==3){
                out+=4;
            }
        };
        return out;
    },
    img:"assets/SleepyValley.png"
    },
    {
    func:function (){
    const highlight = gameBoard.querySelectorAll('[id=farm]');
    const allpotato=[]
    for(let cell of highlight){
        if(cell!=NaN){
            var neighbors = getNeighbors(cell.parentNode)
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    //not checking the corners
                    if(i==j || (i==0 && j==2) || (i==2 && j==0)){
                        continue;
                    }
                    if(neighbors[i*3+j]!=0){
                        if(neighbors[i*3+j].children[0].id=='water'){
                            allpotato.push(neighbors[i*3+j].children[0]);
                        }
                    }
                }
            }
        }
    }
    let a = allpotato.filter(onlyUnique)
    return a.length*2;
    },
    img:"assets/WaterPotatoes.png"
    },
    {
        func:function(){
            const highlight = gameBoard.querySelectorAll('[id=town]');
            const allEmpty=[]
            for(let cell of highlight){
                if(cell!=NaN){
                    var neighbors = getNeighbors(cell.parentNode)
                    for(let i=0;i<3;i++){
                        for(let j=0;j<3;j++){
                            //not checking the corners
                            if(i==j || (i==0 && j==2) || (i==2 && j==0)){
                                continue;
                            }
                            if(neighbors[i*3+j]!=0){
                                if(neighbors[i*3+j].children[0].id==''){
                                    allEmpty.push(neighbors[i*3+j].children[0]);
                                }
                            }
                        }
                    }
                }
            }
            let a = allEmpty.filter(onlyUnique)
            return a.length*2;
        },
        img:"assets/EmptySide.png"
    },
    {
        func:function (){
            const highlight = gameBoard.querySelectorAll('[id=MT]');
            const allpotato=[]
            for(let cell of highlight){
                if(cell!=NaN){
                    var neighbors = getNeighbors(cell.parentNode)
                    for(let i=0;i<3;i++){
                        for(let j=0;j<3;j++){
                            //not checking the corners
                            if(i==j || (i==0 && j==2) || (i==2 && j==0)){
                                continue;
                            }
                            if(neighbors[i*3+j]!=0){
                                if(neighbors[i*3+j].children[0].id=='water'){
                                    allpotato.push(neighbors[i*3+j].children[0]);
                                }
                            }
                        }
                    }
                }
            }
            let a = allpotato.filter(onlyUnique)
            return a.length*3;
            },
        img:'assets/MagicValley.png'
    },
    {
        func:function (){
            let out=0;
            let board=gameBoard.children[0].children[0].children;
            for(let i=0;i<11;i=i+2){
                let scr=true;
                for(let j=0;j<11;j++){   
                    if(board[j].children[i].children[0].children.length==0){
                        scr=false;
                    }
                }
                if(scr){
                    out+=10
                }
            }
            return out;
        },
        img:'assets/OddNumberedSilo.png'
    },
    {
        func:function (){
            let out=0;
            let board=gameBoard.children[0].children[0].children;
            for(let i=0;i<11;i++){
                let unique=[] 
                let scr=true;
                for(let j=0;j<11;j++){  
                    if(board[i].children[j].children[0].id!=''){
                        unique.push(board[i].children[j].children[0].id)
                    } 
                }
                let filtered = unique.filter(onlyUnique)
                console.log(filtered)
                if(filtered.length>=5){
                    out+=4
                }
            }
            return out;
        },
        img:'assets/RichCountrySide.png'
    },
    {
        func:function(){
            let maxMaxLen=0;
            let board=gameBoard.children[0].children[0].children;
            for(let i = 0;i<11;i++){
                let prevCount = 0;
                let curCount=0;
                let maxLen=0;
                for(let j =0;j<11;j++){
                    if(board[j].children[i].children[0].id=='forest'){
                        curCount++;
                    }
                    else{
                        prevCount=Math.max(prevCount,curCount);
                        curCount=0;
                    }
                }
                maxLen=Math.max(prevCount,curCount);
                maxMaxLen = Math.max(maxLen,maxMaxLen);
            }
            return maxMaxLen*2
        },
        img:'assets/TreeLine.png'
    }
]



let curType='';
let obstructed = false;
let gameEnd=false;
let score=0;
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]
const startPieces = [
    ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],
    ["--",  MT , "--", "--", "--", "--", "--", "--", "--", "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--",  MT , "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],
    ["--", "--", "--",  MT , "--", "--", "--", "--", "--", "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--", "--",  MT , "--"],
    ["--", "--", "--", "--", "--",  MT , "--", "--", "--", "--", "--"],
    ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ]
]
const pieceDict = {
    'water':water,'town':town,'farm':farm,'forest':forest
}
function init(){
    createBoard();
    createPiece();
    setMissions();
    timeDiv.children[0].innerHTML = `0`;
    updateSeason()
}
function createBoard(){
    var x = document.createElement("TABLE");
    var rows=[]
    for(let i = 0; i < width ; i++){
        var temp = x.insertRow(-1);
        for(let j = 0; j < width; j++){
            var cell = temp.insertCell(-1);
            if(startPieces[i][j]=='--'){
                cell.innerHTML =`<div class= "cell biege"></div>`
            }
            else{
                cell.innerHTML =MT
            }
            cell.addEventListener('mouseenter',hoverOver)
            cell.addEventListener('mouseleave',hoverOut)
            cell.addEventListener('click',mouseClick)
            
        }
        rows.push(temp);
    }

    gameBoard.append(x);
}
function createPiece(elIndex=-1){
    playerPiece.innerHTML=''
    if(elIndex==-1){
        elIndex = Math.floor(Math.random() * elements.length);
        elements[elIndex]['rotation']=0;
        elements[elIndex]['mirrored']=false;
    }
    const curPiece = elements[elIndex];
    timeSomething.children[1].innerHTML=elements[elIndex]['time'];
    curShape = curPiece['shape'].map(function(arr){return arr.slice()});
    curType = curPiece['type'];
    var rows=[];
    var x = document.createElement("TABLE");
    for(let i = 0; i < curPiece['rotation'];i++){
        curShape = curShape[0].map((val, index) => curShape.map(row => row[index]).reverse())

    }
    if(curPiece['mirrored']){
        curShape=curShape.map(function(arr){return arr.reverse();});
    }
    for(let i =0;i<3;i++){
        var temp = x.insertRow(-1);
        for(let j =0;j<3;j++){
            var cell=temp.insertCell(-1);
            if(curShape[i][j]==1){
                cell.innerHTML = pieceDict[curType];
            }
            else{
                cell.innerHTML =`<div class= "cell biege"></div>`
            }
        }
        rows.push(temp);
    }
    playerPiece.setAttribute('index',elIndex)
    playerPiece.append(x);
    
}
function timeDilate(){
    var amountTime=parseInt( timeSomething.children[1].innerHTML);
    var curTime=parseInt(timeDiv.children[0].innerHTML);
    var newTime = curTime+amountTime;
    if(newTime>=7){
        calcScore();
        newTime-=7;
        newTime=Math.abs(newTime);
        seasonDiv.setAttribute('seasons',parseInt(seasonDiv.getAttribute('seasons'))+1);
        
        const tempDiv = document.querySelectorAll('[id=mission]');
        let found=false;
        for(let i = 0; i<4;i++){
            if(tempDiv[i].classList.length!=0 && !found){
                found=true;
                tempDiv[i].classList.remove('current_mision');
                if(i+2>=4){
                    tempDiv[0].classList.add('current_mision');
                }
                else{tempDiv[i+2].classList.add('current_mision');}
            }
            
        }
        updateSeason();
        const temp = document.querySelector('.totalScore');
        temp.children[0].innerHTML=score+parseInt(temp.children[0].innerHTML);
    }
    timeDiv.children[0].innerHTML=newTime;   
}
function updateSeason(){
    seasonDiv.children[0].innerHTML=curSeason[ parseInt(seasonDiv.getAttribute('seasons'))]
    if(parseInt(seasonDiv.getAttribute('seasons'))==4){
        const tempDiv = document.getElementsByClassName('current_mision');
        for(let i = 0;i<tempDiv.length;i++){
            tempDiv[i].classList.remove('current_mision');
        }
        gameEnd=true;
        setTimeout("alert('Game Over');", 1);
        
    }
}
function setMissions(){
    chosenMissions=[...Array(missionFuncs.length).keys()]
    const shuffledArr = chosenMissions.sort(() => Math.random() - 0.5);
    chosenMissions = shuffledArr
    
    const tempDiv = document.querySelectorAll('[id=mission]');
    for(let i = 0; i<4 ; i++){
        let temp = new Image;
        temp.src=missionFuncs[ chosenMissions[i] ].img;
        tempDiv[ i ].append(temp)
    }
}
function calcScore(){
    let scoreer=0;
    let temp = document.querySelector(`.`+curSeason[seasonDiv.getAttribute('seasons')].toLowerCase());
    const tempDiv = document.querySelectorAll('[id=mission]');
    switch(parseInt(seasonDiv.getAttribute('seasons'))){
        case 0:
            scoreer+=missionFuncs[chosenMissions[0]].func();
            scoreer+=missionFuncs[chosenMissions[1]].func();
            tempDiv[0].children[0].innerHTML=missionFuncs[chosenMissions[0]].func();
            tempDiv[1].children[0].innerHTML=missionFuncs[chosenMissions[1]].func();
            scoreer+=SurroundedMountains();
            break;
        case 1:
            scoreer+=missionFuncs[chosenMissions[1]].func();
            scoreer+=missionFuncs[chosenMissions[2]].func();
            tempDiv[1].children[0].innerHTML=missionFuncs[chosenMissions[1]].func();
            tempDiv[2].children[0].innerHTML=missionFuncs[chosenMissions[2]].func();
            scoreer+=SurroundedMountains();
            break;
        case 2:
            scoreer+=missionFuncs[chosenMissions[2]].func();
            scoreer+=missionFuncs[chosenMissions[3]].func();
            tempDiv[2].children[0].innerHTML=missionFuncs[chosenMissions[2]].func();
            tempDiv[3].children[0].innerHTML=missionFuncs[chosenMissions[3]].func();
            scoreer+=SurroundedMountains();
            break;
        case 3:    
            scoreer+=missionFuncs[chosenMissions[3]].func();
            scoreer+=missionFuncs[chosenMissions[0]].func();
            tempDiv[3].children[0].innerHTML=missionFuncs[chosenMissions[3]].func();
            tempDiv[0].children[0].innerHTML=missionFuncs[chosenMissions[0]].func();
            scoreer+=SurroundedMountains();
            break;
        default:
            scoreer=0;
    }
    temp.children[2].innerHTML=scoreer
    score=scoreer
}
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
function SurroundedMountains(){
    const highlight = gameBoard.querySelectorAll('[id=MT]');
    let out=0;
    for(let cell of highlight){
        let count=0;
        if(cell!=NaN){
            var neighbors = getNeighbors(cell.parentNode)
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(i==j || (i==0 && j==2) || (i==2 && j==0)){
                        continue;
                    }
                    if(neighbors[i*3+j]!=0){
                        if(neighbors[i*3+j].children[0].id!=''){
                            count++;
                        }
                    }
                }
            }
        }
        if(count>=4){
            out++;
        }
    }
    
    return out;
}
function getNeighbors(targetTd){
    var row = targetTd.parentNode;
    var rows = row.parentNode.children;
    var rowIndex = Array.prototype.indexOf.call(rows, row);
    var targetIndex = Array.prototype.indexOf.call(row.children, targetTd);
    var surroundingNeighbors = [0,0,0,0,0,0,0,0,0];
    var rowSub=rowIndex-1
    var colSub=targetIndex-1
    for (var i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (var j = targetIndex - 1; j <= targetIndex + 1; j++) {
            if (i >= 0 && i < rows.length && j >= 0 && j < row.children.length) {
                surroundingNeighbors[(i-rowSub)*3+(j-colSub)]=(rows[i].children[j]);
            }
        }
    }    
        return surroundingNeighbors
}
function hoverOver(e){
    if(!gameEnd){
        const tar = e.target
        var neighbors = getNeighbors(tar);
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(curShape[i][j]==1){
                    if(neighbors[i*3+j]!=0 && neighbors[i*3+j].children[0].children[0]==null){
                        neighbors[i*3+j].children[0].classList.add('highlighted')
                    }
                    else{
                        obstructed=true
                    }
                }
            }
        }
        if(obstructed){
            const highlight = document.getElementsByClassName('highlighted');
            for (let i = 0; i < highlight.length; i++) {
                highlight[i].classList.add('red')
            };
        }
    }
}
function hoverOut(e){
    const tar = e.target
    var neighbors = getNeighbors(tar);
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(curShape[i][j]==1){
                if(neighbors[i*3+j]!=0){
                    neighbors[i*3+j].children[0].classList.remove('highlighted')
                    if(obstructed){
                        neighbors[i*3+j].children[0].classList.remove('red')
                    }
                }
            }
        }
    }
    obstructed=false
}
function mouseClick(e){
    
    if(!obstructed && !gameEnd){
        const highlight = document.getElementsByClassName('highlighted');
        const something = [...highlight]
        for (let i = 0; i < something.length; i++) {
            something[i].outerHTML = pieceDict[curType]  
        };
        timeDilate();
        createPiece();
        obstructed=true;
    }
}
function rotateUpdate(e){
    let index = playerPiece.getAttribute('index');
    elements[index]['rotation'] = elements[index]['rotation']+1;
    if(elements[index]['rotation']>=4){
        elements[index]['rotation']=0;
    }
    createPiece(index);
}
function mirrorUpdate(e){
    let index = playerPiece.getAttribute('index');
    elements[index]['mirrored'] = !elements[index]['mirrored']
    createPiece(index);
}
init()