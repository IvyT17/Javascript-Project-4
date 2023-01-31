gameOver = false;
counter = 0;
move1 = "x";
move2 = "o";
capture = 0;
player = "x";
computer = "o"; 
maxDepth = 10;

function initialize() // creates 9 cell tic tac toe board, restart button has event listener so it knows when to reset the game
{
    // get board
    let board = document.getElementById("board");

    // create 9 cells and add them to board
    for (let i = 1; i <= 9; i++) 
    {
    board.innerHTML += `<div class='cell' id='cell-${i}' data-cell>`; // replaces need for " " + var + " " 
    // directly puts var in string
    }

    // get elements with data-cell attribute
    cells = document.querySelectorAll('[data-cell]');

    // Loop through all cells
    for (let cell of cells)
    {
        // clear cell
        cell.innerHTML = " ";

        // add a listener for the cell
        cell.addEventListener("click", () => 
        {
            if (!gameOver) 
            {
                move(cell)
            }
        });
    }

    // add event listener for restart button
    document.getElementById("restart").addEventListener("click", function() 
    {
        // reset game
        move1 = "x";
        move2 = "o";
        gameOver = false;
        capture = 0;
        document.getElementById("winner").innerHTML = "";
        document.getElementById("move1").innerHTML = `Current move: ${move1}`;
        for (let cell of cells)
        {
            cell.innerHTML = " ";
        }
    });
    }

    function move(cell) // checks who is making the first move: player or computer
    {
    if (move1 === player) 
    {
        if (cell.innerHTML === capture) 
        {
            alert("Your opponent took over this cell!"); // player cannot choose computer's cell
        } 
        else if (cell.innerHTML === move1) 
        {
            cell.innerHTML = move1 + move1; 
            capture = cell;
            nextMove();
        } 
        else if (cell.innerHTML === move1 + move1) 
        {
            alert("This cell is already yours."); // player cannot choose a cell they already chose
        } 
        else if (cell.innerHTML === move2 + move2) 
        {
            alert("Your opponent locked that cell.") 
        } 
        else 
        {
            cell.innerHTML = move1;
            capture = cell;
            nextMove();
        }
        document.getElementById("move1").innerHTML = `Current move: ${move1}`;
        checkWin();
    } 
    else 
    {
        let move = getMove();
        if (cells[move].innerHTML === computer) 
        {
            cells[move].innerHTML = computer + computer;
        } 
        else 
        {
            cells[move].innerHTML = computer;
        }
        capture = cells[move];
        nextMove();
        checkWin();
    }
}

function switchPlayer() 
{
    if (move1 === "x") 
    {
        move1 = "o";
        move2 = "x";
    } 
    else 
    {
        move1 = "x";
        move2 = "o";
    }
}

function nextMove() 
{
    switchPlayer();
    if (move1 === computer && !gameOver) 
    {
        move();
    }
}

function getWinner() 
{
    emptyFlag = false;
    possibleWins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    for (let win of possibleWins) 
    {
        currentPlayer = cells[win[0] - 1].innerHTML[0];
        if (player != " ") 
        {
            if (cells[win[1] - 1].innerHTML[0] == cells[win[2] - 1].innerHTML[0]) 
            {
                if (cells[win[1] - 1].innerHTML == player) 
                {
                    return currentPlayer;
                }
            } 
            else 
            {
                if (cells[win[1] - 1] = " " || cells[win[2] - 1].innerHTML == " ")
                {
                    emptyFlag = true;
                }
            }
        }
        else
        {
            emptyFlag = true;
        }
    }
        if (!emptyFlag) 
        {
        return 1;
        }
    return NaN;
}

function checkWin() 
{
    let currentState = [];
    for (let i = 0; i < 9; i++) 
    {
        currentState.push(cells[i].innerHTML);
    }
    let winner = getWinner(currentState);

    if (winner) 
    {
        if (winner === player) 
        {
            document.getElementById("winner").innerHTML = "Congrats, you won!";
        } 
        else if (winner === computer) 
        {
            document.getElementById("winner").innerHTML = "Sorry, you lost.";
        } 
        else 
        {
            document.getElementById("winner").innerHTML = "Tie!";
        }
    }
}

function spacePossession(cellNumber) // checks whether or not a space on the board is taken
{
    let space = document.getElementById(`cell-${cellNumber}`);
    if (space.innerHTML == " ") 
    {
        return " ";
    } 
    else 
    {
        return space.innerHTML[0];
    }
}

function getMove() 
{ 
    return Math.floor(Math.random()*9);
}