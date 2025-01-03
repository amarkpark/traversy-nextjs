import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // This will prevent reuse of last Google Account used
          // and prompt user to select a Google Account
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the Db
      // 2. Check if user exists
      // 3. Else create user
      // Return "true" to allow sign in
    },
    // Session callback function that modifies session object
    async session({ session }) {
      // 1. Get user from Db
      // 2. Assign user id from the session
      // 3. Return the session
    }
  }
}