# Eupatheia

**Eupatheia** is a modern, responsive web platform for sharing, discovering, and reflecting on positive emotional wellness quotes. Inspired by the ancient Greek concept of "good emotion" and flourishing, Eupatheia helps users cultivate emotional health, self-care, and community support.

## Features

- 🌱 **Curated Emotional Wellness Quotes:** Browse and share thousands of uplifting quotes focused on emotional health, self-care, and positivity.
- 👥 **Community Encouragement:** Join a supportive community, celebrate milestones, and encourage others on their wellness journey.
- 📝 **Personal Growth:** Create your own quotes, track your progress, and build habits for lasting positive change.
- 🔒 **User Authentication:** Secure sign up, sign in, and profile management.
- 📱 **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- 🎨 **Modern UI:** Clean, calming interface with beautiful gradients and custom branding.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (or your preferred database)
- **NextAuth.js** (Authentication)
- **Tailwind CSS** (Styling)
- **React** (Components)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/eupatheia.git
cd eupatheia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your database and authentication secrets.

```bash
cp .env.example .env.local
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **Logo:** Replace `public/logo2.png` with your own logo.
- **Favicon:** Place your favicon in `public/favicon.ico`.
- **Colors & Branding:** Adjust Tailwind config or CSS variables as needed.

## Folder Structure

```
src/
  app/
    header/
      NavBar.tsx
      page.tsx
    profile/
    quotes/
    ...
  lib/
  components/
public/
  logo2.png
  favicon.ico
prisma/
  schema.prisma
```

## License

This project is licensed under the MIT License.

---

**Eupatheia** —
