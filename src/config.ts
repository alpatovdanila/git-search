export default {
  appName: "Github Repositories Search",
  appDomain: process.env.REACT_APP_APP_DOMAIN,
  appBase: process.env.REACT_APP_APP_BASE || '',
  github: {
    username: process.env.REACT_APP_GIT_USERNAME,
    secret: process.env.REACT_APP_GIT_SECRET,
  },
};
