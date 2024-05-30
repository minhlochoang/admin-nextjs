"use server";
import { signIn } from "../auth";
import { AuthError } from 'next-auth';


export const authenticate = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};


// export const authenticate = async (formData) => {
//   const { email, password } = Object.fromEntries(formData);

//   try {
//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (!res.ok) {
//       if (res.error === "CredentialsSignin") {
//         return "Wrong Credentials";
//       }
//       return "An unexpected error occurred";
//     }

//     return "Success";
//   } catch (err) {
//     throw err;
//   }
// };