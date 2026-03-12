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
        user_id: user.id,
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

// This is for user
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

//This is for Admin user
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

// This is for Admin user
export const editPositionById = async (updates, id) => {
    //TODO this looks more like a put than a patch since it requires all the information
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

export const editUserApplicationById = async (updates, appId, userId) => {
    // 1) Check that the application user_id match the user id for the appId
     // 2) Update the position
     console.log(appId, userId)
    const { data, error } = await supabase
    .from('Applications')
    //Dont use updates object because the schemaModel is not the same as the schema in the database
    //TODO need to find a way to only update specific field and not the complete resource
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
    .match({id: appId, user_id: userId})
    .select()
    .single()

    console.log(data, error)
    if(error && error.code != "") {
        throw new AppError(error.message, 404)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    } 

    // 3) return the position
    return data
}

export const queryUserApplications = async (filterQuery, userId) => {
    let query = supabase
    .from('Applications')
    .select()
    .eq('user_id', userId)

    const filterConfig = {
        //It requires query as parameter because query is chaning in each iteration of the for
        company: (query) => query = query.ilike('company', filterQuery.company),
        position: (query) => query.ilike('position', `%${filterQuery.position}%`),
        country: (query) => query.ilike('country', filterQuery.country),
        state: (query) => query.ilike('state',filterQuery.state),
        city: (query) => query.ilike('city', filterQuery.city),
        work_mode: (query) => query.ilike('work_mode', filterQuery.work_mode),
        priority: (query) => query.ilike('priority', filterQuery.priority),
        employment_type: (query) => query.ilike('employment_type', filterQuery.employment_type),
        status: (query) => query.ilike('status', filterQuery.status),
        salary_lt: (query) => query.lte('salary', filterQuery.salary_lt),
        salary_gt: (query) => query.gte('salary', filterQuery.salary_gt)
    }

    for (const [key, value] of Object.entries(filterQuery)){
        if (Object.hasOwn(filterConfig, key)){
            query = filterConfig[key](query);
        }
    }

    const { data, error } = await query
    console.log("Data: ", data)
    if(error && error.code != "") {
        return next(new AppError(error.message, 404)) //TODO maybe change error.message to error.details
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
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

export const deleteApplicationById = async (id) => {
    const { data, error } = await supabase
    .from('Applications')
    .delete()
    .eq('id', id)
    .select()
    .single()

    if(error && error.code != "") {
        throw new AppError(error.message, 404)
    } else if (error && !error.code) {
        throw new AppError(error.message, 500)
    }

    return data 
}