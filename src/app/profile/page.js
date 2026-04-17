import { cookies } from "next/headers";
import SideNav from "../componentes/SideNav";
import LogoutButton from "../componentes/LogoutButton";
import { createClient } from "../utils/supabase/server";
import styles from "./profile.module.css";

export default async function ProfilePage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return (
      <div className={styles.contenedor}>
        <aside className={styles.navegacion}>
          <SideNav />
        </aside>
        <main className={styles.contenidoPrincipal}>
          <div className={styles.perfilCard}>
            <h1 className={styles.titulo}>Perfil</h1>
            <p className={styles.emptyState}>
              No se encontró ningún usuario autenticado. Inicia sesión para ver tu perfil.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      <aside className={styles.navegacion}>
        <SideNav />
      </aside>

      <main className={styles.contenidoPrincipal}>
        <div className={styles.perfilCard}>
          <h1 className={styles.titulo}>Mi perfil</h1>
          <p className={styles.subtitulo}>
            Aquí puedes ver la información básica de tu cuenta y cerrar sesión.
          </p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Correo electrónico</span>
              <span className={styles.value}>{user.email ?? "No disponible"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>ID de usuario</span>
              <span className={styles.value}>{user.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Proveedor</span>
              <span className={styles.value}>{user.app_metadata?.provider ?? "Email"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Creado</span>
              <span className={styles.value}>{new Date(user.created_at).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>

          <LogoutButton />
        </div>
      </main>
    </div>
  );
}
