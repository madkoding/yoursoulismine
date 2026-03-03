import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const file = formData.get('file') as File

    if (!name || !description || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const content = await file.text()

    const soul = await prisma.soul.create({
      data: {
        name,
        description,
        content,
        fileName: file.name,
      },
    })

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Error creating soul:', error)
    return NextResponse.json(
      { error: 'Failed to capture soul' },
      { status: 500 }
    )
  }
}
