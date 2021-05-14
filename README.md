My first attempt to create a app using React Native and Expo.

Link to backend repo: https://github.com/eriktoger/MovieAppBackend

Start frontend with: expo start

The app connects to the backend through the baseUrl in Variables.js:

```javascript
export default ENV = {
  dev: {
    baseUrl: "url-to-backend",
  },
  staging: {
    baseUrl: "url-to-backend",
  },
  prod: {
    baseUrl: "url-to-backend",
  },
};
```
