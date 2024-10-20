import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbybmfsifmxbzwtakvac.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWJtZnNpZm14Ynp3dGFrdmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNjI2NDgsImV4cCI6MjA0NDkzODY0OH0.rLQ_M6ShViNt_WBaK9PtAqgDInV0y3hlVGdCp2nfVeI";

export const supabase = createClient(supabaseUrl, supabaseKey);
