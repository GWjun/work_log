import { supabase } from "./supabaseClient";

export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
};

export async function googleLogout() {
  const { error } = await supabase.auth.signOut();
  alert("로그아웃 되었습니다.");
  window.location.href = "/login";
}
