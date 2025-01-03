import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

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
    // I feel like this should be called "verifyUserOrCaptureNewUserData"
    async signIn({ profile }) {
      // 1. Connect to the Db
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. Else create user
      if (!userExists) {
        // Truncate username
        const username = profile.name.slice(0, 20);

        // @TODO this needs error-handling try-catch
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // Return "true" to allow sign in
      return true;
    },
    // Session callback function that modifies session object
    async session({ session }) {
      // 1. Get user from Db
      const currentUser = await User.findOne({email: session.user.email});
      // 2. Assign user id from the session
      session.user.id = currentUser._id.toString();
      // 3. Return the session
      return session;
    }
  }
}