// supabaseClient.ts
import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createTable = async (tableName: string) => {
  console.log("Creating table:", tableName);
  try {
    const { data, error }: PostgrestSingleResponse<any> = await supabase
      .from("table_list")
      .upsert([{ table_name: tableName }])
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};
