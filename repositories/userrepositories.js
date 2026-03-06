import { supabase } from "../supabase/supabase.js";
import { AppError } from "../utils/apperror.js";

export const createUser = async (userData, hashedPassword) => {
    const { data, error } = await supabase
    .from('Users')
    .insert({
        email: userData.email,
        password: hashedPassword,
        firstname: userData.firstName,
        lastname: userData.lastName,
        role: userData.role,
        country: userData.location.country,
        state: userData.location.state,
        city: userData.location.city
    })
    .select()
    .single();

    console.log(data, error);
    if(error && error.code != "") {
        throw new AppError(error.message, 409)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data
}

export const getUserByEmail = async (email) => {
    const { data, error} = await supabase
    .from('Users')
    .select()
    .eq('email', email)
    .single()
    
    console.log(data,error)
    // console.log(data.email)
    if(error && error.code != "") {
        throw new AppError(error.message, 409)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    } else if (!data.email) {
        throw new AppError("Incorrect user email", 401)
    }
    return data
}

export const getAllUsers = async () => {
    const { data, error} = await supabase
    .from('Users')
    .select()

    if(error && error.code != "") {
        throw new AppError(error.message, 409)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data
}

export const getUserById = async (id) => {
    const { data, error} = await supabase
    .from('Users')
    .select('id, created_at, email, firstname, lastname, role, country, state, city')
    .eq('id', id)
    .single()
    
    console.log(data,error)
    // console.log(data.email)
    if(error && error.code != "") {
        throw new AppError(error.message, 409)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    } else if (!data.email) {
        throw new AppError("Incorrect user id", 401)
    }
    
    return data
}

export const editUserById = async (userData, id) => {
    const { data, error } = await supabase
    .from('Users')
    .update({
       email: userData.email,
       firstname: userData.firstName,
       lastname: userData.lastName,
       role: userData.role,
       country: userData.location.country,
       state: userData.location.state,
       city: userData.location.city 
    })
    .match({id: id})
    .select('id, created_at, email, firstname, lastname, role, country, state, city')
    .single();

    console.log(data, error)
    if(error && error.code != "") {
        throw new AppError(error.message, 404)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data
}

//TODO make a single editUserBy
export const editUserByEmail = async (userData, email) => {
    const { data, error } = await supabase
    .from('Users')
    .update({
       email: userData.email,
       firstname: userData.firstName,
       lastname: userData.lastName,
       role: userData.role,
       country: userData.location.country,
       state: userData.location.state,
       city: userData.location.city 
    })
    .match({id: id})
    .select('id, created_at, email, firstname, lastname, role, country, state, city')
    .single();

    console.log(data, error)
    if(error && error.code != "") {
        throw new AppError(error.message, 404)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data
}

export const passwordResetByEmail = async (passResetData, email) => {
    const { data, error } = await supabase
    .from('Users')
    .update({
       password_reset_token: passResetData.hashedResetToken,
       password_reset_expires: passResetData.passwordResetExpires
    })
    .match({email: email})
    .select('id, created_at, email, firstname, lastname, role, country, state, city')
    .single();

    console.log(data, error)
    if(error && error.code != "") {
        throw new AppError(error.message, 404)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    //TODO do i need to return this?
    return data
}
