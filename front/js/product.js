let url = window.location.search;
// console.log(url);
let id = url.substring(4);
// console.log(id);
fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .catch((error) => {
        alert("Une erreur est survenue");
    })
    .then((objcanap) => {
        document.querySelector(
            ".item__img"
        ).innerHTML = `<img src="${objcanap.imageUrl}" alt="Photographie d'un canapé">`;

        document.getElementById("title").innerHTML = objcanap.name;

        document.getElementById("price").innerHTML = objcanap.price;

        document.getElementById("description").innerHTML = objcanap.description;

        document.getElementById("title").innerHTML = objcanap.name;

        let colorsId = document.getElementById("colors");
        for (let colorObject of objcanap.colors) {
            let tagOption = document.createElement("option");
            tagOption.innerText = colorObject;
            tagOption.value = colorObject;
            colorsId.add(tagOption);
        }
    });

const btnSend = document.getElementById("addToCart");

let productStorage = JSON.parse(localStorage.getItem("product"));

console.log(productStorage);

btnSend.addEventListener("click", (event) => {
    event.preventDefault();
    let cart = {
        _ID: id,
        qty: Number(document.getElementById("quantity").value),
        color: document.getElementById("colors").value,
    };
    if (productStorage) {
        $ * $$$;
    } else {
        productStorage = [];
        productStorage.push(cart);
        localStorage.setItem("product", JSON.stringify(productStorage));
        console.log(productStorage);
    }
});
