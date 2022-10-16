import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';
import { MongoClient } from "mongodb"

export default NextAuth({
    //Configure JWT
    session: {
        jwt: true,
    },
    
    pages: {
    signIn: '/login',
    signOut: '/app/me', 
    },
  
    //Specify Provider
    providers: [
        CredentialsProvider({
            async authorize(credentials,req) {
              console.log('connecting'); 
                //Connect to DB
                const client = await MongoClient.connect(
                    `mongodb+srv://jossycodes:hbzZ2r0QaVEjbuXa@cluster0.leapx5l.mongodb.net/smartsaver_data?retryWrites=true&w=majority`,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                ); 
                //Get all the users
                const users = await client.db().collection('users');
                //Find user with the email  
                const result = await users.findOne({
                    phone: credentials.phone}); 
                //Not found - send error res
                if (!result) {
                    client.close();
                    //throw new Error('Incorrect username or password');
                    console.log('not found');
                    return null
                }
                
                
                //Check hased password with DB password
                const checkPassword = await compare(credentials.password, result.password); 
                //Incorrect password - send response
                if (!checkPassword) {
                    client.close();
                    //throw new Error('Incorrect username or password');
                    return null
                } 
                //Else send success response
                if(result) {
                client.close();
                return result;
                } else {
                  return null; 
                }

            }, 
        }),
    ],
    
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: 'RE3zQYlVLLqKa+8v6l8TNOl3kuVhGY4v1ceHoFxYK/I='
});   
