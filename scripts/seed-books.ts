/* eslint-disable no-console */
const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";

type LoginResponse = { accessToken: string; user: { id: string; name: string; email: string } };

const admin = { name: "Admin", email: "admin@example.com", password: "123456" };

const books: Array<{
  title: string;
  author: string;
  publishedYear?: number;
  isbn?: string;
  description?: string;
}> = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    publishedYear: 2008,
    isbn: "9780132350884",
    description: "Guía de buenas prácticas para escribir código limpio y mantenible.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    publishedYear: 1999,
    isbn: "9780201616224",
    description: "Consejos y técnicas para desarrolladores pragmáticos.",
  },
  {
    title: "Refactoring: Improving the Design of Existing Code (2nd Edition)",
    author: "Martin Fowler",
    publishedYear: 2018,
    isbn: "9780134757599",
    description: "Catálogo de refactorizaciones con ejemplos en JavaScript.",
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    publishedYear: 1994,
    isbn: "9780201633610",
    description: "Patrones de diseño clásicos para software orientado a objetos.",
  },
  {
    title: "Domain-Driven Design: Tackling Complexity in the Heart of Software",
    author: "Eric Evans",
    publishedYear: 2003,
    isbn: "9780321125217",
    description: "Diseño guiado por el dominio para gestionar la complejidad.",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    publishedYear: 2017,
    isbn: "9780134494166",
    description: "Arquitecturas robustas enfocadas en separaciones de responsabilidades.",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    publishedYear: 2009,
    isbn: "9780262033848",
    description: "Texto clásico sobre algoritmos y estructuras de datos.",
  },
  {
    title: "You Don't Know JS: Up & Going",
    author: "Kyle Simpson",
    publishedYear: 2015,
    isbn: "9781491904244",
    description: "Serie que profundiza en conceptos de JavaScript.",
  },
  {
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    publishedYear: 2014,
    isbn: "9781491904152",
    description: "Profundiza en ámbito y closures en JavaScript.",
  },
  {
    title: "Working Effectively with Legacy Code",
    author: "Michael Feathers",
    publishedYear: 2004,
    isbn: "9780131177055",
    description: "Técnicas para lidiar con código legado.",
  },
];

async function ensureAdmin(): Promise<string> {
  // Try login, if fails register then login
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: admin.email, password: admin.password }),
  });
  if (loginRes.ok) {
    const data = (await loginRes.json()) as LoginResponse;
    return data.accessToken;
  }
  const registerRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admin),
  });
  if (!registerRes.ok) {
    const err = await registerRes.text();
    throw new Error(`Register failed: ${err}`);
  }
  const loginRes2 = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: admin.email, password: admin.password }),
  });
  if (!loginRes2.ok) {
    const err = await loginRes2.text();
    throw new Error(`Login failed: ${err}`);
  }
  const data = (await loginRes2.json()) as LoginResponse;
  return data.accessToken;
}

async function createBooks(token: string) {
  for (const b of books) {
    const res = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(b),
    });
    if (!res.ok) {
      const err = await res.text();
      console.warn(`Failed to create "${b.title}": ${err}`);
    } else {
      const created = await res.json();
      console.log(`Created: ${created.title}`);
    }
  }
}

async function main() {
  try {
    const token = await ensureAdmin();
    console.log("Admin ready, seeding books...");
    await createBooks(token);
    console.log("Seeding completed.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// @ts-ignore
if (require.main === module) {
  // Node 18+ has global fetch
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  main();
}


