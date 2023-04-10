export const env: any = {
  backEnd: {
    url: process.env.REACT_APP_POS_BACK_BE_URL,
    timeout: process.env.REACT_APP_POS_BACK_BE_TIME_OUT,
  },
  printer: {
    url: process.env.REACT_APP_POS_BACK_PRINTER,
    timeout: process.env.REACT_APP_POS_BACK_BE_TIME_OUT,
  },
  keycloak: {
    url: {
      authentication: process.env.REACT_APP_KEYCLOAK_AUTHENTICATION_URL,
      refreshToken: process.env.REACT_APP_KEYCLOAK_REFRESH_TOKEN_URL,
      logout: process.env.REACT_APP_KEYCLOAK_LOGOUT_URL,
    },
    grantType: process.env.REACT_APP_KEYCLOAK_GRANT_TYPE,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
    timeout: process.env.REACT_APP_KEYCLOAK_TIME_OUT,
  },
  branch: {
    titleBranch: process.env.REACT_APP_TITLE_BRANCH,
    defaultBranchCodeHQ: process.env.REACT_APP_DEFAULT_BRANCH_CODE_HQ,
  },
  dc: {
    percent: process.env.REACT_APP_DC_PERCENT,
  },
  currency: process.env.REACT_APP_CURRENCY,
  stockAdjust: {
    timeoutNoEvent: process.env.REACT_APP_TIME_MINUTE_NO_EVENT_SA,
  },
  role: {
    multiChannel: process.env.REACT_APP_AUTH_ROLE_MULTI_CHANNEL,
  },
};
