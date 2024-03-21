const resetTrigger = document.querySelector(".reset-grid")
const gridContainer = document.querySelector(".grid-ctns");

// Equivalent of jQuery $document.ready()
document.addEventListener("DOMContentLoaded", function() {
    populateGridCells(16)
});


function populateGridCells(ngrid) {
    gridContainer.innerHTML = ""

    for (let i = 0; i < ngrid; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        // Style the row using flexbox
        row.style.display = "flex";
        row.style.width = "100%";
        row.style.height = `calc(100% / ${ngrid})`;
        row.style.margin = 0;
        row.style.padding = 0;

        for (let j = 0; j < ngrid; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid");
            
            // Style the cell div
            cell.style.width = `calc(100% / ${ngrid})`;
            cell.style.width = "100%";
            cell.style.opacity = 0.25;
            
            // Append the cell div to the row
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }

    // Shade the grid cells interactively 
    let gridCells = document.querySelectorAll(".grid");
    gridCells.forEach(function(item) {
        item.addEventListener("mouseover", adjustCellColor);
    });

}

function adjustCellColor(event) {
    cell = event.target

    // Background Color
    cell.style.backgroundColor = "#343434";
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColour = "#";
    for (i = 0; i < 6; i++) {
        hexColour += hex[Math.floor(Math.random() * hex.length)];
    };
    let checkRadio = document.querySelector('input[name="col-scheme"]:checked');
    if (checkRadio.value === "rgb") {
        cell.style.backgroundColor = hexColour;
    }

    // Opacity
    let opacity = parseFloat(cell.style.opacity);
    if (opacity < 1) {
        opacity += 0.25;
        cell.style.opacity = opacity ;
    }
}

function resetGrid() {
    let ngrid = parseInt(prompt("Please enter a value between (0-100): "));
    if (isNaN(ngrid) || ngrid>100) {
        populateGridCells(16);
        alert("Please insert a valid integer between (0-100) !!")
        resetGrid()
    } else {
        populateGridCells(ngrid);
    };
}


resetTrigger.addEventListener("click", resetGrid);


