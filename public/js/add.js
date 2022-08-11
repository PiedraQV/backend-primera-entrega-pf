let isLogged = false;

function enviarFormulario(event) {
  event.preventDefault();
  const form = event.target;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const thumbnailEl = document.querySelector("#thumbnail");
  const thumbnail = thumbnailEl.files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("description", description);
  formData.append("code", code);
  formData.append("thumbnail", thumbnail);

  fetch("/api/productos", {
    method: "POST",
    body: formData,
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      const title = json.status === "success" ? "Éxito" : "Error";
      const icon = json.status === "success" ? "success" : "error";
      Swal.fire({
        title: title,
        text: json.message,
        icon: icon,
        timer: 2000,
      }).then(() => {
        if (json.status === "success") {
          window.location.href = "/";
        }
      });
    });
}

document.addEventListener("submit", enviarFormulario);
fetch("/isLogin")
  .then((result) => {
    return result.json();
  })
  .then((isLogin) => {
    isLogged = isLogin;
    if (isLogged) {
      fetch("templates/form.handlebars")
        .then((response) => response.text())
        .then((template) => {
          const templateFn = Handlebars.compile(template);
          const html = templateFn();
          const formDiv = document.getElementById("productForm");
          formDiv.innerHTML = html;

          const imgPreviewEl = document.getElementById("preview");
          const imgTextEl = document.getElementById("image-text");
          document.getElementById("thumbnail").onchange = (e) => {
            let read = new FileReader();
            read.onload = (e) => {
              imgPreviewEl.src = e.target.result;
              imgPreviewEl.classList.remove("d-none");
              imgTextEl.classList.remove("d-none");
            };

            read.readAsDataURL(e.target.files[0]);
          };
        });
    } else {
      window.location.href = "/";
    }
  });
