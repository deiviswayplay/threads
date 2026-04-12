"use client";

import { useState } from "react";
import { createClient } from "../utils/subase/client";
import styles from "./styles/CreatePostModal.module.css";
import { AiOutlineClose } from "react-icons/ai";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Usuario no autenticado");

      const { data, error: insertError } = await supabase
        .from("post")
        .insert([
          {
            user_id: user.id,
            content: content,
          },
        ])
        .select();

      if (insertError) throw insertError;

      setContent("");
      onPostCreated?.();
      onClose();
    } catch (err) {
      console.error("Error al crear post:", err);
      setError(err.message || "Error al crear el post");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.superposicion} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.encabezado}>
          <h2 className={styles.titulo}>Crear Post</h2>
          <button className={styles.botonCerrar} onClick={onClose}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué está pasando?!"
            className={styles.areaTexto}
            rows="6"
            disabled={loading}
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.pie}>
            <button
              type="button"
              onClick={onClose}
              className={styles.botonCancelar}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.botonEnviar}
              disabled={loading || !content.trim()}
            >
              {loading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
