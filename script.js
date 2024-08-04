class FormValidator {
  constructor() {
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.form = document.getElementById("registrationForm");
    this.resultsDiv = document.getElementById("results");
    this.init();
  }

  init() {
    // Asignación de eventos al formulario
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.form.addEventListener("reset", () => this.handleReset());
    this.form.addEventListener("input", (event) => this.handleInput(event));
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevenir el envio directo del formulario

    // Validar el formulario usando la función personalizada
    if (this.validateForm()) {
      this.correctCount++;
      alert("Formulario enviado correctamente.");
    } else {
      this.incorrectCount++;
      alert("Por favor, complete el formulario correctamente.");
    }
    this.updateResults();
  }

  handleReset() {
    this.form.reset(); // Método reset() para limpiar el formulario
  }

  handleInput(event) {
    const input = event.target;

    // Limpiar el mensaje de validación personalizado si el campo es válido
    if (input.validity.valid) {
      input.setCustomValidity(""); // Método setCustomValidity()
    } else {
      input.setCustomValidity("Este campo es obligatorio");
    }
  }

  validateForm() {
    let isValid = true;

    // Revisar que cada uno de los campos requeridos haya sido completado
    const requiredFields = ["name", "age", "birthdate", "gender", "lastname"];
    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        field.setCustomValidity("Este campo es obligatorio");
        isValid = false;
      } else {
        field.setCustomValidity("");
      }
    });

    // Revisar si la edad es un número
    const ageField = document.getElementById("age");
    if (isNaN(ageField.value) || ageField.value.trim() === "") {
      ageField.setCustomValidity("Edad debe ser un número válido");
      isValid = false;
    } else {
      ageField.setCustomValidity("");
    }

    // Verificar la validez del formulario usando checkValidity()
    if (!this.form.checkValidity()) {
      isValid = false;
      this.form.reportValidity(); // Mostrar mensajes de validación
    }

    return isValid;
  }

  // Contador de envíos del formulario correctos e incorrectos
  updateResults() {
    this.resultsDiv.innerHTML = `
            <p>Registros correctos: ${this.correctCount}</p>
            <p>Registros incorrectos: ${this.incorrectCount}</p>
        `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FormValidator();
});
