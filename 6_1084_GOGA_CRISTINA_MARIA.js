
// Functie pentru schimbarea culorii de fundal cu ajutorul unui selector
function bg_color(value) {
    editor.style.backgroundColor = value;
}
//Functie pentru setarea coordonatelor unui dreptunghi x1
function setareCoordonateDreptunghi(obj, x1, y1, x2, y2 ) {
    
    obj.setAttributeNS(null, "x", Math.min(x1, x2));
    obj.setAttributeNS(null, "y", Math.min(y1, y2));
    obj.setAttributeNS(null, "width", Math.max(x1, x2) - Math.min(x1, x2));
    obj.setAttributeNS(null, "height", Math.max(y1, y2) - Math.min(y1, y2));
    obj.setAttributeNS(null, "fill-opacity", "100%");
    //grosime
    obj.setAttributeNS(null, "stroke-width", thickness)
   // console.log(obj)
}

function setareCoordonateElipsa(obj, x1, y1, x2, y2) {
    obj.setAttributeNS(null, "cx", (x1 + x2) / 2);
    obj.setAttributeNS(null, "cy", (y1 + y2) / 2);
    obj.setAttributeNS(null, "rx", (Math.max(x1, x2) - Math.min(x1, x2)) / 2);
    obj.setAttributeNS(null, "ry", (Math.max(y1, y2) - Math.min(y1, y2)) / 2);
    obj.setAttributeNS(null, "stroke-width", thickness)
    obj.setAttributeNS(null, "fill-opacity", "100%");
   // console.log(obj)
}


function setareCoordonateLinie(obj, x1, y1, x2, y2, thickness) {
    obj.setAttributeNS(null, "x1", x1);
    obj.setAttributeNS(null, "y1", y1);
    obj.setAttributeNS(null, "x2", x2);
    obj.setAttributeNS(null, "y2", y2);
    //setarea grosimii liniei
    obj.setAttributeNS(null, "stroke-width", thickness)
}


var MOUSE_LEFT = 0, MOUSE_RIGHT = 2, KEY_DEL = 46;
var x1 = 0, y1 = 0;
var elementSelectat = null;
var figura = "dreptunghi";
var editor = document.getElementById("editor");
var selectieDreptunghi = document.getElementById("selectieDreptunghi");
var selectieElipsa = document.getElementById("selectieElipsa");
var selectieLinie = document.getElementById("selectieLinie");
var elemente = document.getElementById("elemente");

//Setarea valorilor default
var color = "#000000"; 
var thickness = 5;


//Functie pentru grosime cu ajutorul unui range setat de utilizator
function update_thickness(value) {
    thickness = value ;
}

//Functie cu ajutorul careia putem modifica culoarea elementelor din color-picker
function update_color(value) {
    color = value;
}
//functii pentru selectarea formelor dorite
function setDreptunghi() {
    figura = "dreptunghi";
}

function setElipsa() {
    figura = "elipsa";
}

function setLinie() {
    figura = "linie";
}
//Cu ajutorul urmatoarelor 4 functii putem modifica culoarea elementelor dintre cele 4 culori vizibile langa color-picker
function setareCuloarePortocaliu() {
    color = "#ffdfba";
}

function setareCuloareGalben() {
    color = "#ffffba";
}

function setareCuloareVerde() {
    color = "#baffc9";
}   

function setareCuloareBleu() {
    color = "#bae1ff";
}

editor.onmousedown = function (e) {
    if (e.button == MOUSE_LEFT) {
        x1 = e.pageX - this.getBoundingClientRect().left;
        y1 = e.pageY - this.getBoundingClientRect().top;

        if (figura == "dreptunghi") {
            setareCoordonateDreptunghi(selectieDreptunghi, x1, y1, x1, y1);
            selectieDreptunghi.style.display = "block";
        }

        if (figura == "elipsa") {
            setareCoordonateElipsa(selectieElipsa, x1, y1, x1, y1);
            selectieElipsa.style.display = "block";
        }

        if (figura == "linie") {
            setareCoordonateLinie(selectieLinie, x1, y1, x1, y1, thickness);
            selectieLinie.style.display = "block";
        }
    }
}


editor.onmousemove = function (e) {
    x2 = e.pageX - this.getBoundingClientRect().left;
    y2 = e.pageY - this.getBoundingClientRect().top;
    setareCoordonateDreptunghi(selectieDreptunghi, x1, y1, x2, y2);
    setareCoordonateElipsa(selectieElipsa, x1, y1, x2, y2);
    setareCoordonateLinie(selectieLinie, x1, y1, x2, y2);
}

editor.onmouseup = function (e) {
    if (e.button == MOUSE_LEFT) {
        x2 = e.pageX - this.getBoundingClientRect().left;
        y2 = e.pageY - this.getBoundingClientRect().top;
        selectieDreptunghi.style.display = "none";
        selectieElipsa.style.display = "none";
        selectieLinie.style.display = "none";


        if (figura == "dreptunghi") {
            elementnou = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            setareCoordonateDreptunghi(elementnou, x1, y1, x2, y2);
            //Colorarea elementului selectat
            elementnou.style.fill = color;
        }

        if (figura == "elipsa") {
            elementnou = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            setareCoordonateElipsa(elementnou, x1, y1, x2, y2);
            elementnou.style.fill = color;
        }

        if (figura == "linie") {
            elementnou = document.createElementNS("http://www.w3.org/2000/svg", "line");
            setareCoordonateLinie(elementnou, x1, y1, x2, y2, thickness);
            elementnou.style.stroke = color;
        }
        //Adaugarea elementelor desenate intr-un vector de elemente
        elemente.appendChild(elementnou);
    }
}

editor.oncontextmenu = function () { return false; }

//Functia undoSVG preia din vectorul de elemente lastElementChild adica ultimul element desenat si il sterge
function undoSVG() {
    if (elemente.lastElementChild != null)
        elemente.removeChild(elemente.lastElementChild);
}
//Functia clearSVG verifica daca in vectorul de elemente se afla elemente, iar daca sunt elemente, le sterge
function clearSVG() {
    while (elemente.lastElementChild != null)
        elemente.removeChild(elemente.lastElementChild);
}

//Functionalitate pentru descarcarea board-ului in format PNG
function savePNG (){
    const a = document.createElement('a'); //crearea elementului a
  // console.log(a);
// console.log(editor);
     a.href = editor.toDataURL('img.png' , 1);// trecerea svg-ul editor ca link href value
 //   console.log(svg.href);
     a.download = "img.png";
     a.click();//click pentru salvarea imaginii
}


//Functie pentru salvarea imaginei sub forma de SVG
function saveSVG() { 
    const svg = document.getElementById('editor');

    let download = (imgURI, fileName) => {
        let a = document.createElement('a'); //crearea elementului a 
        a.setAttribute('download', 'image.svg'); 
        a.setAttribute('href', imgURI);
        a.setAttribute('target', '_blank');//elementul a se va deschide intr-un nou tab 
        a.click();
    }

    let data = (new XMLSerializer()).serializeToString(svg);// Exportarea SVG-ului folosind xmlSerializer
    let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    //'image/svg+xml;charset=utf-8'--convertirea svg-ului in base64
    //blob reprezinta file-link obj ce primeste 2 proprietatii size si type
    let link = URL.createObjectURL(svgBlob);
    download(link);
}






 