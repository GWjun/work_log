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
}

export const fetchGoogleUserInfo = async () => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching Google user info:", response.statusText);
      return null;
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error: any) {
    console.error("Error fetching Google user info:", error.message);
    return null;
  }
};
