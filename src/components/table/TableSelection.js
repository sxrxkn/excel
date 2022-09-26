export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  // $el is instanceof DOM
  select($el) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach(($cell) => {
      $cell.removeClass(TableSelection.className)
    })
    this.group = []
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id())
  }

  selectGroup($cells) {
    this.clear()
    this.group = $cells
    $cells.forEach((elOfDOM) => elOfDOM.addClass(TableSelection.className))
  }

  selectCtrl($el) {
    this.group.push($el)
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style))
  }
}
