"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import styles from './styles/login-form.module.css';

export default function LoginForm () {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Por favor, ingresa tu email y contraseña");
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw error;
      if (data) {
        alert("Inicio de sesión exitoso");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };
  return (
    <div className={styles.contenedor}>
      <form
        onSubmit={login}
        className={styles.formulario}
      >
        <h1 className={styles.titulo}>
          Iniciar sesión
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Nombre de usuario, teléfono o correo electrónico"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className={styles.entrada}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={styles.entrada}
        />

        <button
          type="submit"
          className={styles.boton}
        >
          Entrar
        </button>

        <p className={styles.texto}>
          ¿No tienes cuenta?{" "}
          <span onClick={() => router.push("/registre")} className={styles.enlace}>
            Regístrate
          </span>
        </p>
      </form>
    </div>
  );
}