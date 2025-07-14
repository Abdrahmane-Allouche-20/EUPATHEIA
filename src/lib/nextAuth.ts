import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      createdAt?: Date;
    };
  }
  
  interface User {
    isAdmin?: boolean;
  }
  
  // Add JWT interface declaration
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    name?: string | null;
    image?: string | null;
  }
}

// Helper function to generate default avatar
const generateDefaultAvatar = (name: string | null | undefined, email: string | null | undefined) => {
  const seed = name || email?.split('@')[0] || 'user';
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=6366f1,8b5cf6,d946ef&fontSize=50`;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image || generateDefaultAvatar(user.name, user.email),
            isAdmin: user.isAdmin || false,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt", // Use JWT for credentials login
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    // JWT callback - runs whenever a JWT is created, updated, or accessed
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.isAdmin = user.isAdmin;
      }
      
      // For OAuth providers, fetch user data from database
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email! }
          });
          
          if (dbUser) {
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.image = dbUser.image || generateDefaultAvatar(dbUser.name, dbUser.email);
            token.isAdmin = dbUser.isAdmin;
            
            // Update user image in database if it doesn't exist
            if (!dbUser.image) {
              await prisma.user.update({
                where: { id: dbUser.id },
                data: { image: generateDefaultAvatar(dbUser.name, dbUser.email) }
              });
            }
          }
        } catch (error) {
          console.error("Error fetching user from database:", error);
        }
      }
      
      return token;
    },
    
    // Session callback - runs whenever a session is checked
    async session({ session, token }) {
      // Always use token data for JWT strategy
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.image = token.image as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      
      return session;
    },
    
    // Sign in callback
    async signIn({ user, account, profile }) {
      // For OAuth providers, ensure user has a default image
      if (account?.provider === "google" || account?.provider === "github") {
        if (!user.image) {
          user.image = generateDefaultAvatar(user.name, user.email);
        }
      }
      return true;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("User signed in:", { 
        user: user.email, 
        provider: account?.provider,
        id: user.id,
        image: user.image,
        name: user.name
      });
    }
  },
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};
