import {$} from '@core/dom'

export function resizeHandler(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const resizeEl = $resizer.data.resize
    const coords = $parent.getCoords()
    const sideProp = resizeEl === 'col' ? 'height' : 'width'
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: 2000 + 'px'
    })

    const indexCol = $parent.data.col
    const currentCells = $root.
        findAll(`.cell[data-col="${indexCol}"]`)


    document.onmousemove = (e) => {
      if (resizeEl === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = (event) => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      })
      if (resizeEl === 'col') {
        $parent.css({width: value + 'px'})
        currentCells.forEach((cell) => {
          cell.style.width = value + 'px'
        })
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        resizeEl,
        id: $parent.data[resizeEl]
      })
    }
  })
}
