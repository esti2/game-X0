// Global vars
var color;
var colorP1;
var colorP2;

var arr;
var rowscols;

var name1;
var name2;
var leftCells;
var rows;
var cols;
var board;
var table;

var winX = 0;
var win0 = 0;

var sizeGame;

var rowNum;
var colNum;

var currentPlayer;
var player;

var myInterval;
var TimeToChangeTurn;
var submit=false;

window.addEventListener("load", setUp);
//btnSubmit.addEventListener("click",submit);

//setup
function setUp() {
    leftCells = 0;
    currentPlayer = "X";
    //xTurn = true;
    //btnSubmit.addEventListener("click",submit);
}

//submitPlayers
function submit() {
    submit=true;
    colorP1 = document.getElementById("colorPlayer1").value;
    colorP2 = document.getElementById("colorPlayer2").value;
    name1 = document.getElementById("namePlayer1").value;
    name2 = document.getElementById("namePlayer2").value;

    sizeGame = selRowNum.value * selRowNum.value;
    arr = new Array(selRowNum.value);
    for (var i = 0; i < selRowNum.value; i++) {
        arr[i] = new Array(selRowNum.value);
    }

    document.getElementById("player1").innerHTML = name1;
    document.getElementById("player1").style.border = "thick solid #F0A133";
    document.getElementById("player2").innerHTML = name2;

    greeting();
    Timer();
    TimeToChangeTurn = 10000 + 100;
}

//greeting
function greeting() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours()
    var time = currentHours + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

    if (currentHours >= 6 && currentHours < 12)
        document.getElementById("greeting").innerHTML = ("Good Morning " + name1 + " and " + name2 + " its " + time + " AM");
    else if (currentHours >= 12 && currentHours < 17)
        document.getElementById("greeting").innerHTML = ("Good Afternoon " + name1 + " and " + name2 + " its " + time + " PM");
    else if (currentHours >= 17 && currentHours < 00)
        document.getElementById("greeting").innerHTML = ("Good Evening " + name1 + " and " + name2 + " its " + time + " PM");
    else
        document.getElementById("greeting").innerHTML = ("Good Night " + name1 + " and " + name2 + " its " + time + " AM");
    document.getElementById("turn").innerHTML = "turn - " + name1;
    document.getElementById("time").innerHTML = 10;
}

function checkWin(x, y) {
    checkRow(x, y);
    checkCol(x, y);
    checkDiagR(x, y);
    // checkDiagL(x, y);
}

function checkCol(x, y) {
    var count = 0;
    player = arr[x][y];

    for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
    {
        count = 0;
        for (m = v; m < 4 + v; m++) {
            if (arr[m][y] == player) {
                count++;
                if (x == m)
                    var check = true;
                if (count == 1)
                    var temp = m;
                else if (count == 4 && check) {
                    alert("win col " + player);
                    if (player == "X")
                        winX++;
                    else
                        win0++;
                    for (i = temp; i <= m; i++) {
                        document.getElementById("myTable").rows[i].cells[y].style.backgroundColor = "000000";
                        document.getElementById("myTable").rows[i].cells[y].style.color = "#ffffff";
                    }
                }
            }
            else
                m = 4 + v;
        }
        /* if (count == 4 && check) {
             alert("win col " + player);
             if (player == "X")
                 winX++;
             else
                 win0++;
         }*/
    }
}

function checkRow(x, y) {
    var count = 0;
    player = arr[x][y];

    for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
    {
        count = 0;
        for (m = v; m < 4 + v; m++) {
            if (arr[x][m] == player) {
                count++;
                if (x == m)
                    var check = true;
                if (count == 1)
                    var temp = m;
                else if (count == 4 && check) {
                    alert("win row " + player);
                    if (player == "X")
                        winX++;
                    else
                        win0++;
                    for (i = temp; i <= m; i++) {
                        document.getElementById("myTable").rows[x].cells[i].style.backgroundColor = "000000";
                        document.getElementById("myTable").rows[x].cells[i].style.color = "#ffffff";
                    }
                }
            }
            else {
                m = 4 + v;
                check = false;
                // v= (selRowNum.value % 4) + 1         
            }
        }
    }
}

function checkDiagR(x, y) {
    var count = 0;
    player = arr[x][y];

    if (x == y) {
        for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
        {
            count = 0;
            for (m = v; m < v + 4; m++) {
                if (arr[m][m] == player) {
                    count++;
                }
                else
                    m = 4 + v;
            }
            if (count == 4) {
                alert("win diagR up" + player);
                if (player == "X")
                    winX++;
                else
                    win0++;
            }
        }
    }
    else if (x > y) {
        for (v = 0; v < 4 - (parseInt(x) - parseInt(y)); v++)// num rizot
        {
            count = 0;
            // for (m = x % 4 - (x - y) + 1; m < v + 4; m++) {
            for (m = v; m < v + 4; m++) {
                if (m >= x || m < 0 || m + (parseInt(x) - parseInt(y)) >= selRowNum.value - 1)
                    break;
                if (arr[m + (parseInt(x) - parseInt(y))][m] == player) {
                    count++;
                }
                else
                    m = v + 4;
            }
            if (count == 4) {
                alert("win diagR down" + player);
                if (player == "X")
                    winX++;
                else
                    win0++;
            }
        }
    }

    else {//y>x
        for (v = 0; v < 4 - (parseInt(y) - parseInt(x)); v++)// num rizot
        {
            count = 0;
            for (m = v; m < v + 4; m++) {
                if (m >= x || m < 0 || m + (parseInt(x) - parseInt(y)) >= selRowNum.value - 1)
                    break;
                if (arr[m][m + (parseInt(y) - parseInt(x))] == player) {
                    count++;
                }
                else
                    m = v + 4;
            }
            if (count == 4) {
                alert("win vhvj" + player);
                if (player == "X")
                    winX++;
                else
                    win0++;
            }
        }
    }
}

function endGame() {

    if ((leftCells == sizeGame)) {
        alert("gameOver");
        if (win0 == 0 && winX == 0 || winX == win0)
            alert("not win");
        else if (win0 == 0 || winX > win0)
            alert("The winner is X " + winX)
        else
            alert("The winner is 0 " + win0)
    }
}

function buildBoard() {
    rows = document.getElementById("selRowNum").value;
    cols = document.getElementById("selRowNum").value;
    board = document.getElementById("board");

    //clear board
    if (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }
    //create new table
    table = document.createElement("table");
    table.setAttribute("id", "myTable");
    board.appendChild(table);
    //add rows and columns

    for (rowNum = 0; rowNum < rows; rowNum++) {
        var row = document.createElement("tr");
        table.appendChild(row);
        for (colNum = 0; colNum < rows; colNum++) {
            var cell = document.createElement("td");
            cell.locRow = rowNum;
            cell.locCol = colNum;
            row.appendChild(cell);
            cell.innerHTML = rowNum + "," + colNum;
            cell.onclick = function () {
                play()
            };
        }
    }
}


//document.getElementById("myDiv").style.border = "thick solid #0000FF";
function play() {
    if(document.getElementById("namePlayer1").value=="" || document.getElementById("namePlayer2").value=="" || submit==false)
    {
    alert("You must register your name and click submit");

    }
    var cell = event.srcElement;
    if (cell.innerHTML != "O" && cell.innerHTML != "X") {
        if (currentPlayer == "X") {
            arr[cell.locRow][cell.locCol] = currentPlayer;
            cell.innerHTML = currentPlayer;
            color = colorP1;
            currentPlayer = "O";
            document.getElementById("player2").style.border = "thick solid #F0A133";
            document.getElementById("player1").style.border = "none";
            document.getElementById("turn").innerHTML = ("turn - " + name2 + " 0");
        }
        else {
            arr[cell.locRow][cell.locCol] = currentPlayer;
            cell.innerHTML = currentPlayer;
            document.getElementById("player1").style.border = "thick solid #F0A133";
            document.getElementById("player2").style.border = "none";
            currentPlayer = "X";
            color = colorP2;
            document.getElementById("turn").innerHTML = ("turn - " + name1 + " X");
        }
        TimeToChangeTurn = 10000 + 100;
        document.getElementById("myTable").rows[cell.locRow].cells[cell.locCol].style.backgroundColor = color;
        //cell.style.color = color;
        leftCells++;
        checkWin(cell.locRow, cell.locCol);
        endGame();
    }
}

function restart() {
    sizeGame = 0;
    leftCells = 0;
    winX = 0;
    winY = 0;

    for (var q = 0; q < arr.length; q++) {
        for (var x = 0; x < arr.length; x++) {
            arr[q][x] = "";
            document.getElementById("myTable").rows[q].cells[x].innerHTML = "";
            document.getElementById('myTable').rows[q].cells[x].style.removeProperty("background-color");
            window.clearInterval(myInterval);
        }
    }
}
function Timer() {
    //document.getElementById("time").style.visibility = "visible";
    myInterval = setInterval(function () {
        TimeToChangeTurn -= 1000;
        var seconds = Math.floor(TimeToChangeTurn / 1000);
        if (currentPlayer == 'X') {
            document.getElementById("time").innerHTML = currentPlayer + "'s Turn <br>"
                + seconds + " seconds remaining";
        }
        else {
            document.getElementById("time").innerHTML = currentPlayer + "'s Turn <br>"
                + seconds + " seconds remaining";
        }

        if (seconds <= 3) {
            document.getElementById("time").style.color = "red";
            document.getElementById("time").style.size = "10";
        }
        else
            document.getElementById("time").style.color = "white";
        if (TimeToChangeTurn == 0 || TimeToChangeTurn == 100) {
            TimeToChangeTurn = 10000;
            if (currentPlayer == "X") {
                document.getElementById("player2").style.border = "thick solid #F0A133";
                document.getElementById("player1").style.border = "none";
                currentPlayer = "O";
            }
            else {
                document.getElementById("player1").style.border = "thick solid #F0A133";
                document.getElementById("player2").style.border = "none";
                currentPlayer = "X";
                document.getElementById("turn").innerHTML = ("turn - " + currentPlayer);
            }
        }
    }
        , 1000)
}
