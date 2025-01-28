// File: app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Fitness Coach',
  description: 'Your personal AI-powered fitness coach',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

// File: app/components/auth/SignInButton.tsx
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

export function SignInButton() {
  return (
    <ClerkSignInButton mode="modal">
      <button className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition-colors">
        Sign In
      </button>
    </ClerkSignInButton>
  );
}

// File: app/components/auth/UserButton.tsx
import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export function UserButton() {
  return (
    <ClerkUserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: "h-10 w-10"
        }
      }}
    />
  );
}

// File: app/components/layout/Navbar.tsx
import { currentUser } from "@clerk/nextjs";
import { SignInButton } from "../auth/SignInButton";
import { UserButton } from "../auth/UserButton";

export async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">AI Fitness Coach</h1>
          </div>
          <div className="flex items-center">
            {user ? <UserButton /> : <SignInButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
