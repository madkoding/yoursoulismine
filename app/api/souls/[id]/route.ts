import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { data: soul, error } = await supabase
      .from('souls')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Soul not found' },
        { status: 404 }
      )
    }

    const blob = new Blob([soul.content], { type: 'text/markdown' })
    const headers = new Headers()
    headers.set('Content-Disposition', `attachment; filename="${soul.file_name || `soul-${soul.id}.md`}"`)
    headers.set('Content-Type', 'text/markdown;charset=utf-8')

    return new NextResponse(blob, { headers })
  } catch (error) {
    console.error('Error downloading soul:', error)
    return NextResponse.json(
      { error: 'Failed to download soul' },
      { status: 500 }
    )
  }
}
