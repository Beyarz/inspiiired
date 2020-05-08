class Random
  constructor: (@max) ->
  create: ->
    Math.floor(Math.random() * @max)

app = document.getElementById 'app'
history = document.getElementById 'history-previewer'

SPACEBAR = 32
allowRegeneration = 1
maxColumnLimit = 4
firstNode = 0
revertedOnce = 0

int = new Random 100
hex = new Random 16
hexLength = new Random 2

currentStyle = null
previousStyle = null

generateColumn = (color) ->
  column = document.createElement('div')
  column.className = 'column button is-small'
  column.setAttribute 'onclick', "revertSuggestion(`#{color}`)"
  column.style.background = color
  column.style.border = 'none'
  return column

injectColumn = (object) ->
  history.appendChild(object)
  if (history.childElementCount > maxColumnLimit)
    history
      .childNodes[firstNode]
      .remove()

appendHistory = (color) ->
  # Ignore empty generated column during initial start
  # & excluse listing previous suggestions
  if (color == null || revertedOnce == 1)
    revertedOnce = 0
    return false
  else
    newColumn = generateColumn(color)
    injectColumn(newColumn)

assembleHex = ->
  if hexLength.create() == 0
    randLength = 3
  else
    randLength = 6

  hexString = '#'
  hexArray = ['A', 'B', 'C', 'D', 'E', 'F']

  for x in [1..randLength]
    hexValue = hex.create()
    if hexValue > 9 then hexString += hexArray[hexValue - 10]
    else hexString += hexValue

  return hexString

presentColor = (id, color) ->
  document.getElementById(id).innerText = color

allowCopy = (id) ->
  document.getElementById(id).setAttribute 'class', 'displayValue'
  document.getElementById(id).setAttribute 'onclick', 'togglePopup()'

injectNewBackground = ->
  _from = assembleHex()
  _to = assembleHex()

  presentColor('from', _from)
  presentColor('to', _to)

  previousStyle = currentStyle
  appendHistory(previousStyle)

  currentStyle = "linear-gradient(#{int.create()}deg, #{_from}, #{_to})"
  app.style.background = currentStyle

@revertSuggestion = (background) ->
  currentStyle = background
  parsedBackground = background.replace('linear-gradient', '').replace(/\(|\)/g, '').split(',')
  _from = parsedBackground[1]
  _to = parsedBackground[2]

  presentColor('from', _from)
  presentColor('to', _to)
  presentColor('popupContent', "background: #{currentStyle};")

  app.style.background = currentStyle
  document.getElementById('copyColorValue').setAttribute 'data-clipboard-text', "background: #{currentStyle};"
  revertedOnce = 1

@togglePopup = ->
  document.getElementById('popup').classList.toggle 'is-active'
  presentColor('popupContent', "background: #{currentStyle};")
  document.getElementById('copyColorValue').setAttribute 'data-clipboard-text', "background: #{currentStyle};"

  # Do not let the user trigger newBackground() if the popup is displayed
  if allowRegeneration == 0 then allowRegeneration = 1 else allowRegeneration = 0

displayGuide = ->
  presentColor('from', 'Hit space')
  presentColor('to', 'to generate a new color')

injectNewBackground()
displayGuide()

document.onkeydown = (key) ->
  if key.keyCode == SPACEBAR && allowRegeneration == 1
    injectNewBackground()
    allowCopy('copyArea')
