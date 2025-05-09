# 📝 Remind Me

**Remind Me** is a personal task and reminder management web app built with `Next.js 15` and `React 19`. It allows users to create color-coded collections and manage tasks with titles and optional due dates. Ideal for organizing your personal or professional life.

---

## ✨ Features

- 🔐 **User Authentication** with `Clerk`.
- 🗂️ Create multiple **collections**, each with a unique color.
- ✅ Add **tasks** to collections:
  - Task title
  - Optional expiry/due date
  - Mark as complete
- 🗑️ **Delete** entire collection.
- 🌙 Beautiful UI using `Radix UI`, `Tailwind CSS`, `Next Themes`, and `Lucide icons`.
- 🔔 Real-time **toast notifications** via `sonner`.

---

## 🧰 Tech Stack

| Tool                | Description                 |
| ------------------- | --------------------------- |
| **Next.js 15**      | Fullstack React framework   |
| **React 19**        | UI library                  |
| **Prisma**          | ORM with SQLite             |
| **Tailwind CSS**    | Utility-first CSS framework |
| **Radix UI**        | Accessible UI components    |
| **Clerk**           | Authentication solution     |
| **React Hook Form** | Form handling               |
| **Zod**             | Schema validation           |
| **Lucide**          | Icon set                    |
| **date-fns**        | Date utilities              |
| **Sonner**          | Toast notifications         |

---

## 📦 Installation & Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/dev-himanshu-karnwal/remind-me
   cd remind-me
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create the `.env` file**

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
   CLERK_SECRET_KEY=''
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=''
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=''
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=''
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=''
   DATABASE_URL=''
   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

---

## 📜 License

This project is licensed under the **MIT License**.

---

> Built with ❤️ by Himanshu

> Stay productive. Never miss a task again.
