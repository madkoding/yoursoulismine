import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const soul = await prisma.soul.findUnique({
      where: { id },
    })

    if (!soul) {
      return NextResponse.json(
        { error: 'Soul not found' },
        { status: 404 }
      )
    }

    const blob = new Blob([soul.content], { type: 'text/markdown' })
    const headers = new Headers()
    headers.set('Content-Disposition', `attachment; filename="${soul.fileName || `soul-${soul.id}.md`}"`)
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
