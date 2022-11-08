const prdctStorage = JSON.parse(localStorage.getItem("product"));
// console.log(prdctStorage);
if (prdctStorage) {
    console.log("full");
    prdctStorage.forEach((a) => {
        console.log(a);
        fetch(`http://localhost:3000/api/products/${a._ID}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((error) => {
                alert("Une erreur est survenue");
            })
            .then((B) => {
                console.log(B);
                document.getElementById(
                    "cart__items"
                ).innerHTML += `<article class="cart__item" data-id="${a._ID}" data-color="${a.color}">
                <div class="cart__item__img">
                  <img src="${B.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${B.name}</h2>
                    <p>${a.color}</p>
                    <p>${B.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${a.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
            })

            .then(() => {
                suppcanap();
                tqprix();
            });
        function suppcanap() {
            const supprimerbtn = document.getElementsByClassName("deleteItem");
            for (const deletebtn of supprimerbtn) {
                deletebtn.addEventListener("click", () => {
                    deletebtn.closest("article").remove();
                    let color = deletebtn.closest("article").dataset.color;
                    let id = deletebtn.closest("article").dataset.id;
                    let index = -1;
                    prdctStorage.find((item) => {
                        if (item.color == color && item._ID == id) {
                            index = prdctStorage.indexOf(item);
                        }
                    });
                    if (index !== -1) {
                        prdctStorage.splice(index, 1);
                        localStorage.setItem("product", JSON.stringify(prdctStorage));
                        console.log(prdctStorage);
                    }
                    tqprix();
                });
            }
        }

        function tqprix() {
            let quantity = document.getElementsByClassName("itemQuantity");
            let totalquantity = 0;
            let totalprix = 0;
            for (let i = 0; i < quantity.length; i++) {
                totalquantity += parseInt(quantity[i].value);
            }
            document.getElementById("totalQuantity").innerText = totalquantity;
            const description = document.getElementsByClassName("cart__item__content__description");
            for (let i = 0; i < description.length; i++) {
                const prixarticle = description[i].lastElementChild.innerHTML;
                totalprix += parseInt(quantity[i].value) * parseInt(prixarticle);
            }
            document.getElementById("totalPrice").innerText = totalprix;
        }
    });
}
