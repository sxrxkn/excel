import {defaultStyles} from '../../constants'
import {toInlineStyles} from '../../core/utils'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function createCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
    <div class="cell" 
      contenteditable="true" 
      data-col='${col}'
      data-row='${row}' 
      data-id='${row}:${col}'
      data-type='cell'
      data-value="${data || ''}"
      style="${styles}; width: ${width}"
    >${parse(data) || ''}</div>`
  }
}

function createCol({col, index, width}) {
  return `
    <div class="column"
      data-type='resizable'
      data-col='${index}' 
      style="width: ${width}">
        ${col}
        <div class='col-resize' data-resize='col'></div>
    </div>
    `
}

function createRow(content, idex, state) {
  const resizer = idex ? `<div class='row-resize' data-resize='row'></div>` : ''
  const height = getHeight(state, idex)
  return `
    <div
      style="height: ${height}"
      class='row'
      data-type='resizable' 
      data-row="${idex}">
        <div class='row-info'>
        ${idex}
        ${resizer}
        </div>
            <div class='row-data'>
                ${content}
            </div>
    </div>
    `
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map((_, index) => {
        return String.fromCharCode(CODES.A + index)
      })
      .map(withWidthFrom(state))
      .map(createCol)
      .join('')

  rows.push(createRow(cols, '', {}))

  for (let row = 0; row < rowsCount + 1; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')
    rows.push(createRow(cells, row, state.rowState))
  }

  return rows.join('')
}
