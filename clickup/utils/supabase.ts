import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../database.types'

export default createClientComponentClient<Database>();
