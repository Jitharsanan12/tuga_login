import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from './config';

export const TOKEN_STORAGE_KEY = 'tuga_access_token';

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);

  // The accessToken lives on the credential, not on the user object
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const accessToken = credential?.accessToken;

  if (!accessToken) {
    throw new Error('Google did not return an access token');
  }

  return { user: result.user, accessToken };
}