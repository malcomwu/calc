const { concat } = []

module.exports.flatten = arr => concat.apply([], arr)
module.exports.repeat = (rep, num) => new Array(num + 1).join(rep)
module.exports.lastItem = arr => arr[arr.length - 1]
module.exports.min = arr => Math.min.apply(null, arr)
module.exports.max = arr => Math.max.apply(null, arr)
module.exports.sum = arr => arr.reduce((a, b) => a + b)

module.exports.toCamel = hyphenedName => {
  const words = hyphenedName.split('-')
  const first = words.shift()
  return [first]
    .concat(words.map(word => word[0].toUpperCase() + word.substr(1))).join('')
}

module.exports.toCapitalCamel = hyphenedName => {
  const words = hyphenedName.split('-')
  return words.map(word => word[0].toUpperCase() + word.substr(1)).join('')
}

module.exports.precision = (val, digits) => {
  val = +val
  const prec = val.toPrecision(digits)
  return Math.abs(val) > 1e6 ? prec : '' + (+prec)
}

// Range with begin inclusive and end exclusive.
module.exports.range = (begin, end) => {
  if (end === undefined) { end = begin; begin = 0 }
  const result = []
  for (let i = begin; i < end; i++) result.push(i)
  return result
}

module.exports.zeros = num => {
  const result = []
  for (let i = 0; i < num; i++) result.push(0)
  return result
}

module.exports.arrayToSet = arr => {
  const result = {}
  arr.forEach(name => { result[name] = true })
  return result
}

module.exports.forEachRight = (arr, cb) => {
  for (let i = arr.length - 1; i >= 0; i--) cb(arr[i], i)
}

module.exports.findIndexRight = (arr, cb) => {
  for (let i = arr.length - 1; i >= 0; i--) { if (cb(arr[i], i)) return i }
}

module.exports.setToArray = set => Object.keys(set)

module.exports.unique = arr => setToArray(arrayToSet(arr))

module.exports.swapObject = obj => {
  const result = {}
  for (let key in obj) result[obj[key]] = key
  return result
}

const { slice } = []
function makeToJSON() {
  const list = ['name'].concat(slice.apply(arguments))
  return function () {
    const result = {}
    list.forEach(key => { result[key] = this[key] })
    return result
  }
}
module.exports.makeToJSON = makeToJSON

const el = (name, attrs, content) => {
  const elm = document.createElementNS('http://www.w3.org/2000/svg', name)
  for (let aname in attrs) elm.setAttribute(aname, attrs[aname])
  if (content.appendChild) { elm.appendChild(content) }
  else { elm.textContent = content }
  return elm
}
let txt
const cache = {}
const getText = () => {
  if (txt) return txt
  txt = el('text', { x: 0, y: 50 }, '')
  const svg = el('svg', { width: 0, height: 0 }, txt)
  document.body.appendChild(svg)
  return txt
}
module.exports.getSize = (font, content) => {
  const key = font + content
  if (cache[key]) return cache[key]
  getText()
  const style = `font-family: ${font.family}; font-size: ${font.size}`
  txt.setAttribute('style', style)
  txt.textContent = content
  const { width, height } = txt.getBBox()
  const result = { width, height }
  cache[key] = result
  return result
}

module.exports.loadText = (url, onsuccess) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) onsuccess(xhr.responseText)
    }
  }
  xhr.open('GET', url, true)
  xhr.send(null)
}
