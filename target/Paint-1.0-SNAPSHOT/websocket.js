/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var wsUri="ws://" + document.location.host + document.location.pathname + "whiteboardendpoint";
var websocket = new WebSocket(wsUri);

var output = document.getElementById("output");
websocket.onopen = function(evt){ onOpen(evt) }; 
websocket.onerror = function(evt){ onError(evt) };
websocket.onmessage = function(evt){ onMessage(evt) };

function onError(evt){
    writeToScreen('<span style="color: red;>ERROR:</span>' + evt.data);
}
function writeToScreen(message){
    output.innerHTML += message + "<br>";
}
function onOpen(evt){
    writeToScreen("Conectado a: " + wsUri);
}
function sendText(json){
    console.log("Sending Text: " + json);
    websocket.send(json);
}
function onMessage(evt){
    console.log("Recived :" + evt.data);
    drawImageText(evt.data);
}



