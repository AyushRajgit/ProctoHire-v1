import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import { toast } from 'react-hot-toast'

function HomePage() {
  return (
    <div>
      <button className="bg-amber-600"onClick={() => toast.error("Hello")}>Click Me</button>

      <SignedOut>
        <SignInButton mode="modal">
            <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  )
}

export default HomePage
