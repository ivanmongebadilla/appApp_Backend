export const userPaths = {    
    "/user": {
      get: {
        summary: "Get all users",
        responses: {
          "200": {
            description: "List of users"
          }
        }
      }
    }, 

    "/user/signup": {
        post: {
          summary: "Log in user",

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                    schema: {
                        $ref: "#/components/schemas/SignUp"
                    }
                    }
                }
            },
            
            responses: {
                "200": {
                    description: "Log in a user",
                    content: {
                        "application/json": {
                            schema: {
                            $ref: "#/components/schemas/SignedUp"
                            }
                        }
                    }
                }
            }
        }
    },

    "/user/login": {
      post: {
        summary: "Log in user",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LogInInput"
              }
            }
          }
        },

        responses: {
          "200": {
            description: "Log in a user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoggedIn"
                }
              }
            }
          }
        }
      }
    }
}