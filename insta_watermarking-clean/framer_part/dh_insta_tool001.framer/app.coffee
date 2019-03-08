# Use desktop cursor
document.body.style.cursor = "auto"

Framer.Device.contentScale = 0.8

{InputLayer} = require "input"
{Firebase} = require 'firebase'
firebase = new Firebase
	projectID: "your-app"
	secret: "XXXXXXXXXXXXXX"
	
# firebase.get "/lineup-proto/content", (content) ->
# 	items = _.toArray(content)

button = new Layer
button.onClick ->
	firebase.put("/label", {"mainLabel": "DH_mood_00012"})
	firebase.put("/imageURL", {"mainImage": "https://www.saturdaysnyc.com/__data/m21821rt01-dusty_amber_01.1.jpg"})
	
button.visible = false

input = new InputLayer
	text: "http://..."

input.x = 50 - 8
input.y = 273
input.width = 473
input.backgroundColor = null
input.fontSize = 32
input.focusColor = "white"
input.height = srcInput.height

inputScale = new InputLayer
	text: "Value 0 - 1"
	parent: scaleInput

inputScale.x = 0
inputScale.y = 0
inputScale.width = scaleInput.width
inputScale.backgroundColor = null
inputScale.fontSize = 32
inputScale.focusColor = "white"
inputScale.height = scaleInput.height

inputLabel = new InputLayer
	text: "DH_mood_xxxxx"
	parent: labelInput

inputLabel.x = 0
inputLabel.y = 0
inputLabel.width = inputLabel.width
inputLabel.backgroundColor = null
inputLabel.fontSize = 32
inputLabel.focusColor = "white"
inputLabel.height = scaleInput.height

inputColor = new InputLayer
	text: "HEX Value"
	parent: bgcolorInput

inputColor.x = 0
inputColor.y = 0
inputColor.width = inputColor.width
inputColor.backgroundColor = null
inputColor.fontSize = 32
inputColor.focusColor = "white"
inputColor.height = scaleInput.height

xTxt = new TextLayer
	text: "217"
	fontSize: 18
	x: xPos.x
	y: xPos.y
	color: "white"
	
yTxt = new TextLayer
	text: "-113"
	fontSize: 18
	x: yPos.x
	y: yPos.y
	color: "white"

xPos.visible = false
yPos.visible = false


iframeContainer.backgroundColor = null

a = new Layer
	x: iframeContainer.x + 721
	y: iframeContainer.y + 1
	width: 1200
	height: 1200
	backgroundColor: null
	ignoreEvents: false

# a.style =
# 	"zoom" : "0.75"
# 	"-moz-transform" : "scale(0.75)"
# 	"-moz-transform-origin" : "0 0"
# 	"-o-transform": "scale(0.75)"
# 	"o-transform-origin" : "0 0"
# 	"webkit-transform" : "scale(0.75)"
# 	"-webkit-transform-origin" : "0 0"


a.html = "<iframe src = 'http://private.drewbuttons.com/dh_insta_workflow/index.html' style='transform: scale(0.395); transform-origin: 0 0;' width = 1200 height = 1200></iframe>"

a.bringToFront()

firebase.onChange "/coords", (value) ->
	xString = value.coordX
	xString = "#{xString}"
	xTxt.text = xString.substring(0,6)
	yString = value.coordY
	yString = "#{yString}"
	yTxt.text = yString.substring(0,6)

createBttn.onClick (event, layer) ->
				window.open("https://phantomjscloud.com/api/browser/v2/a-demo-key-with-low-quota-per-ip-address/?request={url:%22http://private.drewbuttons.com/dh_insta_workflow/index.html%22,renderType:%22png%22,renderSettings:{viewport:{width:1080,height:1080},clipRectangle:{width:1080,height:1080}}}","_blank")
				
createBttn.onMouseOver ->
	createBttn.opacity = 0.8
	
createBttn.onMouseOut ->
	createBttn.opacity = 1
	
importBttn.onMouseOver ->
	importBttn.opacity = 0.8
	
importBttn.onMouseOut ->
	importBttn.opacity = 1
	
previewBttn.onMouseOver ->
	previewBttn.opacity = 0.8
	
previewBttn.onMouseOut ->
	previewBttn.opacity = 1
	
importBttn.onClick ->
	firebase.put("/imageURL", {"mainImage": input.value})
	
previewBttn.onClick ->
	if inputColor.value != ""
		firebase.put("/bgColor", {"mainColor": inputColor.value})
	if inputScale.value != ""
		firebase.put("/scale", {"mainScale": inputScale.value})
	if inputLabel.value != ""
		firebase.put("/label", {"mainLabel": inputLabel.value})


	
