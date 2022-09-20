import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    this.prepare()
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Запускаем что-то до инициализации
  prepare() {

  }

  // Уведомляем слушателей о событии
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываем слушателей на событие
  $on(event, fn) {
    const unsubscriber = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscriber)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }


  // Приходят изменения по подпискам
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  delete() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((sub) => sub())
  }
}
