function calculateDiscount() {
    const price = document.getElementById("price").value;
    const discount = document.getElementById("discount").value;

    const finalPrice = price - (price * discount / 100);

    document.getElementById("result").textContent ="Nakon popusta: " + finalPrice.toFixed(2);
}

/*const price = document.getElementById("price").value;
const discount = document.getElementById("discount").value;

function calculateDiscount() {
    const finalPrice = price - (price * discount / 100);

    document.getElementById("result").textContent =
        "Nakon popusta: " + finalPrice.toFixed(2);
}*/