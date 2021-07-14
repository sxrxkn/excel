const CODES = {
  A: 65,
  Z: 90
}


function createCell(_, index) {
  return `
    <div class="cell" contenteditable="true" data-col='${index}'></div>
    `
}

function createCol(el, index) {
  return `
    <div class="column" data-type='resizable' data-col='${index}'>
        ${el}
        <div class='col-resize' data-resize='col'></div>
    </div>
    `
}

function createRow(content, info = '') {
  const resizer = info ? `<div class='row-resize' data-resize='row'></div>` : ''
  return `
    <div class='row' data-type='resizable'>
        <div class='row-info'>
        ${info}
        ${resizer}
        </div>
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

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
