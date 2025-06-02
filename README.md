# UIC Gradebook: Grade Distribution Search & Visualization

A modern web application for searching and visualizing University of Illinois Chicago (UIC) grade distributions. Built with Next.js, TypeScript, Supabase, and PostgreSQL, it features secure user registration, API key management, flexible search, and beautiful data visualizations.

---

## Features

- **Search UIC Grade Distributions:** Flexible, case-insensitive, partial/exact search by course, instructor, term, etc.
- **Data Visualization:** (Planned) Interactive bar charts of grade distributions using Airbnb visx.
- **User Registration & Authentication:** Secure email/password auth via Supabase Auth.
- **API Key Management:** Self-serve API key generation, storage, and (future) rate limiting.
- **RESTful API Endpoints:** For search, registration, user profile management, and more.
- **User Account Management:** Update/delete profile, manage API keys.
- **Modern UI/UX:** Built with shadcn/ui, Tailwind CSS, and React.
- **Robust Data Migration:** TypeScript script to import CSV grade data into Supabase/PostgreSQL.
- **Security Best Practices:** Row Level Security (RLS), hashed API keys, and scoped access.

---

## Technologies Used

- **Frontend:**

  - [Next.js](https://nextjs.org/) (App Router, SSR, API routes)
  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/) (UI components)
  - [Airbnb visx](https://airbnb.io/visx/) (planned, for charts)

- **Backend & Database:**

  - [Supabase](https://supabase.com/) (PostgreSQL, Auth, API)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Supabase Auth](https://supabase.com/docs/guides/auth)

- **Other:**
  - [CSV Data Migration Script](scripts/migrate-grade-distributions.ts)
  - [Vercel](https://vercel.com/) (deployment, optional)

---

## Database Schema

### Tables

#### `grade_distributions`

- `id` (uuid, PK)
- `term` (text)
- `year` (integer)
- `subject` (text)
- `course_number` (text)
- `section` (text)
- `instructor` (text)
- `enrollment` (integer)
- `a_count`, `b_count`, `c_count`, `d_count`, `f_count`, `other_grades` (integer)
- `created_at` (timestamp)

#### `profiles` (public, user-managed)

- `id` (uuid, PK, references auth.users)
- `email` (text, unique)
- `full_name` (text, nullable)
- `created_at` (timestamp)

#### `api_keys`

- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles.id)
- `hashed_key` (text)
- `created_at` (timestamp)
- `last_used_at` (timestamp, nullable)
- `revoked` (boolean, default false)
- (future) `rate_limit` (integer)

### Relationships

- `profiles.id` references `auth.users.id`
- `api_keys.user_id` references `profiles.id`

### Security

- **Row Level Security (RLS):** Enabled on all user data tables.
- **API keys:** Only hashed keys stored; never exposed after creation.

---

## API Endpoints

All endpoints are versioned under `/api/v1/`.

- `POST /api/v1/(auth)/register` — Register user, create profile, generate API key
- `POST /api/v1/search` — Search grade distributions (flexible query)
- `PATCH /api/v1/users` — Update user profile
- `DELETE /api/v1/users` — Delete user/profile

**Authentication:**

- Most endpoints require a valid API key in the `Authorization` header: `Bearer <API_KEY>`

---

## UI Libraries & Planned Visualizations

- **shadcn/ui:** Modern, accessible React UI components (buttons, forms, modals, etc.)
- **Tailwind CSS:** Utility-first styling for rapid, consistent design
- **Airbnb visx:** (Planned) Bar charts and visualizations for grade distributions on the search/results page

---

## Setup & Development

1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-username/uic-gradebook.git
   cd uic-gradebook
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or yarn, pnpm, bun
   ```
3. **Configure Supabase:**
   - Create a Supabase project
   - Set up tables and RLS policies (see schema above)
   - Add your Supabase URL and anon key to `.env.local`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     ```
4. **Migrate grade data:**
   - Place CSVs in `public/data/`
   - Run the migration script:
     ```sh
     npx ts-node scripts/migrate-grade-distributions.ts
     ```
5. **Run the dev server:**
   ```sh
   npm run dev
   ```
6. **Open [http://localhost:3000](http://localhost:3000)**

---

## Deployment

- Deploy easily to [Vercel](https://vercel.com/) (recommended for Next.js)
- Configure environment variables in Vercel dashboard

---

## Roadmap / Future Work

- Add interactive bar charts for grade distributions (visx)
- Email delivery of API keys
- Paid subscription tier & advanced rate limiting
- User dashboard for API key management
- Improved search filters (by instructor, term, etc.)

---

## License

MIT

---

## Credits

- UIC for grade data
- [Supabase](https://supabase.com/), [Next.js](https://nextjs.org/), [shadcn/ui](https://ui.shadcn.com/), [visx](https://airbnb.io/visx/)

---

## Contact

For questions or contributions, open an issue or PR on GitHub.
