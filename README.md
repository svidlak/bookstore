# Booskstore 

A simple Fullstack application that displays a list of books with the ability to create, edit and delete books.

This is by no means a production ready product, but its a nice demonstration of some of my skills.

[Live demo](https://book-store.fly.dev/) 

## Getting Started



### Prerequisites

- [Node.js 18 or higher](https://nodejs.org/en)
- [Turso account for database](https://turso.tech/)

### Installing
Clone the repo locally:

    git clone https://github.com/svidlak/bookstore.git


**Client and server are present on the same git repo, so you will need to have 2 open terminals:**

Client:

    cd client
    npm ci
    npm run dev

Backend:

    cd server
    npm ci
    npm run dev

After installation steps we need to configure our database:

    Make a Turso account (https://turso.tech/)
    Create a new database
    Dump books_table.sql file inside your DB
    Create .env file from .env.example with the appropriate Turso credentials

And you're ready to go :)
## Running the tests

Tests implemented for server only as for now:

    npm run test


## Built With
Client stack:
- [React](https://react.dev/) powered by [Vite](https://vitejs.dev/)
- [React query](https://tanstack.com/query/v3/)
- [React Bootstrap components](https://react-bootstrap.netlify.app/)
- [Zustand](https://zustand-demo.pmnd.rs/) state manager
- Styling with [Sass](https://sass-lang.com/)

Backend Stack:
- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) schema validations
- [Tsyringe](https://github.com/microsoft/tsyringe) dependancy injection 
- [Turso](https://turso.tech/) SQLite DB
- [Drizzle ORM](https://orm.drizzle.team/)

## Authors

  - **Max Svidlo** (Me)

## License

This project is licensed under the [CC0 1.0 Universal](LICENSE.md)
Creative Commons License - see the [LICENSE.md](LICENSE.md) file for
details

## Acknowledgments

  - Hat tip to anyone whose code is used