import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => url && (url.startsWith('http://') || url.startsWith('https://'));

const supabaseUrl = isValidUrl(envUrl) ? envUrl : 'https://placeholder-project.supabase.co';
const supabaseAnonKey = envKey && envKey !== 'your_supabase_anon_key' ? envKey : 'placeholder-anon-key';

if (!isValidUrl(envUrl) || !envKey) {
  console.warn('Supabase credentials are missing or invalid. Please add a valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

// Fallback to placeholder strings to prevent crashes during initial setup
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
