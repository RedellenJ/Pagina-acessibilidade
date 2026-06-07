const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-principal");

function closeMenu() {
  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!menu.contains(target) && !menuToggle.contains(target)) {
      closeMenu();
    }
  });
}

const form = document.getElementById("formulario-contato");
const statusForm = document.getElementById("status-form");

if (form && statusForm) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [
      {
        id: "nome",
        errorId: "erro-nome",
        message: "Informe seu nome completo.",
      },
      {
        id: "email",
        errorId: "erro-email",
        message: "Informe um e-mail valido.",
        validate: (value) => /.+@.+\..+/.test(value),
      },
      {
        id: "mensagem",
        errorId: "erro-mensagem",
        message: "Digite uma mensagem.",
      },
    ];

    let firstInvalid = null;
    let hasErrors = false;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(field.errorId);
      if (!input || !error) return;

      const value = input.value.trim();
      const validByRule = field.validate ? field.validate(value) : value.length > 0;

      if (!validByRule) {
        error.textContent = field.message;
        input.setAttribute("aria-invalid", "true");
        if (!firstInvalid) firstInvalid = input;
        hasErrors = true;
      } else {
        error.textContent = "";
        input.removeAttribute("aria-invalid");
      }
    });

    if (hasErrors) {
      statusForm.textContent = "Revise os campos em destaque e tente novamente.";
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    statusForm.textContent = "Formulario enviado com sucesso.";
    form.reset();
  });
}
