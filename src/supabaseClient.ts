// /src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zfsorcrcgbewsxopuaab.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmc29yY3JjZ2Jld3N4b3B1YWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMjIyNjEsImV4cCI6MjA2MjU5ODI2MX0.k35b-YtkK8rGXkMn-txsdZ38qLj8WA92udnZ9wXGBR8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);