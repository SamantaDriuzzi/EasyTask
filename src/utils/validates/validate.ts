interface ValidationArgs {
  fieldName: string;
  fieldValue: string;
}

interface Errors {
  [key: string]: string;
}

function validate(
  { fieldName, fieldValue }: ValidationArgs,
  errors: Errors
): Errors {
  const newErrors: Errors = { ...errors };

  if (fieldValue.trim() === "") {
    newErrors[fieldName] = "Este campo es requerido";
  } else {
    delete newErrors[fieldName];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fieldName === "email" && !emailRegex.test(fieldValue)) {
      newErrors[fieldName] = "El formato del email no es válido";
    }

    if (
      (fieldName === "name" || fieldName === "nickname") &&
      fieldValue.length < 3
    ) {
      newErrors[fieldName] = "Debe tener al menos 3 caracteres";
    }
  }

  return newErrors;
}

export default validate;
