import {uaseState} from "react";
import {UseNavigate} from "react-router-dom";
import supabase from "../supabase/supabase-client.js";
import {
    FormSchemaLogin,
    getError,
    getFieldError,
    ConfirmSchemaLogin,
} from "../lib/validationForm.js";


export default function LoginPage() {
    const navigate = UseNavigate();
    const [FormSubmitted, setFornSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getError(error);
            setFormErrors(errors);
            console.log(errors);
        }
       else {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (error) {
                alert("Signing in error!");
            } else {
                alert("Signed In!");
                await new Promise((resolve) => serTimeout (resolve, 1000));
                navigate("/");
            }
        }
    };

    const onBlur = (property) => {
        const messagge = getFieldError(property, formSet[property]);
        setformErrors((prev) => ({ ...prev, [proprety]: messagge }));
        setTouchedFields((prev) => ({ ...prev, [proprety]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchFileds[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField =(propety, valueSelector)=> (e) => {
        setFormState((prev) =>({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return (
        <div className="conteiner">
            <form onSubmit={onSubmit} noValidate>
                <label htmlFor="email"> Email:</label>
                <input type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={setField.email}
                onBlur={inInvalid("email")}
                required 
                />
                {formErrors.email && <small>{formErrors.email}</small>}

                <label htmlFor="password"> Password:</label>
                <input type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={setField.password}
                onBlur={inInvalid("password")}
                required 
                />
                {formErrors.password && <small>{formErrors.password}</small>}
                <button type="submit"> Sign In </button>
            </form>
        </div>
    );
}