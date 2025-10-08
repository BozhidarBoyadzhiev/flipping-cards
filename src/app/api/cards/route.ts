import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/cards - Fetch all flashcards
export async function GET() {
  try {
    const cards = await prisma.flashCard.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    
    return NextResponse.json(cards)
  } catch (error) {
    console.error('Error fetching cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cards' },
      { status: 500 }
    )
  }
}

// POST /api/cards - Create a new flashcard
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.front || !body.back || !body.frontLang || !body.backLang) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const newCard = await prisma.flashCard.create({
      data: {
        front: body.front,
        back: body.back,
        frontLang: body.frontLang,
        backLang: body.backLang,
        category: body.category || null
      }
    })
    
    return NextResponse.json(newCard, { status: 201 })
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    )
  }
}