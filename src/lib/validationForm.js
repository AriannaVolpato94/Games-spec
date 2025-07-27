import z from "zod";

const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/;
const passwordError=
"Password must contain at least one uppercase letter, one lower letter, and one number";

export const FormSchema = z.object
({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(3),
    password: z.string().min(8).regex(passwordRegex,passwordError),
});

export const ConfirmSchema = FormSchema.refine((data)=>data);

export function getFieldError(property, value) {
    const {error} = FormSchema.shape[property].safeParse(value);
    return error 
    ? error.issue.map((issue) => issue.message).join(",")
    : undefined;
}

export const getError = (error) => 
    error.issues.reduce((all, issue) => {
        const path =issue.path.join("");
        const message = all[path] ? all [path] + "," : "";
        all[path] = issue.message;
        return all;
    });



















