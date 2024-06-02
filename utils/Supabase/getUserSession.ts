'use server';

import { createSupabaseServerClient } from'./supabaseServer';

export default async function getUserSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getUser();
}