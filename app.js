const board = document.getElementById("gameboard");
const turnStatus = document.getElementById("turn");
const errorMsg = document.getElementById("error");
const restart = document.getElementById("button");
//const fieldSize = 100;
let box = new Array; //Vakjes in het bord
let whitepieces = []; //Witte stukken
let blackpieces = [];
let currentPc; //Huidig aangeklikte stuk
let selectBox; //selecteer vakje
let curPlayer = null;
let whitePl = "white";
let blackPl = "black";
//let pcSelected = false;


function main()
{
    
    create_pieces();//Before board
    create_board();

    //place_pieces();
    setPlayer();

    restart.innerHTML = "restart";
    restart.addEventListener("click", reset);

    //setInterval(clearStat, 5000)

/*
if box -11 of -9 hasChild
removeChild
*/
}

function reset()
{
    while (board.firstChild)
    {
        board.removeChild(board.lastChild);
    }
    main()
}

function clickPiece(pieceEvent)
{
    console.log(curPlayer);
    currentPc = pieceEvent.target;
    if (!currentPc.classList.contains(curPlayer))
    {
        errorMsg.innerHTML = "Not your piece!"
        currentPc = 0;
        return 1;
    }

    console.log(currentPc.id);
}


function clickBox(boxEvent) 
{
    selectBox = boxEvent.target;
    if (currentPc && selectBox != currentPc)
    {
        if (selectBox.classList.contains("whiteBox"))
        {
            errorMsg.innerHTML = "Wrong move"
            return 1;
        }
        selectBox.appendChild(currentPc);
        setPlayer();
        checkCapture();
        
        console.log(curPlayer);
    } 
}

function checkCapture()
{
    let x = currentPc.parentNode.id;
    console.log(x);

    /*
    let piece = box[x-9].childNodes[1];
    if (piece && !piece.classList.contains(curPlayer))
    {
        box[x-9].removeChild(piece);
    }
    else
    {
        currentPc = 0;
        setPlayer();
    }*/
    currentPc = 0;
}
 

function setPlayer()
{
    if (curPlayer == whitePl)
    {
        curPlayer = blackPl;
    }
    else
    {
        curPlayer = whitePl;
    }
    turnStatus.innerHTML = `It is ${curPlayer}'s turn`;
    clearStat();
}

function clearStat()
{
    errorMsg.innerHTML = ``;
}

function create_pieces()
{
    for (let i = 0; i < 20; i++) 
    {
        whitepieces[i] = document.createElement("p");
        whitepieces[i].classList.add("white");
        whitepieces[i].addEventListener("click", clickPiece);
        whitepieces[i].id = `wP_${i}`;
    }

    for (let i = 0; i < 20; i++) 
    {
        blackpieces[i] = document.createElement("p");
        blackpieces[i].classList.add("black");
        blackpieces[i].addEventListener("click", clickPiece);
        blackpieces[i].id = `bP_${i}`;
    }  
}

function create_board()
{
    let w = 0;
    let b = 0;//Init counter for pieces;
    for (let i = 0; i < 10; i++)
    {
        let j = 0;
        box[i] = [j];//Create double array
        for (j; j <10; j++)
        {
            box[i][j] = document.createElement("div");
            box[i][j].id = `R${i} C${j}`;
            box[i][j].classList.add("box");
            board.appendChild(box[i][j]);

            //box[i][j].innerHTML = box[i][j].id;//Set text in square

            /*Add colors to the square: Even row, even column is white
            and odd row, odd column is white*/
            if (i % 2 == 0 && j % 2 == 0)
            {
                box[i][j].classList.add("whiteBox");
                box[i][j].addEventListener("click", clickBox);

            }
            else if (i % 2 == 1 && j % 2 == 1)
            {
                box[i][j].classList.add("whiteBox");
                box[i][j].addEventListener("click", clickBox);
            }
            else
            {
                box[i][j].classList.add("blackBox");
                box[i][j].addEventListener("click", clickBox);

                //Place pieces:
                if (i < 3)
                {
                    box[i][j].appendChild(whitepieces[w]);
                    w++;
                }
                if (i > 6)
                {
                    box[i][j].appendChild(blackpieces[b]);
                    b++;
                }   
            }
        }
    }
}



main();

    /*
12-06 2023: 3 uur, maken van bord, met afwisselend witte en zwarte vlakjes, en een idee voor het maken van stukken.
23-06 3 uur, werken aan creeeren en plaatsen van stukken, het verplaatsen van stukken
24-06 3 uur, verhelpen bug met appendchild eerste stappen in mogenlijkheid slaan van stukken, 
stukken kunnen elkaar slaan, maar niet van eigen kleur
27-06 1 uur, maken van restart functie etc.
30-06 2 uur, herschrijven in een 2D array, mogelijk makkelijker voor spel. loop voor kleuren
om en om is beter design. lukt nog niet om stukken te plaatsen.
01-07 1 uur  plaatsen stukken is gelukt. nu nieuwe functie schrijven die slaan mogelijk maakt
    */