function doTheTable(grid) {
  const M = grid.length,
    N = grid[0].length;
  const labelGrid = grid.map((row) => row.map((a) => null));
  const labels = [];

  for (let i = 0; i < M * N; i++) {
    labels.push(i);
  }

  function union(x, y) {
    labels[labels[x]] = labels[y];
  }

  function merge(labelGridRow, endIndex, label, replaceWith) {
    for (let i = 0; i < endIndex; i++) {
      if (labelGridRow[i] === label) {
        labelGridRow[i] = replaceWith;
      }
    }
  }

  let tmpLabel = 0;
  let left, up;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j]) {
        up = grid[i - 1] !== undefined && grid[i - 1][j];
        left = grid[i][j - 1] !== undefined && grid[i][j - 1];

        if (!left && !up) {
          tmpLabel++;
          labelGrid[i][j] = tmpLabel;
        } else if (left && !up) {
          labelGrid[i][j] = labels[labelGrid[i][j - 1]];
        } else if (!left && up) {
          labelGrid[i][j] = labels[labelGrid[i - 1][j]];
        } else {
          union(labelGrid[i][j - 1], labelGrid[i - 1][j]);
          merge(labelGrid[i], j, tmpLabel, labels[labelGrid[i][j - 1]]);
          labelGrid[i][j] = labels[labelGrid[i][j - 1]];
        }
      }
    }
  }

  return labelGrid;
}

const grid = [
  [true, false, false, true, false, false],
  [false, true, true, true, true, false],
  [false, false, true, false, false, false],
  [true, true, false, true, true, false],
  [false, false, true, true, false, true],
  [false, false, false, false, true, true],
];

/*const grid = [
    [true, false, true, false, true, false],
    [false, true, false, true, false, true],
    [true, false, true, false, true, false],
    [false, true, false, true, false, true],
    [true, false, true, false, true, false],
    [false, true, false, true, false, true]
    ];*/

const afterGrid = doTheTable(grid);

const grid1 = document.getElementById("beforeTable");
grid1.style.width = grid[0].length * 50 + "px";
grid.map((row) => {
  const divRow = document.createElement("div");
  divRow.classList.add("row");
  row.map((col) => {
    const divCol = document.createElement("div");
    divCol.classList.add("col");
    if (col) {
      divCol.classList.add("painted");
    }
    divRow.appendChild(divCol);
  });
  grid1.appendChild(divRow);
});

const grid2 = document.getElementById("afterTable");
grid2.style.width = grid[0].length * 50 + "px";
afterGrid.map((row) => {
  const divRow = document.createElement("div");
  divRow.classList.add("row");
  row.map((col) => {
    const divCol = document.createElement("div");
    divCol.classList.add("col");
    if (col) {
      divCol.classList.add("color-" + col);
      divCol.innerText = col;
    }
    divRow.appendChild(divCol);
  });
  grid2.appendChild(divRow);
});
