const slika = document.getElementById("slika");
const onBtn = document.getElementById("on");
const offBtn = document.getElementById("off");

onBtn.addEventListener("click", function() {
    slika.src = "on.png";
});

offBtn.addEventListener("click",function(){
    slika.src = "off.png";

});

/*function onOff(){
    if(slika.src.endsWith("off.png")){
        slika.src="on.png";
    }
    else{
        slika.src="off.png";
    }
}*/