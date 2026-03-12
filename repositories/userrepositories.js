import { supabase } from "../supabase/supabase.js";
import { AppError } from "../utils/apperror.js";

const errorThrow = (error) =>{
    if(error && error.code != "") {
        throw new AppError(error.message, 409)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }
}

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
    .single('id, created_at, email, firstname, lastname, role, country, state, city');

    console.log(data, error);
    errorThrow(error)

    return data
}

export const getUserByEmailorId = async (email=null, id=null) => {
    let query = supabase
    .from('Users')
    .select()

    if (email) { query = query.eq('email', email) }
    if (id) { query = query.eq('id', id) }
    
    const { data, error } = await query
        .single()

    console.log(data,error)
    errorThrow(error)
    return data
}

export const getAllUsers = async () => {
    const { data, error} = await supabase
    .from('Users')
    .select('id, created_at, email, firstname, lastname, role, country, state, city')

    errorThrow(error)

    return data
}

export const getUserByPasswordResetToken = async (resetToken) => {
    const { data, error} = await supabase
    .from('Users')
    .select('id, created_at, email, firstname, lastname, role, country, state, city')
    .eq('password_reset_token', resetToken)
    .gt('password_reset_expires', new Date().toISOString())
    .single()
    
    console.log(data,error)
    errorThrow(error)
    
    return data
}

export const editUserByEmailorId = async (email, id, userData) => {
    let query = supabase
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
        .select('id, created_at, email, firstname, lastname, role, country, state, city')

    if (email) { query = query.eq('email', email) }
    if (id) { query = query.eq('id', id) }

    const { data, error } = await query
        .single()

    console.log(data, error)
    errorThrow(error)

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
    errorThrow(error)

    //TODO do i need to return this?
    return data
}

export const editPassword = async (id, hashedPassword) => {
    const { data, error } = await supabase
    .from('Users')
    .update({
       password: hashedPassword,
       password_change_at: new Date().toISOString(),
       password_reset_token: null,
       password_reset_expires: null
    })
    .eq('id', id)
    .select('id, created_at, email, firstname, lastname, role, country, state, city')
    .single();

    console.log(data, error)
    errorThrow(error)

    return data
}

export const deleteUserById = async (id) => {
    const { data, error} = await supabase
    .from("Users")
    .delete()
    .eq('id', id)
    .select()
    .single()

    console.log(data, error)
    errorThrow(error)

    return data
}
