const CODES = {
  A: 65,
  Z: 90
}


function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
    `
}

function createCol(el) {
  return `
    <div class="column">
        ${el}
    </div>
    `
}

function createRow(content, info = '') {
  return `
    <div class='row'>
        <div class='row-info'>${info}</div>
            <div class='row-data'>
                ${content}
            </div>
    </div>
    `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map((_, index) => {
        return String.fromCharCode(CODES.A + index)
      })
      .map(createCol)
      .join('')

  rows.push(createRow(cols))

  console.log(rows.join(''))

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
