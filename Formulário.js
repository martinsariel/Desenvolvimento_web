import React, { useState } from "react";

function Formulario({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fone: "",
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    emailError: "",
    foneError: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.name) {
      errors.nameError = "Nome é obrigatório";
      valid = false;
    }

    if (!formData.email) {
      errors.emailError = "E-mail é obrigatório";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.emailError = "E-mail inválido";
      valid = false;
    }

    if (!formData.fone) {
      errors.foneError = "Telefone é obrigatório";
      valid = false;
    } else if (!/^\d+$/.test(formData.fone)) {
      errors.foneError = "Telefone deve conter apenas números";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: "",
        email: "",
        fone: "",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        Nome Completo:
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <span className="error">{formErrors.nameError}</span>
        <br />
        <br />
      </div>
      <div className="form-group">
        E-mail:
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <span className="error">{formErrors.emailError}</span>
        <br />
        <br />
      </div>
      <div className="form-group">
        Telefone:
        <br />
        <input
          type="tel"
          name="fone"
          pattern="[0-9]*"
          value={formData.fone}
          onChange={handleInputChange}
          required
        />
        <span className="error">{formErrors.foneError}</span>
        <br />
        <br />
      </div>
      <input type="submit" value="Cadastrar" className="form-button" />
    </form>
  );
}

export default Formulario;
