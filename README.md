# BookNest - Online Book Borrowing Platform

A seamless and modern web application designed to digitize the traditional library experience. Users can explore a vast collection of books, filter by categories, and borrow titles digitally.

**Live URL:** https://b13-a8-online-book-borrowing-platro.vercel.app/

## Purpose

BookNest aims to provide a user-friendly digital library platform where readers can:
- Browse and discover books across multiple categories
- Borrow books digitally with a single click
- Manage their profile and borrowing history
- Experience a modern, responsive interface

## Key Features

### Home Page
- Eye-catching banner with "Find Your Next Read" call-to-action
- Scrolling marquee showcasing new arrivals and special offers
- Featured books section with top picks
- New Arrivals carousel powered by SwiperJS
- Browse by Category quick links
- Statistics section showing platform metrics

### Authentication
- Email/Password login and registration
- Google OAuth integration
- Secure session management with BetterAuth
- Toast notifications for user feedback

### All Books Page
- Full book catalog with search functionality
- Category sidebar for filtering (Story, Tech, Science)
- Responsive grid layout with book cards
- Real-time search filtering

### Book Details
- Large book cover display with detailed information
- Available quantity indicator
- Borrow functionality (requires login)
- Redirect to login for unauthenticated users

### My Profile
- View user information (name, email, profile picture)
- Update profile information (name and image)
- Protected route - requires authentication

### UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Modern gradient hero section
- Smooth hover animations on book cards
- Toast notifications for all user actions
- DaisyUI components for consistent styling

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** DaisyUI v5
- **Authentication:** BetterAuth
- **Database:** MongoDB
- **Animations:** SwiperJS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database
- Google OAuth credentials (for Google login)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sadatrahman3/B13-A8-Online-Book-Borrowing-Platrorm.git
cd B13-A8-Online-Book-Borrowing-Platrorm
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/auth/[...all]/     # BetterAuth API routes
│   ├── books/                 # All books & book details pages
│   ├── login/                 # Login page
│   ├── profile/               # Profile & update pages
│   ├── register/              # Registration page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/                # Reusable components
├── data/                      # Book JSON data
├── lib/                       # Auth configuration
└── public/                    # Static assets
```

## npm Packages Used

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^16.2.4 | React framework |
| react | ^19.2.5 | UI library |
| better-auth | latest | Authentication |
| mongodb | latest | Database driver |
| swiper | latest | Carousel/slider |
| swr | latest | Data fetching |
| lucide-react | latest | Icons |
| react-hot-toast | latest | Toast notifications |
| tailwindcss | ^4.2.4 | CSS framework |
| daisyui | ^5.5.19 | UI components |

## Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy

## License

This project is created for educational purposes as part of the Programming Hero assignment.
