const hover = document.getElementById("hover");

hover.addEventListener("mouseover", function () {
    hover.textContent = "Hello";
});

hover.addEventListener("mouseout", function () {
    hover.textContent = "ovaj tekst ce se promjenit kad predjemo preko njega"; //moueout je kad nehoveramo a mouseover kad hoveramo!
});

