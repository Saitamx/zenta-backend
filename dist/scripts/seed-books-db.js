"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const sequelize_1 = require("@nestjs/sequelize");
const book_entity_1 = require("../src/books/entities/book.entity");
const user_entity_1 = require("../src/users/entities/user.entity");
const bcrypt = require("bcryptjs");
async function main() {
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: false });
    try {
        const bookModel = appContext.get((0, sequelize_1.getModelToken)(book_entity_1.Book));
        const userModel = appContext.get((0, sequelize_1.getModelToken)(user_entity_1.User));
        const adminEmail = 'admin@example.com';
        const adminName = 'Admin';
        const adminPassword = '123456';
        const existing = await userModel.findOne({ where: { email: adminEmail } });
        if (!existing) {
            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await userModel.create({ email: adminEmail, name: adminName, passwordHash });
            console.log('Admin user created');
        }
        else {
            console.log('Admin user already exists');
        }
        const books = [
            { title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008, isbn: '9780132350884', description: 'Guía de buenas prácticas para escribir código limpio y mantenible.', imageUrl: 'https://covers.openlibrary.org/b/id/9251996-L.jpg', available: true },
            { title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', publishedYear: 1999, isbn: '9780201616224', description: 'Consejos y técnicas para desarrolladores pragmáticos.', imageUrl: 'https://covers.openlibrary.org/b/id/9252053-L.jpg', available: true },
            { title: 'Refactoring (2nd Edition)', author: 'Martin Fowler', publishedYear: 2018, isbn: '9780134757599', description: 'Catálogo de refactorizaciones con ejemplos en JavaScript.', imageUrl: 'https://covers.openlibrary.org/b/id/9161496-L.jpg', available: true },
            { title: 'Design Patterns', author: 'Erich Gamma et al.', publishedYear: 1994, isbn: '9780201633610', description: 'Patrones de diseño clásicos para software orientado a objetos.', imageUrl: 'https://covers.openlibrary.org/b/id/8231856-L.jpg', available: true },
            { title: 'Domain-Driven Design', author: 'Eric Evans', publishedYear: 2003, isbn: '9780321125217', description: 'Diseño guiado por el dominio para gestionar la complejidad.', imageUrl: 'https://covers.openlibrary.org/b/id/9252002-L.jpg', available: true },
            { title: 'Clean Architecture', author: 'Robert C. Martin', publishedYear: 2017, isbn: '9780134494166', description: 'Arquitecturas robustas enfocadas en separaciones de responsabilidades.', imageUrl: 'https://covers.openlibrary.org/b/id/9251997-L.jpg', available: true },
            { title: 'Introduction to Algorithms', author: 'Cormen et al.', publishedYear: 2009, isbn: '9780262033848', description: 'Texto clásico sobre algoritmos y estructuras de datos.', imageUrl: 'https://covers.openlibrary.org/b/id/9252014-L.jpg', available: true },
            { title: `You Don't Know JS: Up & Going`, author: 'Kyle Simpson', publishedYear: 2015, isbn: '9781491904244', description: 'Serie que profundiza en conceptos de JavaScript.', imageUrl: 'https://covers.openlibrary.org/b/id/8165431-L.jpg', available: true },
            { title: `You Don't Know JS: Scope & Closures`, author: 'Kyle Simpson', publishedYear: 2014, isbn: '9781491904152', description: 'Profundiza en ámbito y closures en JavaScript.', imageUrl: 'https://covers.openlibrary.org/b/id/8165430-L.jpg', available: false },
            { title: 'Working Effectively with Legacy Code', author: 'Michael Feathers', publishedYear: 2004, isbn: '9780131177055', description: 'Técnicas para lidiar con código legado.', imageUrl: 'https://covers.openlibrary.org/b/id/9252017-L.jpg', available: true },
        ];
        for (const b of books) {
            const found = await bookModel.findOne({ where: { title: b.title, author: b.author } });
            if (!found) {
                await bookModel.create(b);
                console.log(`Inserted: ${b.title}`);
            }
        }
        console.log('Seeding finished');
    }
    finally {
        await appContext.close();
    }
}
main();
//# sourceMappingURL=seed-books-db.js.map