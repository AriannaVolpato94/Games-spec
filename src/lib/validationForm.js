import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number";

export const ConfirmSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

// Restituisce messaggi di errore per un singolo campo
export function getFieldError(property, value) {
  if (!ConfirmSchema.shape[property]) return undefined;

  const result = ConfirmSchema.shape[property].safeParse(value);
  if (!result.success) {
    return result.error.errors.map((issue) => issue.message).join(", ");
  }
  return undefined;
}

// Converte errori Zod in un oggetto con messaggi per campo
export const getErrors = (error) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});

// Schema per login (email e password)
export const ConfirmSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});
