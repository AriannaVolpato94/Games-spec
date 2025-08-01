import {createClient}  from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL o Key non definiti.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
