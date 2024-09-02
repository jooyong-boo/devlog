export const oAuthProviders = {
  github: {
    id: 1,
    provider: 'github',
  },
  google: {
    id: 2,
    provider: 'google',
  },
} as const;

export type Provider = keyof typeof oAuthProviders;

export interface AccessToken {
  access_token: string;
  token_type: string;
  scope: string;
  provider: Provider;
  type: string;
  providerAccountId: string;
}

export interface SignUpRequestData {
  email: string;
  id: string;
  nickname: string;
  profile: string;
  accessToken: AccessToken;
}
