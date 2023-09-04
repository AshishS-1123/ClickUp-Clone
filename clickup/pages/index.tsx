import { useRouter } from 'next/router';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../database.types';

export default async function MainApplication() {
  const router = useRouter();
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    router.push('/login');
  } else {
    router.push('/dashboard');
  }
}
