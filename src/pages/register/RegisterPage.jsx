import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase-client.js";
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm.js";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (field, valueSelector) => (event) => {
    const value = valueSelector ? valueSelector(event) : event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => () => {
    const error = getFieldError(field, formState[field]);
    setFormErrors((prev) => ({ ...prev, [field]: error }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldInvalid = (field) => {
    return (formSubmitted || touchedFields[field]) && Boolean(formErrors[field]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const { error, data } = ConfirmSchema.safeParse(formState);

    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
        },
      },
    });

    if (signUpError) {
      alert("Errore nella registrazione 👎🏻");
    } else {
      alert("Registrazione completata 👍🏻");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          aria-invalid={isFieldInvalid("email")}
          required
        />
        {formErrors.email && <small>{formErrors.email}</small>}

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange("firstName")}
          onBlur={handleBlur("firstName")}
          aria-invalid={isFieldInvalid("firstName")}
          required
        />
        {formErrors.firstName && <small>{formErrors.firstName}</small>}

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange("lastName")}
          onBlur={handleBlur("lastName")}
          aria-invalid={isFieldInvalid("lastName")}
          required
        />
        {formErrors.lastName && <small>{formErrors.lastName}</small>}

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleChange("username")}
          onBlur={handleBlur("username")}
          aria-invalid={isFieldInvalid("username")}
          required
        />
        {formErrors.username && <small>{formErrors.username}</small>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          aria-invalid={isFieldInvalid("password")}
          required
        />
        {formErrors.password && <small>{formErrors.password}</small>}

        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}