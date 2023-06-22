import dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'

dotenv.config()

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function getGoogleOAuthTokens(
  { code }: { code: string }
): Promise<GoogleTokensResult> {
  const URL = 'https://oauth2.googleapis.com/token'
  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URL,
    grant_type: 'authorization_code'
  }

  try {
    const response = await axios.post<GoogleTokensResult>(
      URL,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.log(error, 'oauth')
    throw new Error(error.message)
  }
}

interface GoogleInfos {
  id_token: string;
  access_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({ id_token, access_token }: GoogleInfos): Promise<GoogleUserResult> {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    }
  );

  return response.data
}

