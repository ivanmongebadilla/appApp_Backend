import { LogInInput, LoggedIn, SignUp, UserComponent, SignedUp } from "./components.js"
import { userPaths } from "./paths.js"

export const doc = {
  openapi: "3.0.3",
  info: {
    title: "Job Applications API",
    version: "1.0.0"
  },

  servers: [
    {
      url: "http://localhost:3000/api/v1"
    }
  ],

  components: {
    schemas: {
      LogInInput,
      LoggedIn,
      SignUp,
      UserComponent,
      SignedUp
    }
  },

  paths: {
    ...userPaths
  }
}