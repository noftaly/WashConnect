import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth.js";

export function useAuth() {
  const auth = useAuthStore();

  onMounted(async () => {
    if (!auth.isAuthenticated) {
      await auth.fetchUser();
    }
  });

  return auth;
}
