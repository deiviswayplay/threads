import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import styles from "./styles/post.module.css";

export default function Post({ user, content, time }) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.fila}>
        {/* Avatar */}
        <div className={styles.avatar} />

        <div className={styles.contenido}>
          <div className={styles.encabezado}>
            <span className={styles.nombreUsuario}>{user}</span>
            <span className={styles.tiempo}>{time}</span>
          </div>

          <p className={styles.texto}>{content}</p>

          {/* Botones de acción */}
          <div className={styles.acciones}>
            <AiOutlineHeart size={20} className={styles.iconoAccion} />
            <FaRegComment size={18} className={styles.iconoAccion} />
            <AiOutlineRetweet size={20} className={styles.iconoAccion} />
            <FiSend size={18} className={styles.iconoAccion} />
          </div>
        </div>
      </div>
    </div>
  );
}