import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {tableResize} from './table.resize';
import {isCell, shouldResize, nextSelector, matrix} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'keydown', 'input'],
      ...options
    })
  }


  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.ctrlKey) {
        this.selection.selectCtrl($target)
      } else if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => {
              return this.$root.find(`[data-id="${id}"]`)
            })
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onMouseup(event) {
    if (isCell(event)) {
      this.$emit('table:click', $(event.target))
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight'
    ]

    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
