let isLogged = false;

fetch("/isLogin")
  .then((result) => {
    return result.json();
  })
  .then((isLogin) => {
    fetch("templates/loginButtons.handlebars")
      .then((response) => response.text())
      .then((template) => {
        const templateFn = Handlebars.compile(template);
        isLogged = isLogin;
        const html = templateFn({ isLogged });
        const productsDiv = document.getElementById("login");
        productsDiv.innerHTML = html;

        fetch("/api/productos")
          .then((result) => {
            return result.json();
          })
          .then((json) => {
            fetch("templates/productsTable.handlebars")
              .then((response) => response.text())
              .then((template) => {
                const templateFn = Handlebars.compile(template);
                const html = templateFn({ products: json.payload, isLogged });
                const productsDiv = document.getElementById("productos");
                productsDiv.innerHTML = html;

                if (isLogged) {
                  document
                    .querySelectorAll(".delete-button")
                    .forEach((item) => {
                      item.addEventListener("click", (event) => {
                        Swal.fire({
                          title: "¿Quieres eliminar el producto?",
                          showCancelButton: true,
                          confirmButtonColor: "#0089BA",
                          cancelButtonColor: "#FF6F91",
                          confirmButtonText: "Eliminar",
                          cancelButtonText: "Cancelar",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fetch("/api/productos/" + item.dataset.id, {
                              method: "DELETE",
                            }).then((_) => {
                              Swal.fire(
                                "¡Eliminado!",
                                "El producto fue eliminado.",
                                "success"
                              ).then((_) => {
                                window.location.reload();
                              });
                            });
                          }
                        });
                      });
                    });
                }
                document.querySelectorAll(".add-button").forEach((item) => {
                  item.addEventListener("click", (event) => {
                      if (window.localStorage.getItem("cart") == null) {
                        fetch("/api/carrito", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ products: [item.dataset.id] }),
                        })
                          .then((response) => {
                            return response.json();
                          })
                          .then((json) => {
                            if (json.status === "success") {
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(json.payload)
                              );
                              Swal.fire({
                                title: "Éxito",
                                text: json.message,
                                icon: "success",
                                timer: 2000,
                              });
                            } else {
                              Swal.fire({
                                title: "Error",
                                text: json.message,
                                icon: "error",
                                timer: 2000,
                              });
                            }
                          });
                      } else {
                        const cart = JSON.parse(
                          window.localStorage.getItem("cart")
                        );
                        fetch("/api/carrito/" + cart.id + "/productos", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ products: [item.dataset.id] }),
                        })
                          .then((response) => {
                            return response.json();
                          })
                          .then((json) => {
                            if (json.status === "success") {
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(json.payload)
                              );
                              Swal.fire({
                                title: "Éxito",
                                text: json.message,
                                icon: "success",
                                timer: 2000,
                              });
                            } else {
                              Swal.fire({
                                title: "Error",
                                text: json.message,
                                icon: "error",
                                timer: 2000,
                              });
                            }
                          });
                      }
                  });
                });
              });
          });
      });
  });