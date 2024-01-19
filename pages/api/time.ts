// pages/api/student.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("time api");
  let { data: time, error } = await supabase.from("time").select("*");
  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  res.status(200).json(time);
}
