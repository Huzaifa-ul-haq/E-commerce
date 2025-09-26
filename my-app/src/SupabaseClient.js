
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ivyouylkfwtcnuazugpk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eW91eWxrZnd0Y251YXp1Z3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5Mjk1NDAsImV4cCI6MjA3MjUwNTU0MH0.kwJHdJUJSV0d8yNJZilRunN3JqcpDoRRuajnovvXuz8'
const supabase = createClient(supabaseUrl, supabaseKey , {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  });
 

export default supabase;