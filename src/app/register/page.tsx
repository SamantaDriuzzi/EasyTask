"use client";

import Logo from "@/components/logo";
import { formFields } from "@/utils/register/form";
import { Errors, FormFields } from "@/utils/types/interfaces-form";
import validate from "@/utils/validates/validate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import ReactPasswordChecklist from "react-password-checklist";
import { signIn, useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormFields>({
    name: "",
    nickname: "",
    email: "",
    password: "",
  });
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { data: session } = useSession();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    const newErrors = validate({ fieldName: name, fieldValue: value }, errors);
    setErrors(newErrors);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;
    const newErrors: Errors = {};

    Object.keys(form).forEach((fieldName) => {
      const fieldErrors = validate(
        { fieldName, fieldValue: form[fieldName as keyof FormFields] },
        newErrors
      );
      if (Object.keys(fieldErrors).length > 0) {
        valid = false;
        newErrors[fieldName] = fieldErrors[fieldName];
      }
    });

    setErrors(newErrors);

    if (valid) {
      if (valid) {
        try {
          fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }).then((response) => {
            return response.json();
          });

          alert("Registro exitoso ✅");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } catch (error) {
          console.error("Error en el registro:", error);
          alert("Error en el registro. Por favor, intenta nuevamente.");
        }
      } else {
        alert("❗ Hay errores en el formulario.");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-register flex flex-col justify-center items-center lg:flex-row lg:items-start p-5 lg:p-20">
      <div className="w-full max-w-2xl z-10 bg-white p-5 rounded-xl shadow-lg">
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center lg:flex-row gap-10">
            <div className="w-full lg:w-3/4 flex flex-col justify-center mt-6">
              <Logo />
              <hr className="border-gray-300 w-1/2 mb-8 ml-[25%]" />

              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col mb-4">
                  <label
                    htmlFor={field.name}
                    className="mb-2 font-bold text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={form[field.name as keyof FormFields]}
                    onChange={handleInputChange}
                    required={field.required}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-orange"
                  />
                  {errors[field.name] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
              <div className="flex flex-col mb-4 relative">
                <label
                  htmlFor="password"
                  className="mb-2 font-bold text-gray-700"
                >
                  Contraseña:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full pr-10"
                />
                <Image
                  src={
                    showPassword
                      ? "/register/eyes-open.png"
                      : "/register/eyes-closed.png"
                  }
                  width={30}
                  height={30}
                  alt="Toggle Password Visibility"
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={toggleShowPassword}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col mb-4 relative">
                <label
                  htmlFor="repeatPassword"
                  className="mb-2 font-bold text-gray-700"
                >
                  Repetir contraseña:
                </label>
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  id="repeatPassword"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full pr-10"
                />
                <Image
                  src={
                    showRepeatPassword
                      ? "/register/eyes-open.png"
                      : "/register/eyes-closed.png"
                  }
                  width={30}
                  height={30}
                  alt="Toggle Repeat Password Visibility"
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={toggleShowRepeatPassword}
                />
              </div>
              <ReactPasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={form.password}
                valueAgain={passwordAgain}
                messages={{
                  minLength: "La contraseña tiene más de 8 caracteres.",
                  specialChar: "La contraseña tiene caracteres especiales.",
                  number: "La contraseña tiene un número.",
                  capital: "La contraseña tiene una letra mayúscula.",
                  match: "Las contraseñas coinciden.",
                }}
              />
              <button
                type="submit"
                className="w-full bg-color-button hover:bg-color-button-hover text-black text-xl font-bold py-3 px-6 rounded-lg mt-4 disabled:opacity-50"
                disabled={
                  Object.keys(errors).length > 0 ||
                  form.password !== passwordAgain ||
                  !form.password ||
                  !passwordAgain
                }
              >
                Registrarse
              </button>
              <div className="flex flex-row justify-center mt-4">
                <div className="text-sm text-gray-500 font-bold mr-2">
                  ¿YA ESTÁS REGISTRADO?
                </div>
                <div className="text-sm hover:text-blue-dark text-orange font-bold">
                  <Link href="/login">INGRESA AQUÍ</Link>
                </div>
              </div>
              <div className="flex justify-center font-bold ">O</div>
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full lg:w-3/4 bg-color-button hover:bg-color-button-hover text-black text-xl font-bold py-3 px-6 rounded-lg flex items-center justify-center"
          >
            <FaGoogle className="mr-2" /> Registrarse con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
