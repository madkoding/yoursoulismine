import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://cmrgqwezycynemymyqmx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'your-supabase-key-here'

export const supabase = createClient(supabaseUrl, supabaseKey)
