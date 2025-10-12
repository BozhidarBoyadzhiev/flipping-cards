import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/cards/[id] - Fetch a single flashcard
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const card = await prisma.flashCard.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })
    
    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error fetching card:', error)
    return NextResponse.json(
      { error: 'Failed to fetch card' },
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

// PUT /api/cards/[id] - Update a flashcard
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.front || !body.back || !body.frontLang || !body.backLang) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const updatedCard = await prisma.flashCard.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        front: body.front,
        back: body.back,
        frontLang: body.frontLang,
        backLang: body.backLang,
        category: body.category || null
      }
    })
    
    return NextResponse.json(updatedCard)
  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json(
      { error: 'Failed to update card' },
      { status: 500 }
    )
  }
}

// DELETE /api/cards/[id] - Delete a flashcard
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.flashCard.delete({
      where: {
        id: parseInt(params.id)
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json(
      { error: 'Failed to delete card' },
      { status: 500 }
    )
  }
}