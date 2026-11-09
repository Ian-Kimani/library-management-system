import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Optional: Clean up existing data in reverse dependency order
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Users (with Role enum)
  console.log('👤 Seeding Users...');
  const patron = await prisma.user.create({
    data: {
      email: 'patron@library.org',
      name: 'Jane Patron',
      role: Role.PATRON,
    },
  });

  const librarian = await prisma.user.create({
    data: {
      email: 'librarian@library.org',
      name: 'John Librarian',
      role: Role.LIBRARIAN,
    },
  });

  console.log(`Created ${patron.role} (${patron.email}) and ${librarian.role} (${librarian.email})`);

  // 2. Seed Genres (at least 4 required, seeding 5)
  console.log('🏷️  Seeding Genres...');
  const genresData = [
    {
      name: 'Science Fiction',
      description: 'Imaginative fiction dealing with futuristic settings, space exploration, and advanced technology.',
    },
    {
      name: 'Fantasy',
      description: 'Speculative fiction set in imaginary worlds featuring magic, mythic creatures, and epic quests.',
    },
    {
      name: 'Mystery & Thriller',
      description: 'Suspenseful plots revolving around investigations, secrets, and high-stakes puzzles.',
    },
    {
      name: 'Historical Fiction',
      description: 'Fictional narratives contextualized against detailed historical events and eras.',
    },
    {
      name: 'Non-Fiction',
      description: 'Fact-based literature covering science, history, philosophy, and personal memoirs.',
    },
  ];

  const genres: Record<string, string> = {};
  for (const g of genresData) {
    const created = await prisma.genre.create({ data: g });
    genres[g.name] = created.id;
  }
  console.log(`Created ${Object.keys(genres).length} genres.`);

  // 3. Seed Books (at least 15 required, seeding 18 across the genres)
  console.log('📚 Seeding Books...');
  const booksData = [
    // Science Fiction
    {
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '978-0441172719',
      publishedYear: 1965,
      copiesAvailable: 5,
      description: 'Set on the desert planet Arrakis, Dune tells the story of Paul Atreides and the battle for melange.',
      genreId: genres['Science Fiction'],
    },
    {
      title: 'Neuromancer',
      author: 'William Gibson',
      isbn: '978-0441569595',
      publishedYear: 1984,
      copiesAvailable: 3,
      description: 'A washed-up computer hacker is hired for one last job targeting a powerful artificial intelligence.',
      genreId: genres['Science Fiction'],
    },
    {
      title: 'Foundation',
      author: 'Isaac Asimov',
      isbn: '978-0553293357',
      publishedYear: 1951,
      copiesAvailable: 4,
      description: 'Hari Seldon uses psychohistory to preserve knowledge and civilization across the Galactic Empire.',
      genreId: genres['Science Fiction'],
    },
    {
      title: 'Snow Crash',
      author: 'Neal Stephenson',
      isbn: '978-0553380958',
      publishedYear: 1992,
      copiesAvailable: 2,
      description: 'A cyberpunk adventure through the Metaverse and an ancient linguistic virus threatening reality.',
      genreId: genres['Science Fiction'],
    },

    // Fantasy
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '978-0547928227',
      publishedYear: 1937,
      copiesAvailable: 6,
      description: 'Bilbo Baggins journeys with dwarves to reclaim the Lonely Mountain and its treasure from Smaug.',
      genreId: genres['Fantasy'],
    },
    {
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      isbn: '978-0553103540',
      publishedYear: 1996,
      copiesAvailable: 4,
      description: 'Noble houses maneuver for control of the Iron Throne as dark forces gather beyond the Wall.',
      genreId: genres['Fantasy'],
    },
    {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      isbn: '978-0756404741',
      publishedYear: 2007,
      copiesAvailable: 3,
      description: 'Kvothe recounts his youth, education at the University, and legendary deeds as a magician and musician.',
      genreId: genres['Fantasy'],
    },
    {
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      isbn: '978-0765326355',
      publishedYear: 2010,
      copiesAvailable: 4,
      description: 'On Roshar, a world torn by storms and war, ancient Knights Radiant must be revived.',
      genreId: genres['Fantasy'],
    },

    // Mystery & Thriller
    {
      title: 'The Girl with the Dragon Tattoo',
      author: 'Stieg Larsson',
      isbn: '978-0307269751',
      publishedYear: 2005,
      copiesAvailable: 3,
      description: 'Journalist Mikael Blomkvist and hacker Lisbeth Salander probe a decades-old disappearance.',
      genreId: genres['Mystery & Thriller'],
    },
    {
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      isbn: '978-0385504201',
      publishedYear: 2003,
      copiesAvailable: 5,
      description: 'Symbologist Robert Langdon investigates a murder at the Louvre and a historical conspiracy.',
      genreId: genres['Mystery & Thriller'],
    },
    {
      title: 'Gone Girl',
      author: 'Gillian Flynn',
      isbn: '978-0307588364',
      publishedYear: 2012,
      copiesAvailable: 4,
      description: 'When Amy Dunne disappears on her fifth anniversary, suspicion quickly falls on her husband Nick.',
      genreId: genres['Mystery & Thriller'],
    },
    {
      title: 'And Then There Were None',
      author: 'Agatha Christie',
      isbn: '978-0062073488',
      publishedYear: 1939,
      copiesAvailable: 4,
      description: 'Ten strangers are lured to an isolated island and accused of past crimes, dying one by one.',
      genreId: genres['Mystery & Thriller'],
    },

    // Historical Fiction
    {
      title: 'All the Light We Cannot See',
      author: 'Anthony Doerr',
      isbn: '978-1476746586',
      publishedYear: 2014,
      copiesAvailable: 3,
      description: 'A blind French girl and a German boy cross paths in occupied France during World War II.',
      genreId: genres['Historical Fiction'],
    },
    {
      title: 'The Book Thief',
      author: 'Markus Zusak',
      isbn: '978-0375842207',
      publishedYear: 2005,
      copiesAvailable: 4,
      description: 'Narrated by Death, the story follows young Liesel Meminger living in Nazi Germany.',
      genreId: genres['Historical Fiction'],
    },
    {
      title: 'The Pillars of the Earth',
      author: 'Ken Follett',
      isbn: '978-0451166890',
      publishedYear: 1989,
      copiesAvailable: 2,
      description: 'A sprawling epic set in 12th-century England centered around the construction of a cathedral.',
      genreId: genres['Historical Fiction'],
    },

    // Non-Fiction
    {
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      isbn: '978-0062316097',
      publishedYear: 2014,
      copiesAvailable: 5,
      description: 'A survey of human history from the evolution of archaic human species to the twenty-first century.',
      genreId: genres['Non-Fiction'],
    },
    {
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '978-0399590504',
      publishedYear: 2018,
      copiesAvailable: 3,
      description: 'A memoir recounting the author’s journey from growing up isolated in rural Idaho to earning a PhD.',
      genreId: genres['Non-Fiction'],
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      isbn: '978-0374275631',
      publishedYear: 2011,
      copiesAvailable: 4,
      description: 'Explores the two cognitive systems that drive the way humans think and make decisions.',
      genreId: genres['Non-Fiction'],
    },
  ];

  const createdBooks = [];
  for (const b of booksData) {
    const book = await prisma.book.create({ data: b });
    createdBooks.push(book);
  }
  console.log(`Created ${createdBooks.length} books.`);

  // 4. Seed Reviews (Stretch Goal: extra relation)
  console.log('⭐ Seeding Reviews (Stretch Goal)...');
  const duneBook = createdBooks.find((b) => b.title === 'Dune');
  const hobbitBook = createdBooks.find((b) => b.title === 'The Hobbit');

  if (duneBook) {
    await prisma.review.create({
      data: {
        bookId: duneBook.id,
        userId: patron.id,
        rating: 5,
        comment: 'A pinnacle of speculative sci-fi. The political intrigue and ecology are unmatched.',
      },
    });
  }

  if (hobbitBook) {
    await prisma.review.create({
      data: {
        bookId: hobbitBook.id,
        userId: patron.id,
        rating: 5,
        comment: 'A timeless, enchanting adventure that sparks wonder in readers of all ages.',
      },
    });
  }
  console.log('Created sample reviews.');

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
