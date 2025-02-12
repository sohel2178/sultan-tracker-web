import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      accountType: string; // ✅ Add your custom property here
    };
  }
}
