"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/subase/client";
import styles from './styles/registre-form.module.css';


export default function RegistreForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.confirmPassword) {
      alert("Por favor, completa todos los campos");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      if (data) {
        alert("Registro exitoso. Revisa tu email para confirmar la cuenta.");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
   <div className={styles.contenedor}>
      <form
        onSubmit={handleSubmit}
        className={styles.formulario}
      >
        <h1 className={styles.titulo}>
          Registrarse
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Nombre de usuario, teléfono o correo electrónico"
          value={form.email}
          onChange={handleChange}
          className={styles.entrada}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className={styles.entrada}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          className={styles.entrada}
        />


        <button
          type="submit"
          className={styles.boton}
        >
          Entrar
        </button>

        <p className={styles.texto}>
          ya tienes una cuenta?{" "}
          <span className={styles.enlace}
            onClick={() => router.push("/login")}
          >
            Inicia sesión 
          </span>
        </p>
      </form>
    </div>
    );
}