import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: souls, error } = await supabase
      .from('souls')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return Response.json(souls)
  } catch (error) {
    console.error('Error getting souls:', error)
    return Response.json(
      { error: 'Failed to get souls' },
      { status: 500 }
    )
  }
}
