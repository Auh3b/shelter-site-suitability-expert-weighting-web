import supabase from "@/data/supabase";
import type { LoaderFunctionArgs } from "react-router-dom";

export default async function criteriaLoader({ request }: LoaderFunctionArgs) {
  const url = new URLSearchParams(request.url.split("?")[1]);
  const presetId = url.get("preset_id");
  if (!presetId) return null;
  const result = await supabase
    .from("criteria")
    .select("name, label, description")
    .eq("preset_id", presetId);
  if (result.error) return null;
  return result.data;
}
