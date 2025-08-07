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

  const onSubmit = async (e) => {
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
      alert("Signing in error!");
    } else {
      alert("Signed in!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    return (formSubmitted || touchedFields[property]) && !!formErrors[property];
  };

  const setField = (property, valueSelector) => (e) => {
    const value = valueSelector ? valueSelector(e) : e.target.value;
    setFormState((prev) => ({ ...prev, [property]: value }));
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={setField("email")}
          onBlur={onBlur("email")}
          aria-invalid={isInvalid("email")}
          required
        />
        {formErrors.email && <small>{formErrors.email}</small>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={setField("password")}
          onBlur={onBlur("password")}
          aria-invalid={isInvalid("password")}
          required
        />
        {formErrors.password && <small>{formErrors.password}</small>}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;
