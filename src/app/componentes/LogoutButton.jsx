"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.95rem 1.6rem",
        borderRadius: "999px",
        border: "none",
        background: "#e2e8f0",
        color: "#0f172a",
        fontWeight: 700,
        cursor: "pointer",
        transition: "transform 0.2s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      Cerrar sesión
    </button>
  );
}
