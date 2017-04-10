/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousemove", function (e) { findxy('move', e) }, false);
canvas.addEventListener("mousedown", function (e) { findxy('down', e) }, false);
canvas.addEventListener("mouseup", function (e) { findxy('up', e) }, false);
canvas.addEventListener("mouseout", function (e) { findxy('out', e) }, false);
        
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            defineImage();
        }
    }
}
           
function defineImage(evt) {                 //modificar colores
    
    var color = document.inputForm.color;
    var size = document.inputForm.size;
    
    var json = JSON.stringify({         //los datos se van a ir a traves de esta estructura
        "color": color.value,
        "size": size.value,
        "coords": {
            "prex": prevX,
            "prey": prevY,
            "currx": currX,
            "curry": currY
        }
        });
        drawImageText(json);
        sendText(json);
}


function drawImageText(image) {
    console.log("drawImageText");
    var json = JSON.parse(image);
    ctx.beginPath();
    ctx.moveTo(json.coords.prex, json.coords.prey);
    ctx.lineTo(json.coords.currx, json.coords.curry);
    ctx.strokeStyle = json.color;
    ctx.arc(json.coords.currx, json.coords.curry, json.size, 0, Math.PI * 2, false);
    ctx.lineWidth = json.size;
    ctx.stroke();
    ctx.closePath();    
}
 
function erase() {
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);            
            ctx.restore();
        }
    }
    
function saved() {
    var png = document.getElementById("myCanvas");
    png.addEventListener("click", function () {
        var dato = canvas.toDataURL("image/png");
        dato = dato.replace("image/png", "image/octet-stream");
        document.location.href = dato;
    }, false);
}

