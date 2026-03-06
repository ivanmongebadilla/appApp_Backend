import { supabase } from "../supabase/supabase.js";
import { AppError } from "../utils/apperror.js";

export const findAllApplications = async () => {
    const { data, error } = await supabase
    .from('Applications')
    .select();

    console.log(data,error)
    if(error && error.code != "") {
        throw new AppError(error.message, 409)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data
}

export const createApplication = async (application, user) => {
    const { data, error } = await supabase
    .from('Applications')
    .insert({
        user_id: user.id, //TODO Just for now, it should change to get user_id from jwt
        company: application.companyName.toLocaleLowerCase(),
        position: application.positionTitle.toLocaleLowerCase(),
        employment_type: application.employmentType.toLocaleLowerCase(),
        work_mode: application.workMode.toLocaleLowerCase(),
        link: application.link,
        min_salary: application.salary.min,
        max_salary: application.salary.max,
        currency: application.salary.currency.toLocaleLowerCase(),
        status: application.status.toLocaleLowerCase(),
        priority: application.priority.toLocaleLowerCase(),
        note: application.notes.toLocaleLowerCase(),
        applied_date: application.appliedAt,
        country: application.location.country.toLocaleLowerCase(),
        state: application.location.state.toLocaleLowerCase(),
        city: application.location.city.toLocaleLowerCase()
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

export const getAllApplicationsByUserId = async (userId) => {
    const { data, error } = await supabase
    .from("Applications")
    .select()
    .eq('user_id', userId)

    console.log(data, error);
    if(error && error.code != "") {
        throw new AppError(error.message, 404) //TODO maybe change error.message to error.details
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }
    return data
}

export const getApplicationById = async (id) => {
    const { data, error } = await supabase
    .from("Applications")
    .select()
    .eq('id', id)
    .single()

    console.log(data, error);
    if(error && error.code != "") {
        throw new AppError(error.message, 404) //TODO maybe change error.message to error.details
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }
    return data
}

export const editPositionById = async (updates, id) => {
    const { data, error } = await supabase
    .from('Applications')
    .update({
        company: updates.companyName,
        position: updates.positionTitle,
        employment_type: updates.employmentType,
        work_mode: updates.workMode,
        link: updates.link,
        min_salary: updates.salary.min,
        max_salary: updates.salary.max,
        currency: updates.salary.currency,
        status: updates.status,
        priority: updates.priority,
        note: updates.notes,
        applied_date: updates.appliedAt,
        country: updates.location.country,
        state: updates.location.state,
        city: updates.location.city
    })
    .match({id: id})
    .select()
    .single();

    // console.log(data, error);
    if(error && error.code != "") {
        throw new AppError(error.message, 404)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data
}

export const queryApplications = async (query) =>{
    let newQuery = supabase
    .from("Applications")
    .select()

    const filterConfig = {
        applied_date: (newQuery, value) => newQuery.eq('applied_date', query.applied_date),
        company: (newQuery,value) => newQuery.ilike('company', query.company),
        position: (newQuery,value) => newQuery.ilike('position', `%${query.position.toLocaleLowerCase()}%`),
        country: (newQuery,value) => newQuery.ilike('country', query.country.toLocaleLowerCase()),
        state: (newQuery, value) => newQuery.ilike('state',query.state.toLocaleLowerCase()),
        city: (newQuery, value) => newQuery.ilike('city', query.city.toLocaleLowerCase()),
        work_mode: (newQuery, value) => newQuery.ilike('work_mode', query.work_mode.toLocaleLowerCase()),
        priority: (newQuery, value) => newQuery.ilike('priority', query.priority.toLocaleLowerCase()),
        employment_type: (newQuery, value) => newQuery.ilike('employment_type', query.employment_type.toLocaleLowerCase()),
        status: (newQuery, value) => newQuery.ilike('status', query.status.toLocaleLowerCase()),
        salary_lt: (newQuery, value) => newQuery.lte('salary', query.salary_lt),
        salary_gt: (newQuery, value) => newQuery.gte('salary', query.salary_gt)
    }

    for (const [key,value] of Object.entries(query)){
        if(Object.hasOwn(filterConfig, key) && value !== undefined){
            newQuery = filterConfig[key](newQuery, value);
            // console.log('Query: ', query);
        }
    }
    
    const { data, error } = await newQuery

    if(error && error.code != "") {
        return next(new AppError(error.message, 404)) //TODO maybe change error.message to error.details
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
    }

    return data
}