import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Delete existing cards
  await prisma.flashCard.deleteMany()

  // Create new cards
  const cards = await prisma.flashCard.createMany({
    data: [
      {
        front: "Hello",
        back: "Hola",
        frontLang: "English",
        backLang: "Spanish",
        category: "greetings"
      },
      {
        front: "Goodbye",
        back: "Adiós",
        frontLang: "English",
        backLang: "Spanish",
        category: "greetings"
      },
      {
        front: "Thank you",
        back: "Gracias",
        frontLang: "English",
        backLang: "Spanish",
        category: "politeness"
      },
      {
        front: "Please",
        back: "Por favor",
        frontLang: "English",
        backLang: "Spanish",
        category: "politeness"
      },
      {
        front: "Good morning",
        back: "Buenos días",
        frontLang: "English",
        backLang: "Spanish",
        category: "greetings"
      },
      {
        front: "Good night",
        back: "Buenas noches",
        frontLang: "English",
        backLang: "Spanish",
        category: "greetings"
      },
      {
        front: "How are you?",
        back: "¿Cómo estás?",
        frontLang: "English",
        backLang: "Spanish",
        category: "conversation"
      },
      {
        front: "I love you",
        back: "Te quiero",
        frontLang: "English",
        backLang: "Spanish",
        category: "emotions"
      }
    ]
  })

  console.log(`✅ Created ${cards.count} flashcards`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })