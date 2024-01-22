// pages/api/[tableName].ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tableName } = req.query;

  try {
    let { data, error } = await supabase.from(String(tableName)).select("*");

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
