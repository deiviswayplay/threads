"use client";

import { AiOutlinePlus } from 'react-icons/ai';
import styles from './styles/FeedHeader.module.css';

export default function FeedHeader({ onCreateClick }) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.fila}>
        <h2 className={styles.titulo}>Para ti</h2>
        <button
          onClick={onCreateClick}
          className={styles.botonCrear}
        >
          <AiOutlinePlus size={24} />
        </button>
      </div>
    </div>
  );
}
