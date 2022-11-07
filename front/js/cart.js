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
                ).innerHTML += `<article class="cart__item" data-id="${B._id}" data-color="${B.colors}">
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${a.qty$}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
            });
    });
}
