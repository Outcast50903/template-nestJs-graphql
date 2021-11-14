import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export const createGoogleUser = (): OAuth2Client =>
  new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URL,
  });

export const GOOGLE_OAUTH = 'GOOGLE_OAUTH';
