// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_KEY não definidas no .env')
}
