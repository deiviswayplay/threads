"use client";

import { useState, useEffect } from 'react';
import Post from './post';
import { createClient } from '../utils/subase/client';
import styles from './styles/PostFeed.module.css';

export default function PostFeed({ refreshTrigger }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const { data, error: fetchError } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      console.error('Error al cargar posts:', err);
      setError('Error al cargar los posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.cargando}>
        <p className={styles.textoCargando}>Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.textoError}>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.vacio}>
        <p className={styles.textoVacio}>No hay posts aún. ¡Crea uno!</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className={styles.separador}>
          <Post
            user={post.user_id}
            content={post.content}
            time={post.created_at}
          />
        </div>
      ))}
    </div>
  );
}
