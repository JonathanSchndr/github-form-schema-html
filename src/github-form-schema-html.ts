import yaml from 'js-yaml';

interface Options {
  ymlPath: string,
  selector: string;
}


interface Form {
  type: 'checkboxes' | 'dropdown' | 'input' | 'markdown' | 'textarea';
  id: string;
  attributes: {}[]
  validations: {}[]
}

export class GitHubFormSchemaHtml {
  options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  render() {
    fetch(this.options.ymlPath).then(res => res.text()).then(yml => {
      console.log(yml);
      yaml.load(yml) as Form;
    });
  }
}

// export class BlackGrid {
//   readonly wrapper: string
//   options: BlackGridOptions = {}

//   originalHeader?: Record<string, BlackGridHeaderItem>[];
//   originalData?: Array<BlackGridDataItem>;
//   config?: Record<string, boolean>;
//   searchGlobValue?: string;
//   searchColValues: Record<string, string> = {};
//   filterColValues: Record<string, unknown> = {};
//   sortColValue: BlackGridColSortValue = {};
//   currentePage: number = 0;
//   itemsPerPage: number = 10;
//   selectedItems: Record<string, unknown> = {};
//   translation?: BlackGridTranslations
//   ssr?: boolean

//   constructor(wrapper: string, options: BlackGridOptions = {}) {
//     this.wrapper = wrapper
//     this.options = options

//     this.options.responsive = this.options.responsive ?? {}
//     this.options.i18n = this.options.i18n ?? '/i18n/en_GB.yaml'
//     this.options.theme = this.options.theme ?? 'default'
//     this.options.dragable = this.options.dragable ?? true
//     this.options.hideable = this.options.hideable ?? true
//     this.options.sortable = this.options.sortable ?? true
//     this.options.reloadable = this.options.reloadable ?? true
//     this.options.multiselection = this.options.multiselection ?? false
//     this.options.details = this.options.details ?? { active: false, openNotEmptyDetails: false, hideLabel: false }
//     this.options.searchable = this.options.searchable ?? { global: true, columns: false }
//     this.options.navigation = this.options.navigation ?? { entries: true, pagination: true, itemsPerPage: 10, itemsPerPageDropdown: [25,50,75,100], maxPages: false }
//     this.options.config = this.options.config ?? undefined;
//     this.options.header = this.options.header ?? []
//     this.options.dataMeta = this.options.dataMeta ?? 'meta'
//     this.options.data = this.options.data ?? []
//     this.options.actions = this.options.actions ?? []
//     this.options.filters = this.options.filters ?? { selector: '#blackgrid-filter', showClear: false, items: [] }
//     this.options.onCreate = this.options.onCreate ?? (() => { })
//     this.options.onLoadBefore = this.options.onLoadBefore ?? (() => { })
//     this.options.onLoadAfter = this.options.onLoadAfter ?? ((_loadingTime) => { })
//     this.options.onReload = this.options.onReload ?? (() => { })
//     this.options.onReloadable = this.options.onReloadable ?? (() => { })
//     this.options.onDragging = this.options.onDragging ?? ((_oldIndex, _newIndex) => { })
//     this.options.onHidding = this.options.onHidding ?? ((_value, _column) => { })
//     this.options.onSorting = this.options.onSorting ?? ((_order, _column, _conditions, next: Function) => { next() })
//     this.options.onSearchingCol = this.options.onSearchingCol ?? ((_value, _column, _conditions, next: Function) => { next() })
//     this.options.onSearchingGlob = this.options.onSearchingGlob ?? ((_value, _conditions, next: Function) => { next() })
//     this.options.onPagination = this.options.onPagination ?? ((_currentPage, _newPage, _conditions, next: Function) => { next() })
//     this.options.onItemsPerPageDropdown = this.options.onItemsPerPageDropdown ?? ((_oldItems, _newItems, _conditions, next: Function) => { next() })
//     this.options.onCustomizable = this.options.onCustomizable ?? (() => { })
//     this.options.onCustomizableSave = this.options.onCustomizableSave ?? ((_config) => { })
//     this.options.onCustomizableClose = this.options.onCustomizableClose ?? (() => { })
//     this.options.onCustomizableClear = this.options.onCustomizableClear ?? (() => { })
//     this.options.onFilterable = this.options.onFilterable ?? ((_filter, _conditions, next: Function) => { next() })
//   }

//   /**
//    * Create Function
//    */

//   create() {
//     if (this.options.responsive && !(Object.keys(this.options.responsive).length === 0)) {
//       for (const responsiveKey in this.options.responsive) {
//         if (window.innerWidth <= Number(responsiveKey)) {
//           this.options = Object.assign(this.options, this.options.responsive[responsiveKey]);
//           break;
//         }
//       }

//       window.addEventListener('resize', () => {
//         for (const key in this.options.responsive) {
//           if (window.innerWidth <= Number(key)) {
//             window.location.reload()
//             break;
//           }
//         }
//       });
//     }

//     this.originalHeader = [...this.options.header ?? []]                        // recover header while dragging
//     this.originalData = [...this.options.data ?? []]                            // recover data while dragging, searching
//     this.config = this.options.config                                           // loaded config from local storage
//     this.searchGlobValue = undefined                                            // save the serachblob value
//     this.sortColValue = { index: undefined, type: undefined, key: undefined }   // save the sort index and sort type
//     this.currentePage = 1                                                       // current pagination page
//     this.itemsPerPage = this.options.navigation?.itemsPerPage ?? 10             // current item per page
//     this.selectedItems = {}                                                     // save selected items with multi select
//     this.ssr = false                                                            // disable pagination split, columns search, server search

//     if(this.options.onCreate) {
//       this.options.onCreate();
//     }

//     let loadingTime = 0
//     let loadingTimeInterval = setInterval(() => {
//       loadingTime += 0.01
//     }, 10);

//     let wrapperElement = document.querySelector(this.wrapper);

//     if (wrapperElement) {
//       wrapperElement.classList.add('blackgrid')
//       wrapperElement.classList.add('theme-' + this.options.theme)

//       if (this.options.i18n) {
//         fetch(this.options.i18n)
//           .then(response => response.text())
//           .then((data) => {
//             this.translation = yaml.load(data) as BlackGridTranslations;

//             if (this.options.onLoadBefore) {
//               this.options.onLoadBefore();
//             }

//             this.loadConfig()
//             this.loadHead()
//             this.loadBody()
//             this.loadTopHead()
//             this.loadNavigation()
//             this.loadFilter()

//             if (this.options.onLoadAfter) {
//               this.options.onLoadAfter(loadingTime)
//             }

//             clearInterval(loadingTimeInterval)
//           })
//       }
//     }
//   }

//   reload() {
//     if (this.options.onReload) {
//       this.options.onReload()
//     }

//     this.options.header = [...this.originalHeader ?? []]
//     this.options.data = [...this.originalData ?? []]
//     this.searchGlobValue = undefined;
//     this.searchColValues = {}
//     this.filterColValues = {}
//     this.sortColValue = { index: undefined, type: undefined, key: undefined }
//     this.currentePage = 1
//     this.selectedItems = {}
//     this.ssr = false

//     let loadingTime = 0
//     let loadingTimeInterval = setInterval(() => {
//       loadingTime += 0.01
//     }, 10);

//     if (this.options.onLoadBefore) {
//       this.options.onLoadBefore()
//     }

//     this.loadConfig()
//     this.loadHead()
//     this.loadBody()
//     this.loadTopHead()
//     this.loadNavigation()
//     this.loadFilter()

//     if (this.options.onLoadAfter) {
//       this.options.onLoadAfter(loadingTime)
//     }

//     clearInterval(loadingTimeInterval)
//   }

//   /**
//    * Main Functions
//    */

//   loadConfig() {
//     const storedConfig = window.localStorage.getItem(`blackgrid_config_${this.wrapper}`);

//     if (this.config) {
//       window.localStorage.setItem('blackgrid_config_' + this.wrapper, JSON.stringify(this.config));
//     } else if (storedConfig) {
//       this.config = JSON.parse(storedConfig);
//     }

//     if (this.config) {
//       let newHeader = {} as Record<string, BlackGridHeaderItem>;

//       if (this.originalHeader) {
//         for (const key in this.config) {
//           let item = this.originalHeader[0][key]
//           item.show = this.config[key]
//           newHeader[key] = item
//         }
//       }

//       this.options.header = [newHeader];

//       let newData = [] as Array<BlackGridDataItem>;
//       this.originalData?.forEach(data => {
//         let newItem = { ...data };
//         newData.push({...newItem})
//       });

//       this.options.data = newData
//     } else {
//       if (this.options.header && this.options.header.length > 0)
//         for (const key in this.options.header[0]) {
//           this.options.header[0][key].show = true
//         }
//     }
//   }

//   loadTopHead() {
//     let wrapperElement = document.querySelector(this.wrapper)

//     if (wrapperElement) {
//       let topHeadWrapper = document.createElement('aside')
//       let oldtopHeadWrapper = wrapperElement.previousSibling
//       if (oldtopHeadWrapper?.nodeName === 'ASIDE') oldtopHeadWrapper.parentNode?.removeChild(oldtopHeadWrapper)
//       topHeadWrapper.classList.add('blackgrid')
//       topHeadWrapper.classList.add('theme-' + this.options.theme)

//       let topHeadWrapperLeft = document.createElement('div')
//       let topHeadWrapperRight = document.createElement('div')

//       this.actionsGlob(topHeadWrapperLeft)
//       this.searchableGlob(topHeadWrapperRight)
//       this.reloadable(topHeadWrapperRight)
//       this.customizable(topHeadWrapperRight)

//       topHeadWrapper.appendChild(topHeadWrapperLeft)
//       topHeadWrapper.appendChild(topHeadWrapperRight)
//       wrapperElement.parentNode?.insertBefore(topHeadWrapper, wrapperElement)
//     }
//   }

//   loadHead() {
//     let wrapperElement = document.querySelector(this.wrapper) as HTMLTableElement
//     let oldHead = wrapperElement.getElementsByTagName('thead')[0]
//     if (oldHead !== undefined) wrapperElement.removeChild(oldHead)
//     let thead = wrapperElement.createTHead()
//     let row = thead.insertRow()

//     if (this.options.multiselection) {
//       this.selectedItems = {}

//       let th = document.createElement('th')
//       let input = document.createElement('input') as HTMLInputElement;
//       input.classList.add('toggle-multiselection')
//       input.type = 'checkbox'

//       input.addEventListener('change', (event: Event) => {
//         wrapperElement.querySelectorAll('input.multiselection').forEach(input => {
//           if(((event.target as HTMLInputElement).checked && !(input as HTMLInputElement).checked) || (!(event.target as HTMLInputElement).checked && (input as HTMLInputElement).checked)) {
//             (input as HTMLInputElement).click()
//           }
//         })
//       })

//       th.appendChild(input)
//       row.appendChild(th)
//     }

//     if (this.options.details?.active) {
//       let th = document.createElement('th')
//       let detail = document.createElement('i')
//       detail.classList.add('fas', 'fa-plus-circle')
//       th.appendChild(detail)
//       row.appendChild(th)
//     }

//     if (this.options.header) {
//       for (const key in this.options.header[0]) {
//         if (typeof this.options.header[0][key] !== 'undefined' && this.options.header[0][key].show) {
//           let th = document.createElement('th')
//           let text = document.createTextNode(this.options.header[0][key].label ?? '')
//           th.appendChild(text)
//           this.sortableCol(th, key)
//           row.appendChild(th)
//         }
//       }
//     }

//     if (this.options.actions?.length && this.options.actions.some((action) => { return action.location == 'row' })) {
//       let th = document.createElement('th')
//       let text = document.createTextNode(this.translation?.actions ?? 'NOTTRANSLATED_ACTIONS')
//       th.appendChild(text)
//       row.appendChild(th)
//     }
//   }

//   loadBody(showDetail: boolean = true) {
//     let wrapperElement = document.querySelector(this.wrapper) as HTMLTableElement;
//     let oldBody = wrapperElement.getElementsByTagName('tbody')[0]
//     if (oldBody !== undefined) wrapperElement.removeChild(oldBody)
//     let tBody = wrapperElement.createTBody()
//     this.searchableCol(tBody)
//     this.renderDataBodyRows(tBody)

//     if(showDetail && this.options.details?.active && this.options.details?.openNotEmptyDetails) {
//       tBody.querySelectorAll<HTMLLIElement>('i.detail-has-value').forEach(detail => {
//         detail.click()
//       })
//     }
//   }

//   loadNavigation(serverEntries: number | undefined = undefined, serverPagination: number | undefined = undefined) {
//     if (this.options.navigation?.entries || this.options.navigation?.itemsPerPageDropdown || this.options.navigation?.pagination) {
//       let wrapperElement = document.querySelector(this.wrapper)

//       if (wrapperElement) {
//         let oldNav = wrapperElement.nextSibling
//         if (oldNav?.nodeName === 'NAV') oldNav?.parentNode?.removeChild(oldNav)

//         let nav = document.createElement('nav')
//         nav.classList.add('blackgrid')
//         nav.classList.add('theme-' + this.options.theme)

//         if (this.options.navigation.itemsPerPageDropdown.length) {
//           let dropdown = document.createElement('select')
//           let alreadyAdded = false

//           let itemsPerPageDropdownSorted = this.options.navigation.itemsPerPageDropdown
//           itemsPerPageDropdownSorted.sort(function(a, b) {
//             return a - b;
//           });

//           for (const itemsPerPageValue of itemsPerPageDropdownSorted) {
//             if(this.options.navigation.itemsPerPage < itemsPerPageValue && !alreadyAdded) {
//               let newOption = document.createElement('option') as HTMLOptionElement;
//               newOption.selected = this.itemsPerPage === this.options.navigation.itemsPerPage ? true : false
//               newOption.value = this.options.navigation.itemsPerPage.toString()
//               newOption.innerHTML = this.options.navigation.itemsPerPage + ' ' + (this.translation?.perpage ?? 'NOTTRANSLATED_PERPAGE')
//               dropdown.appendChild(newOption);
//               alreadyAdded = true;
//             }

//             let newOption = document.createElement('option')
//             newOption.selected = this.itemsPerPage === itemsPerPageValue ? true : false
//             newOption.value = itemsPerPageValue.toString()
//             newOption.innerHTML = itemsPerPageValue + ' ' + (this.translation?.perpage ?? 'NOTTRANSLATED_PERPAGE')
//             dropdown.appendChild(newOption);
//           }

//           if(!alreadyAdded) {
//             let newOption = document.createElement('option')
//             newOption.selected = this.itemsPerPage === this.options.navigation.itemsPerPage ? true : false
//             newOption.value = this.options.navigation.itemsPerPage.toString()
//             newOption.innerHTML = this.options.navigation.itemsPerPage + ' ' + (this.translation?.perpage ?? 'NOTTRANSLATED_PERPAGE')
//             dropdown.appendChild(newOption);
//             alreadyAdded = true;
//           }

//           dropdown.addEventListener('change', (event: Event) => {

//             if (this.options.onItemsPerPageDropdown) {
//               this.itemsPerPage = parseInt((event.target as HTMLSelectElement).value)
//               let conditions = { searchGlobValue: this.searchGlobValue, searchColValues: this.searchColValues, filterColValues: this.filterColValues, sortColValue: this.sortColValue }
//               this.options.onItemsPerPageDropdown(this.itemsPerPage, parseInt((event.target as HTMLSelectElement).value), conditions, this.handleOnItemsPerPage.bind(this))
//             } else {
//               this.handleOnItemsPerPage();
//             }
//           })

//           nav.appendChild(dropdown)
//         }

//         if (this.options.navigation.entries) {
//           let amountEntries = this.options.data?.length
//           if (typeof this.options.navigation.entries === 'number') {
//             amountEntries = this.options.navigation.entries
//           }

//           if(serverEntries) {
//             amountEntries = serverEntries
//           }

//           let p = document.createElement('p')
//           let text = document.createTextNode(amountEntries + ' ' + (this.translation?.entries ?? 'NOTTRANSLATED_ENTRIES'))
//           p.appendChild(text)
//           nav.appendChild(p)
//         }

//         if (this.options.navigation.pagination) {
//           let amountPagination = Math.ceil((this.options.data?.length ?? 0) / (this.itemsPerPage ?? 10))
//           if (typeof this.options.navigation.pagination === 'number') {
//             amountPagination = this.options.navigation.pagination
//           }

//           if(serverPagination) {
//             amountPagination = serverPagination
//           }

//           let list = document.createElement('ul')

//           let item = document.createElement('li')
//           item.appendChild(document.createTextNode(String(this.currentePage)))
//           item.classList.add('item-' + this.currentePage)
//           item.classList.add('active')
//           list.appendChild(item)

//           for (let i = this.currentePage - 1; i >= this.currentePage - 2 && i >= 1; i--) {
//             let item = document.createElement('li')
//             item.appendChild(document.createTextNode(i.toString()))
//             item.classList.add('item-' + i)
//             item.addEventListener('click', () => {
//               this.switchPage(i)
//             })
//             list.prepend(item)
//           }

//           for (let i = this.currentePage + 1; i <= this.currentePage + 2 && i <= amountPagination; i++) {
//             let item = document.createElement('li')
//             item.appendChild(document.createTextNode(i.toString()))
//             item.classList.add('item-' + i)
//             item.addEventListener('click', () => {
//               this.switchPage(i)
//             })
//             list.append(item)
//           }

//           let itemLeft = document.createElement('li')
//           let buttonLeft = document.createElement('i')
//           buttonLeft.classList.add('fas', 'fa-caret-left')
//           itemLeft.addEventListener('click', () => {
//             if (this.currentePage > 1) {
//               this.switchPage(this.currentePage - 1)
//             }
//           })
//           itemLeft.appendChild(buttonLeft)
//           list.prepend(itemLeft)

//           let itemStart = document.createElement('li')
//           let buttonStart = document.createElement('i')
//           buttonStart.classList.add('fas', 'fa-step-backward')
//           itemStart.addEventListener('click', () => {
//             if (this.currentePage !== 1) {
//               this.switchPage(1)
//             }
//           })
//           itemStart.appendChild(buttonStart)
//           list.prepend(itemStart)

//           let itemRight = document.createElement('li')
//           let buttonRight = document.createElement('i')
//           buttonRight.classList.add('fas', 'fa-caret-right')
//           itemRight.addEventListener('click', () => {
//             if (this.currentePage < amountPagination) {
//               this.switchPage(this.currentePage + 1)
//             }
//           })
//           itemRight.appendChild(buttonRight)
//           list.append(itemRight)

//           let itemEnd = document.createElement('li')
//           let buttonEnd = document.createElement('i')
//           buttonEnd.classList.add('fas', 'fa-step-forward')
//           itemEnd.addEventListener('click', () => {
//             if (this.currentePage !== amountPagination) {
//               this.switchPage(amountPagination)
//             }
//           })
//           itemEnd.appendChild(buttonEnd)
//           list.append(itemEnd)

//           nav.appendChild(list)
//         }

//         wrapperElement.parentNode?.insertBefore(nav, wrapperElement.nextSibling)
//       }
//     }
//   }

//   handleOnItemsPerPage(data: Array<BlackGridDataItem> | undefined = undefined, server: { entries: number, pagination: number } | undefined = undefined) {
//     if (data) {
//       this.ssr = true
//       this.options.data = data
//       this.originalData = data
//     } else {
//       this.ssr = false
//     }

//     this.currentePage = 1
//     this.loadBody()
//     this.loadNavigation(server?.entries, server?.pagination)
//   }

//   loadFilter(clear = false) {
//     if (this.options.filters && this.options.filters.selector && this.options.filters.items?.length) {
//       let wrapperElement = document.querySelector(this.options.filters.selector);

//       if (wrapperElement) {
//         wrapperElement.classList.add('blackgrid')
//         wrapperElement.classList.add('theme-' + this.options.theme)
//         wrapperElement.innerHTML = ''
//         this.options.filters.items.forEach(item => {
//           if (item.show) {
//             let container = document.createElement('div')
//             container.classList.add('filter');
//             container.id = 'filter-' + item.key

//             let label = document.createElement('label')
//             label.htmlFor = item.key
//             label.innerHTML = item.label

//             let input : HTMLInputElement | HTMLSelectElement
//             if (item.input === 'dropdown') {
//               input = document.createElement('select')
//             } else {
//               input = document.createElement('input')
//               input.type = item.input
//             }

//             input.addEventListener('change', (event: Event) => {
//               const { target } = event

//               this.filterColValues[item.key] = { value: (target as HTMLInputElement | HTMLSelectElement).value, type: item.type }

//               if (this.options.onFilterable) {
//                 let conditions = { itemsPerPage: this.itemsPerPage, searchGlobValue: this.searchGlobValue, searchColValues: this.searchColValues, sortColValue: this.sortColValue }
//                 this.options.onFilterable(this.filterColValues, conditions, (data, server) => {
//                   if (data) {
//                     this.ssr = true
//                     this.options.data = data
//                     this.originalData = data
//                   }

//                   this.loadBody()
//                   this.loadNavigation(server?.entries, server?.pagination)
//                 })
//               }
//             })

//             if (item.input === 'dropdown') {
//               for (const option of item.options ?? []) {
//                 let newOption = document.createElement('option')

//                 if(item?.default && item?.default === option.value) {
//                   newOption.selected = true
//                   setTimeout(() => {
//                     input.dispatchEvent(new Event('change'))
//                   }, 0)
//                 }

//                 newOption.value = option.value;
//                 newOption.innerHTML = option.label;
//                 input.appendChild(newOption);
//               }
//             } else {
//               if(item?.default) {
//                 input.value = item?.default
//                 input.dispatchEvent(new Event('change'))
//               }
//             }

//             input.id = item.key

//             container.appendChild(label)
//             container.appendChild(input)
//             wrapperElement?.appendChild(container)
//           }
//         })

//         if(this.options.filters.showClear) {
//           let div = document.createElement('div')
//           div.className = 'filter-clear'

//           let clearButton = document.createElement('i')
//           clearButton.classList.add('fa-solid', 'fa-filter-circle-xmark')

//           clearButton.addEventListener('click', () => {
//             this.loadFilter(true)
//           })

//           div.appendChild(clearButton)
//           wrapperElement?.appendChild(div)
//         }

//         if(clear) {
//           console.log(this.filterColValues);
//           this.filterColValues = {}
//           console.log(this.filterColValues);

//           if (this.options.onFilterable) {
//             let conditions = { itemsPerPage: this.itemsPerPage, searchGlobValue: this.searchGlobValue, searchColValues: this.searchColValues, sortColValue: this.sortColValue }
//             this.options.onFilterable(this.filterColValues, conditions, (data, server) => {
//               if (data) {
//                 this.ssr = true
//                 this.options.data = data
//                 this.originalData = data
//               }

//               this.loadBody()
//               this.loadNavigation(server?.entries, server?.pagination)
//             })
//           }
//         }
//       }
//     }
//   }

//   /**
//    * Helper Functions
//    */

//   switchPage(index: number) {
//     if (this.options.onPagination) {
//       let conditions = { itemsPerPage: this.itemsPerPage, searchGlobValue: this.searchGlobValue, searchColValues: this.searchColValues, filterColValues: this.filterColValues, sortColValue: this.sortColValue }
//       this.options.onPagination(this.currentePage, index, conditions, (data, server) => {
//         if (data) {
//           this.ssr = true
//           this.options.data = data
//           this.originalData = data
//         } else {
//           this.ssr = false
//         }

//         this.currentePage = index
//         this.loadBody()
//         this.loadNavigation(server?.entries, server?.pagination)
//       })
//     }
//   }

//   actionsGlob(topHeadWrapperLeft: Element) {
//     if (this.options.actions && this.options.actions.length && this.options.actions.some((action) => { return action.location === 'head' })) {
//       this.options.actions.forEach((action) => {
//         if (action.location === 'head') {
//           let div = document.createElement('div')
//           let actionButton = document.createElement('i')
//           actionButton.className = action.icon;

//           if (action?.label) {
//             let span = document.createElement('span')
//             span.appendChild(document.createTextNode(action.label))
//             actionButton.appendChild(span)
//           }

//           if (action?.css) {
//             const cssCollection = action?.css;
//             for (const cssKey in cssCollection) {
//               actionButton.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//             }
//           }

//           if (action?.tooltip) {
//             tippy(actionButton, {
//               content: action?.tooltip
//             });
//           }

//           actionButton.addEventListener('click', () => {
//             action.handler(this.selectedItems)
//           })
//           div.appendChild(actionButton)
//           topHeadWrapperLeft.appendChild(div)
//         }
//       })
//     }
//   }

//   searchableGlob(topHeadWrapperRight: Element) {
//     if (this.options.searchable?.global) {
//       let div = document.createElement('div')
//       div.className = 'global-search'

//       let buttonRight = document.createElement('i')
//       buttonRight.classList.add('fas', 'fa-search')
//       div.appendChild(buttonRight)

//       let input = document.createElement('input')
//       input.className = 'input-search'
//       input.type = 'search'
//       input.placeholder = (this.translation?.search ?? 'NOTTRANSLATED_SEARCH');

//       const searchInput = (event: Event) => {
//         this.searchColValues = {};
//         this.searchGlobValue = (event.target as HTMLInputElement).value;

//         if (this.options.onSearchingGlob) {
//           let conditions = { itemsPerPage: this.itemsPerPage, searchColValues: this.searchColValues, filterColValues: this.filterColValues, sortColValue: this.sortColValue }
//           this.options.onSearchingGlob((event.target as HTMLInputElement).value, conditions, (data, server) => {
//             if (this.options.searchable?.columns) {
//               let searchInputs = document.querySelector(this.wrapper)?.querySelectorAll<HTMLInputElement>('input.input-search')
//               searchInputs?.forEach(input => {
//                 input.value = ''
//               })
//             }

//             if (data) {
//               this.ssr = true
//               this.options.data = data
//               this.originalData = data
//             } else {
//               this.ssr = false
//               this.options.data = this.originalData

//               let searchInput = (event.target as HTMLInputElement).value
//               let removeIndex = [] as number[];

//               if (searchInput !== '') {
//                 const currentHeader = this.options.header && this.options.header.length ? this.options.header[0] : undefined;

//                 this.options.data?.forEach((dataRow, index) => {
//                   let findString = false

//                   for (const key in dataRow) {
//                     if ((currentHeader && typeof currentHeader[key] === 'undefined') || (currentHeader && !currentHeader[key].show)) continue
//                     if (String(dataRow[key].value || '').toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) {
//                       findString = true
//                     }
//                   }

//                   if (!findString) {
//                     removeIndex.push(index)
//                   }
//                 })

//                 this.options.data = this.options.data?.filter((_value, index) => {
//                   return removeIndex.indexOf(index) == -1
//                 })
//               }
//             }

//             this.currentePage = 1
//             this.loadBody(false)
//             this.loadNavigation(server?.entries, server?.pagination)
//           })
//         }
//       }

//       input.addEventListener('keyup', searchInput)
//       input.addEventListener('search', searchInput)

//       div.appendChild(input)
//       topHeadWrapperRight.appendChild(div)
//     }
//   }

//   reloadable(topHeadWrapperRight: Element) {
//     if (this.options.reloadable) {
//       if (this.options.onReloadable) {
//         this.options.onReloadable();
//       }

//       let div = document.createElement('div')
//       div.className = 'global-reload'

//       let buttonRight = document.createElement('i')
//       buttonRight.classList.add('fas', 'fa-redo')

//       buttonRight.addEventListener('click', () => {
//         this.reload()
//       })

//       div.appendChild(buttonRight)

//       topHeadWrapperRight.appendChild(div)
//     }
//   }

//   customizable(topHeadWrapperRight: Element) {
//     if (this.options.dragable || this.options.hideable) {
//       let div = document.createElement('div')
//       div.className = 'global-customize'

//       let buttonRight = document.createElement('i')
//       buttonRight.classList.add('fas', 'fa-cog')

//       buttonRight.addEventListener('click', event => {
//         if (!(event.target as HTMLLIElement).parentNode?.querySelector('.global-customize-overlay')) {
//           if (this.options.onCustomizable) {
//             this.options.onCustomizable()
//           }

//           let overlay = document.createElement('div')
//           overlay.className = 'global-customize-overlay'

//           let list = document.createElement('ul')

//           const currentHeader = this.options.header && this.options.header.length ? this.options.header[0] : undefined;

//           if (currentHeader) {
//             for (const key in currentHeader) {
//               let item = document.createElement('li')
//               let i = document.createElement('i')
//               let checkbox = document.createElement('input')
//               let text = document.createTextNode(currentHeader[key].label ?? '')

//               i.classList.add('fas', 'fa-grip-vertical')
//               checkbox.type = 'checkbox'
//               checkbox.dataset.key = key

//               if (typeof currentHeader[key] !== 'undefined' && currentHeader[key].show) checkbox.checked = true
//               checkbox.addEventListener('click', event => {
//                 if (this.options.onHidding) {
//                   this.options.onHidding((event.target as HTMLInputElement).checked, (event.target as HTMLInputElement).dataset.key)
//                 }
//               })

//               if (this.options.dragable) item.appendChild(i)
//               if (this.options.hideable) item.appendChild(checkbox)
//               item.appendChild(text)
//               list.appendChild(item)
//             }
//           }

//           Sortable.create(list, {
//             handle: 'i',
//             animation: 150,
//             onEnd: (event) => {
//               if (this.options.onDragging) {
//                 this.options.onDragging(event.oldIndex, event.newIndex)
//               }
//             }
//           });

//           let actions = document.createElement('div')

//           let save = document.createElement('button')
//           save.appendChild(document.createTextNode(this.translation?.save ?? 'NOTTRANSLATED_SAVE'))
//           save.classList.add('save')
//           save.addEventListener('click', event => {
//             let customizableConfig = {} as Record<string, boolean>;
//             let inputs = (event.target as HTMLButtonElement).parentNode?.parentNode?.querySelectorAll('input')
//             inputs?.forEach((element) => {
//               if (element.dataset.key) {
//                 customizableConfig[element.dataset.key] = element.checked;
//               }
//             })

//             window.localStorage.setItem('blackgrid_config_' + this.wrapper, JSON.stringify(customizableConfig));
//             this.config = customizableConfig

//             if (this.options.onCustomizableSave) {
//               this.options.onCustomizableSave(customizableConfig);
//             }

//             this.reload()
//           })
//           actions.appendChild(save)

//           let close = document.createElement('button')
//           close.appendChild(document.createTextNode(this.translation?.close ?? "NOTTRANSLATED_CLOSE"));
//           close.classList.add('close')
//           close.addEventListener('click', () => {
//             if (this.options.onCustomizableClose) {
//               this.options.onCustomizableClose()
//             }

//             overlay.parentNode?.removeChild(overlay)
//           })
//           actions.appendChild(close)

//           let clear = document.createElement('button')
//           clear.appendChild(document.createTextNode(this.translation?.clear ?? "NOTTRANSLATED_CLEAR"));
//           clear.classList.add('clear')
//           clear.addEventListener('click', () => {
//             if (this.options.onCustomizableClear) {
//               this.options.onCustomizableClear()
//             }

//             this.config = undefined;
//             window.localStorage.removeItem('blackgrid_config_' + this.wrapper);
//             this.reload()
//           })
//           actions.appendChild(clear)

//           overlay.appendChild(list);
//           overlay.appendChild(actions);
//           (event.target as HTMLLIElement).parentNode?.appendChild(overlay)
//         } else {
//           const overlay = (event.target as HTMLLIElement).parentNode?.querySelector('.global-customize-overlay');
//           if (this.options.onCustomizableClose) {
//             this.options.onCustomizableClose()
//           }
//           overlay?.parentNode?.removeChild(overlay)
//         }
//       })

//       div.appendChild(buttonRight)
//       topHeadWrapperRight.appendChild(div)
//     }
//   }

//   searchableCol(tBody: HTMLTableSectionElement) {
//     if (this.options.searchable?.columns) {
//       let row = tBody.insertRow()
//       row.className = 'search'

//       if (this.options.multiselection) {
//         let td = row.insertCell()
//         row.appendChild(td)
//       }

//       if (this.options.details?.active) {
//         let td = row.insertCell()
//         row.appendChild(td)
//       }

//       const currentHeader = this.options.header && this.options.header.length ? this.options.header[0] : undefined;

//       if (currentHeader) {
//         for (const key in currentHeader) {
//           if (typeof currentHeader[key] === 'undefined' || !currentHeader[key].show) continue

//           let td = row.insertCell()

//           let buttonRight = document.createElement('i')
//           buttonRight.classList.add('fas', 'fa-search')
//           td.appendChild(buttonRight)

//           let input = document.createElement('input')
//           input.className = 'input-search'
//           input.type = 'search'
//           input.placeholder = this.translation?.search ?? "NOTTRANSLATED_SEARCH";
//           input.dataset.key = key

//           if (this.searchColValues[key] !== undefined)
//             input.value = this.searchColValues[input.dataset.key]


//           const searchInput = (event: Event) => {
//             this.searchGlobValue = undefined;

//             if (this.options.onSearchingCol) {
//               let conditions = { itemsPerPage: this.itemsPerPage, searchGlobValue: this.searchGlobValue, filterColValues: this.filterColValues, sortColValue: this.sortColValue }
//               this.options.onSearchingCol((event.target as HTMLInputElement).value, (event.target as HTMLInputElement).dataset.key, conditions, (data, server) => {
//                 if (data) {
//                   this.ssr = true
//                   this.options.data = data
//                   this.originalData = data
//                 } else {
//                   this.ssr = false
//                 }

//                 this.options.data = this.originalData

//                 const datasetKey = (event.target as HTMLInputElement).dataset.key;

//                 if (datasetKey) {
//                   this.searchColValues[datasetKey] = (event.target as HTMLInputElement).value
//                 }

//                 if (this.options.searchable?.global) {
//                   let searchInput = document.querySelector(this.wrapper)?.previousElementSibling?.querySelector<HTMLInputElement>('input.input-search');

//                   if (searchInput) {
//                     searchInput.value = '';
//                   }
//                 }

//                 let rows = tBody.rows
//                 for (let i = rows.length - 1; i > 0; i--) {
//                   rows[i].parentNode?.removeChild(rows[i])
//                 }

//                 let searchInputs = {} as Record<string, string>;
//                 document.querySelector(this.wrapper)?.querySelectorAll<HTMLInputElement>('input.input-search').forEach(searchinput => {
//                   if (searchinput.dataset.key) {
//                     searchInputs[searchinput.dataset.key] = searchinput.value;
//                   }
//                 })

//                 let removeIndex = [] as number[];

//                 const currentHeader = this.options.header && this.options.header.length ? this.options.header[0] : undefined;

//                 if (currentHeader) {
//                   this.options.data?.forEach((dataRow, index) => {
//                     let findString = []
//                     let searchActive = false

//                     for (const key in dataRow) {
//                       if (typeof currentHeader[key] === 'undefined' || !currentHeader[key].show) continue
//                       if (searchInputs[key] !== '' && String(dataRow[key].value || '').toLowerCase().indexOf(searchInputs[key].toLowerCase()) !== -1) {
//                         searchActive = true
//                         findString.push(true)
//                       } else if (searchInputs[key] !== '') {
//                         searchActive = true
//                         findString.push(false)
//                       }
//                     }

//                     if (!findString.every(e => e === true) && searchActive) {
//                       removeIndex.push(index)
//                     }
//                   })
//                 }

//                 this.options.data = this.options.data?.filter((_value, index) => {
//                   return removeIndex.indexOf(index) == -1
//                 })

//                 this.currentePage = 1
//                 this.renderDataBodyRows(tBody)
//                 this.loadNavigation(server?.entries, server?.pagination)
//               })
//             }
//           }

//           input.addEventListener('keyup', searchInput)
//           input.addEventListener('search', searchInput)

//           td.appendChild(input)
//           row.appendChild(td)
//         }
//       }

//       if (this.options.actions?.length && this.options.actions.some((action) => { return action.location == 'row' })) {
//         let td = row.insertCell()
//         row.appendChild(td)
//       }
//     }
//   }

//   sortableCol(th: Element, key: string) {
//     if (this.options.sortable) {
//       let sortButton = document.createElement('i')
//       sortButton.classList.add('fas', 'fa-sort')
//       sortButton.dataset.direction = ''

//       sortButton.addEventListener('click', (event) => {

//         document.querySelector(this.wrapper)?.querySelectorAll<HTMLLIElement>('th > i[data-direction]').forEach((element) => {
//           if (element !== event.target) {
//             element.classList.add('fas', 'fa-sort');
//             element.dataset.direction = ''
//           }
//         })

//         if ((event.target as HTMLLIElement).dataset.direction !== 'up') {
//           if (this.options.onSorting) {
//             let conditions = { itemsPerPage: this.itemsPerPage, searchGlobValue: this.searchGlobValue, searchColValues: this.searchColValues, filterColValues: this.filterColValues }
//             this.options.onSorting(key, 'asc', conditions, (data, server) => {
//               if (data) {
//                 this.ssr = true
//                 this.options.data = data
//                 this.originalData = data
//               } else {
//                 this.ssr = false
//               }

//               this.sortColValue.key = key;
//               this.sortColValue.type = 'asc';

//               (event.target as HTMLLIElement).dataset.direction = 'up';
//               (event.target as HTMLLIElement).className = '';
//               (event.target as HTMLLIElement).classList.add('fas', 'fa-sort-down');

//               this.options.data = this.options.data?.sort((a, b) => {
//                 return String(a[key].value || '').localeCompare(String(b[key].value), undefined, {
//                   numeric: true,
//                   sensitivity: 'base'
//                 })
//               })

//               this.loadNavigation(server?.entries, server?.pagination)
//             })
//           }
//         } else {
//           if (this.options.onSorting) {
//             let conditions = { itemsPerPage: this.itemsPerPage, searchGlobValue: this.searchGlobValue, searchColValues: this.searchColValues, filterColValues: this.filterColValues }
//             this.options.onSorting(key, 'desc', conditions, (data, server) => {
//               if (data) {
//                 this.ssr = true
//                 this.options.data = data
//                 this.originalData = data
//               } else {
//                 this.ssr = false
//               }

//               this.sortColValue.key = key;
//               this.sortColValue.type = 'desc';

//               (event.target as HTMLLIElement).dataset.direction = 'down';
//               (event.target as HTMLLIElement).className = '';
//               (event.target as HTMLLIElement).classList.add('fas', 'fa-sort-up');

//               this.options.data = this.options.data?.sort((a, b) => {
//                 return String(b[key].value || '').localeCompare(String(a[key].value), undefined, {
//                   numeric: true,
//                   sensitivity: 'base'
//                 })
//               })

//               this.loadNavigation(server?.entries, server?.pagination)
//             })
//           }
//         }

//         this.loadBody()
//       })
//       th.appendChild(sortButton)
//     }
//   }

//   renderDataBodyRows(tBody: HTMLTableSectionElement) {
//     let startItem = 1
//     let endItem = this.options.data?.length ?? 0;
//     if (this.options.navigation?.pagination && !this.ssr) {
//       endItem = this.currentePage * this.itemsPerPage
//       startItem = endItem - this.itemsPerPage + 1
//     }

//     this.options.data?.forEach((dataRow, index) => {
//       let itemIndex = index + 1
//       if (itemIndex >= startItem && itemIndex <= endItem) {
//         let row = tBody.insertRow()

//         if(itemIndex % 2 === 1) {
//           row.className = 'row-odd'
//         }

//         if (this.options.multiselection) {
//           const multiselectToggle = document.querySelector(this.wrapper)?.querySelector<HTMLInputElement>('th > input.toggle-multiselection');

//           if (multiselectToggle) {
//             multiselectToggle.checked = false;
//           }

//           this.selectedItems = {} as Record<string, unknown>;

//           let td = row.insertCell()

//           if(dataRow[this.options.dataMeta || '']?.css) {
//             const cssCollection = dataRow[this.options.dataMeta || '']?.css;
//             for (const cssKey in cssCollection) {
//               td.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//             }
//           }

//           let input = document.createElement('input')
//           input.classList.add('multiselection');
//           input.type = 'checkbox'
//           input.addEventListener('click', event => {
//             if((event.target as HTMLInputElement).checked) {
//               this.selectedItems[index] = dataRow
//             } else {
//               delete this.selectedItems[index]
//             }

//             if (this.options.onSelectionChanged) {
//               this.options.onSelectionChanged(this, this.selectedItems);
//             }
//           })
//           td.appendChild(input)
//           row.appendChild(td)
//         }

//         const currentHeader = this.options.header && this.options.header.length ? this.options.header[0] : undefined;

//         if (this.options.details?.active) {
//           let td = document.createElement('td')
//           let detail = document.createElement('i')
//           detail.classList.add('fas', 'fa-plus-circle')
//           detail.dataset.status = 'close'

//           if(dataRow[this.options.dataMeta || '']?.css) {
//             const cssCollection = dataRow[this.options.dataMeta || '']?.css;
//             for (const cssKey in cssCollection) {
//               td.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//             }
//           }

//           if (currentHeader) {
//             for (const key in currentHeader) {
//               if(typeof currentHeader[key] !== 'undefined' && !currentHeader[key].show && dataRow[key]?.value) {
//                 detail.classList.add('detail-has-value')
//               }
//             }
//           }

//           const toggleDetailRow = ({ target }: MouseEvent) => {
//             if (detail.dataset.status === 'close') {
//               detail.className = 'fas fa-minus-circle'
//               detail.dataset.status = 'open'
//               let tr = document.createElement('tr')
//               tr.className = ((target as HTMLLIElement).parentNode?.parentNode as HTMLElement)?.className;
//               tr.classList.add('detail')

//               let td = document.createElement('td')
//               let countColumns = 1
//               let ul = document.createElement('ul')

//               if (currentHeader) {
//                 for (const key in currentHeader) {
//                   if(typeof currentHeader[key] !== 'undefined' && currentHeader[key].show) {
//                     countColumns++
//                   } else {
//                     let li = document.createElement('li')
//                     let span = document.createElement('span')

//                     if (dataRow[key]?.css) {
//                       const cssCollection = dataRow[key]?.css;
//                       for (const cssKey in cssCollection) {
//                         span.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//                       }
//                     }
//                     if (dataRow[key]?.icon) {
//                       let icon = document.createElement('i');
//                       icon.className = dataRow[key].icon ?? '';
//                       span.appendChild(icon);
//                     }

//                     const valueString = String(dataRow[key]?.value ?? '');
//                     if (!dataRow[key]?.html) {
//                       let content = document.createTextNode(valueString)
//                       span.appendChild(content)
//                     } else {
//                       span.innerHTML = valueString;
//                     }

//                     if (dataRow[key]?.tooltip) {
//                       tippy(span, {
//                         content: dataRow[key].tooltip
//                       });
//                     }

//                     if(!this.options.details?.hideLabel) li.appendChild(document.createTextNode(currentHeader[key].label + ': '))
//                     li.appendChild(span)
//                     ul.appendChild(li)
//                   }
//                 }
//               }

//               if(!ul.hasChildNodes()) {
//                 let li = document.createElement('li')
//                 li.appendChild(document.createTextNode(this.translation?.empty ?? "NOTTRANSLATED_EMPTY"))
//                 ul.appendChild(li)
//               }

//               if (this.options.multiselection) {
//                 countColumns++
//               }

//               if (this.options.actions?.length && this.options.actions.some((action) => { return action.location === 'row' })) {
//                 countColumns++
//               }

//               td.colSpan = countColumns;
//               td.appendChild(ul);
//               tr.appendChild(td);

//               const insertTarget = (target as HTMLLIElement).parentNode?.parentNode;
//               if (insertTarget) {
//                 (target as HTMLLIElement).parentNode?.parentNode?.parentNode?.insertBefore(tr, insertTarget.nextSibling);
//               }
//             } else {
//               detail.className = 'fas fa-plus-circle';
//               detail.dataset.status = 'close';
//               (target as HTMLLIElement).parentNode?.parentNode?.nextSibling?.remove();
//             }
//           }


//           detail.addEventListener('click', (event: MouseEvent) => toggleDetailRow(event))
//           td.appendChild(detail)
//           row.appendChild(td)
//         }

//         for (const key in currentHeader) {
//           if (typeof currentHeader[key] !== 'undefined' && currentHeader[key].show) {
//             let td = row.insertCell()

//             if(dataRow[this.options.dataMeta || '']?.css) {
//               const cssCollection = dataRow[this.options.dataMeta || '']?.css;
//               for (const cssKey in cssCollection) {
//                 td.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//               }
//             }

//             if (dataRow[key]?.css) {
//               const cssCollection = dataRow[key]?.css;
//               for (const cssKey in cssCollection) {
//                 td.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//               }
//             }

//             let innerElement = document.createElement('span');

//             if (dataRow[key]?.icon) {
//               let icon = document.createElement('i');
//               icon.className = dataRow[key].icon ?? '';
//               innerElement.appendChild(icon);
//             }

//             const valueString = String(dataRow[key]?.value ?? '');
//             if (!dataRow[key]?.html) {
//               let content = document.createTextNode(valueString)
//               innerElement.appendChild(content)
//             } else {
//               innerElement.innerHTML = valueString;
//             }

//             if (dataRow[key]?.tooltip) {
//               tippy(innerElement, {
//                 content: dataRow[key].tooltip
//               });
//             }

//             td.appendChild(innerElement)
//             row.appendChild(td)
//           }
//         }

//         if (this.options.actions?.length && this.options.actions.some((action) => { return action.location === 'row' })) {
//           let td = row.insertCell()
//           td.className = 'actions'

//           if(dataRow[this.options.dataMeta || '']?.css) {
//             const cssCollection = dataRow[this.options.dataMeta || '']?.css;
//             for (const cssKey in cssCollection) {
//               td.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//             }
//           }

//           let actionContainer = document.createElement('div')
//           this.options.actions.forEach((action) => {
//             if (action.location === 'row') {
//               action.init(dataRow, () => {
//                 let actionButton = document.createElement('i')
//                 actionButton.className = action.icon

//                 if (action?.label) {
//                   let span = document.createElement('span')
//                   span.appendChild(document.createTextNode(action.label))
//                   actionButton.appendChild(span)
//                 }

//                 if (action?.css) {
//                   const cssCollection = action?.css;
//                   for (const cssKey in cssCollection) {
//                     actionButton.style.cssText += cssKey+':'+cssCollection[cssKey]+';'
//                   }
//                 }

//                 if (action?.tooltip) {
//                   tippy(actionButton, {
//                     content: action?.tooltip
//                   });
//                 }

//                 actionButton.addEventListener('click', () => action.handler(dataRow))
//                 actionContainer.appendChild(actionButton)
//               })
//             }
//           })
//           if (actionContainer.hasChildNodes()) {
//             td.appendChild(actionContainer)
//             row.appendChild(td)
//           }
//         }
//       }
//     })
//   }
// }
