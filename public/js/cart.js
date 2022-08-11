let cart = window.localStorage.getItem("cart");
let cartId = -1
if (cart !== undefined && cart !== null) {
  cartId = JSON.parse(cart).id;
  cart = JSON.parse(cart).products;
  
  document.getElementById("delete-cart").addEventListener("click", () => {
    fetch("/api/carrito/" + cartId, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          window.localStorage.removeItem("cart");
          window.location.reload();
        } else {
          Swal.fire({
            title: "Error",
            text: res.message,
            icon: "error",
            timer: 2000,
          });
        }
      });
  });
}

cartItems = [];

fetch("/api/carrito/" + cartId + "/productos")
  .then((res) => res.json())
  .then((res) => {
    if (res.status === "success") {
      cartItems = res.payload.products;
      fetch("templates/carrito.handlebars")
        .then((response) => response.text())
        .then((template) => {
          const templateFn = Handlebars.compile(template);
          const html = templateFn({ cart: cartItems });
          const formDiv = document.getElementById("cart");
          formDiv.innerHTML = html;

          document.querySelectorAll(".delete-button").forEach((item) => {
            item.addEventListener("click", (event) => {
              Swal.fire({
                title: "¿Quieres eliminar el producto?",
                showCancelButton: true,
                confirmButtonColor: "#0089BA",
                cancelButtonColor: "#FF6F91",
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  fetch(
                    "/api/carrito/" + cartId + "/productos/" + item.dataset.id,
                    {
                      method: "DELETE",
                    }
                  ).then((_) => {
                    Swal.fire(
                      '¡Eliminado!',
                      'El producto fue eliminado del carrito.',
                      'success'
                    ).then((_) => {
                      window.location.reload();
                    });
                  });
                }
              })
            });
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: res.message,
        icon: "error",
        timer: 2000,
      });
    }
  });