import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  supabase  from "../../src/supabase/supabase-client"; 
import { ConfirmSchemaLogin, getErrors, getFieldError } from "../../src/lib/validationForm.js"; 

function LoginForm() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field, valueSelector) => (event) => {
    const value = valueSelector ? valueSelector(event) : event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => () => {
    const errorMessage = getFieldError(field, formState[field]);
    setFormErrors((prev) => ({ ...prev, [field]: errorMessage }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldInvalid = (field) => {
    return (formSubmitted || touchedFields[field]) && Boolean(formErrors[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const { error, data } = ConfirmSchemaLogin.safeParse(formState);

    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (signInError) {
      alert("Errore durante l'accesso!");
    } else {
      alert("Accesso riuscito!");
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

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;