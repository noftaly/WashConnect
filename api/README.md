# WashConnect API

## Stack Specs

- Node.js (Platform)
- Express (Router)
- Prisma (ORM)
- MySQL (Database)
- Zod (Schema Validator)

## 🧬 Development

- Install dependencies
```
npm i
```

- Create a Database in MySQL (or use a GUI to create a database)
```
CREATE DATABASE washconnect;
```

- Duplicate the `.env.example` file to `.env`
```
cp .env.example .env
```

- Edit the MySQL Details in the `.env` file (take this opportunity to set a long and random string to `SESSION_SECRET`)
```
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DBNAME?schema=public"
```

- Push the Prisma Schema into Database
```
npx prisma migrate dev
```

- Run the development server
```
npm run dev
```

## 🚀 Production Build

- Start the production server
```
npm start
```

## 🗃️ Updating the Database Schema

- Edit the Prisma Schema in `prisma/schema.prisma`
- Push the Prisma Schema into Database
```
npx prisma migrate dev
```

## 🧭 Endpoints

- `POST /resource` - For creating a new "Resource"
- `GET /resource` - For getting all "Resource"
- `GET /resource/{id}` - For getting a "Resource" by ID
- `PATCH /resource/{id}` - For updating a "Resource" by ID
- `DELETE /resource/{id}` - For deleting a "Resource" by ID
