let baseURL = '/';
let browserBaseURL = '/';

if (process.env.NODE_ENV === 'development' && !process.env.NODE_DEV) {
  baseURL = 'http://10.201.0.136:8070';
  browserBaseURL = '/';
} else {
  baseURL = 'http://10.201.0.157:8070';
}

// ll origin develop
// Configuration output for backend console
if (!process.browser) {
  console.log(
    `Configurations !!!!!!:
   NODE_ENV`, process.env.NODE_ENV, `
   baseURL`, process.env.API_URL || baseURL, `
   browserBaseURL`, process.env.API_URL_BROWSER || browserBaseURL
  )
}
