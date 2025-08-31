function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let emptyMessage = document.getElementById("empty-message");
  let clearBtn = document.getElementById("clear-cart");
  let totalDiv = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";
  totalDiv.innerHTML = "";

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    clearBtn.style.display = "none";
    return;
  }

  emptyMessage.style.display = "none";
  clearBtn.style.display = "block";

  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
      <button onclick="removeItem(${index})">Remover</button>
    `;
    cartItemsDiv.appendChild(div);

    total += item.price;
  });

  totalDiv.innerHTML = `<h2>Total: R$ ${total.toFixed(2)}</h2>`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
});

// Carregar ao abrir a página
loadCart();
