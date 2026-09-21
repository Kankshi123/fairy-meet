import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jprsfmdbwsfikmosvtqn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcnNmbWRid3NmaWttb3N2dHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTMwMjEsImV4cCI6MjEwNTQ4OTAyMX0._kPtyqn-66HEQ8vkEeCdbfNBO16zWYqZcG-x_a2Gkas';

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);

