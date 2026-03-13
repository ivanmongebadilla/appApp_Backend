import { object } from "zod"

export const UserComponent = {
    type: "object",
    properties: {
        id: {type: "number"}, 
        created_at: {type: "string"}, 
        email: {type: "string"}, 
        firstname: {type: "string"}, 
        lastname: {type: "string"}, 
        role: {type: "string"}, 
        country: {type: "string"}, 
        state: {type: "string"}, 
        city: {type: "string"}
    }
}

export const LogInInput = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            format: "email",
            example: "user@email.com"
        },
            password: {
            type: "string",
            example: "mypassword123"
        }
    }
}

export const LoggedIn = {
    type: "object",
    properties: {
        status: {
            type: "string"
        },
        token: {
            type: "string"
        }
    }
}

export const SignUp = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
            example: "user@email.com"
        },
        password: {
            type: "string",
            example: "mypassword123"
        },
        firstName: {
            type: "string",
            example: "FirstName"
        },
        lastName: {
            type: "string",
            example: "LastName"
        },
        role: {
            type: "string",
            enum: ["admin", "user"]
        },
        location: {
            type: "object",
            properties: {
                country: {
                    type: "string",
                    example: "usa"
                },
                state: {
                    type: "string",
                    example: "az"
                },
                city: {
                    type: "string",
                    example: "casa grande"
                }
            }
        }
    }
}

export const SignedUp = {
    type: "object",
    properties: {
        status: {
            type: "string"
        },
        token: {
            type: "string"
        },
        data: {
            $ref: "#/components/schemas/UserComponent"
        }
    }
}