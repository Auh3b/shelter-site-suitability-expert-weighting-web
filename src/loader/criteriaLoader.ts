import supabase from '@/data/supabase';
import type { LoaderFunctionArgs } from 'react-router-dom';

export default async function criteriaLoader({ request }: LoaderFunctionArgs) {
  const url = new URLSearchParams(request.url.split('?')[1]);
  const presetId = url.get('preset_id');
  if (!presetId) {
    const result = await supabase
      .from('criteria')
      .select('name, label, description')
      .eq('preset_id', 'fc9c3267-9625-4956-8501-fbc2e828f03f');
    if (result.error) return null;
    return result.data;
  }

  const result = await supabase
    .from('criteria')
    .select('name, label, description');
  if (result.error) return null;
  return result.data;
}
