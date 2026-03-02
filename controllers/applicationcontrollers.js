import { catchAsync } from "../utils/catchasync.js"
import { supabase } from "../supabase/supabase.js";
import { AppError } from "../utils/apperror.js";


export const addApplication = catchAsync(async (req, res, next) => {
    const { data, error } = await supabase
            .from('Applications')
            .insert({
                user_id: req.body.userid, //TODO Just for now, it should change to get user_id from jwt
                company: req.body.companyName.toLocaleLowerCase(),
                position: req.body.positionTitle.toLocaleLowerCase(),
                employment_type: req.body.employmentType.toLocaleLowerCase(),
                work_mode: req.body.workMode.toLocaleLowerCase(),
                link: req.body.link,
                min_salary: req.body.salary.min,
                max_salary: req.body.salary.max,
                currency: req.body.salary.currency.toLocaleLowerCase(),
                status: req.body.status.toLocaleLowerCase(),
                priority: req.body.priority.toLocaleLowerCase(),
                note: req.body.notes.toLocaleLowerCase(),
                applied_date: req.body.appliedAt,
                country: req.body.location.country.toLocaleLowerCase(),
                state: req.body.location.state.toLocaleLowerCase(),
                city: req.body.location.city.toLocaleLowerCase()
            })
    
        console.log(data, error);
        if(error && error.code != "") {
            return next(new AppError(error.message, 409))
        } else if (error && !error.code) {
            return next(new AppError(error.message, 500))
        }
        return res.status(201).json({status: "success", message: "Application added successfully"});
})

export const editPosition = catchAsync(async (req, res, next) => {
    console.log('⚠️Params: ', req.params)
    const { data, error } = await supabase
        .from('Applications')
        .update({
            company: req.body.companyName,
            position: req.body.positionTitle,
            employment_type: req.body.employmentType,
            work_mode: req.body.workMode,
            link: req.body.link,
            min_salary: req.body.salary.min,
            max_salary: req.body.salary.max,
            currency: req.body.salary.currency,
            status: req.body.status,
            priority: req.body.priority,
            note: req.body.notes,
            applied_date: req.body.appliedAt,
            country: req.body.location.country,
            state: req.body.location.state,
            city: req.body.location.city
        })
        .match({id: req.params.id})
        .select()
        .single();
    
        // console.log(data, error);
        if(error && error.code != "") {
            return next(new AppError(error.message, 404))
        } else if (error && !error.code) {
            return next(new AppError(error.message, 500))
        }
        return res.status(200).json({status: "success", message: "Application edited successfully", data});
});

export const getSingleApplication = catchAsync(async(req, res, next) => {
    const { data, error } = await supabase
    .from("Applications")
    .select()
    .eq('id', req.params.id)
    .single()

    console.log(data, error);
    if(error && error.code != "") {
        return next(new AppError(error.message, 404)) //TODO maybe change error.message to error.details
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
    }
    return res.status(201).json({status: "success", message: "Application edited successfully", data});
})

export const filterApplications = catchAsync(async(req, res, next) => {
    console.log('Query: ', req.query)

    let query = supabase
    .from("Applications")
    .select()

    const filterConfig = {
        //TODO add filer for date range
        //TODO add filter for searching a position 
        company: (query,value) => query.ilike('company', req.query.company),
        // position: (query,value) => query.contains('position', req.query.position.toLocaleLowerCase()),
        country: (query,value) => query.ilike('country', req.query.country.toLocaleLowerCase()),
        state: (query, value) => query.ilike('state',req.query.state.toLocaleLowerCase()),
        city: (query, value) => query.ilike('city', req.query.city.toLocaleLowerCase()),
        work_mode: (query, value) => query.ilike('work_mode', req.query.work_mode.toLocaleLowerCase()),
        priority: (query, value) => query.ilike('priority', req.query.priority.toLocaleLowerCase()),
        employment_type: (query, value) => query.ilike('employment_type', req.query.employment_type.toLocaleLowerCase()),
        status: (query, value) => query.ilike('status', req.query.status.toLocaleLowerCase()),
        salary_lt: (query, value) => query.lte('salary', req.query.salary_lt),
        salary_gt: (query, value) => query.gte('salary', req.query.salary_gt)
    }

    for (const [key,value] of Object.entries(req.query)){
        if(Object.hasOwn(filterConfig, key) && value !== undefined){
            query = filterConfig[key](query, value);
            // console.log('Query: ', query);
        }
    }
    
    const { data, error } = await query

    if(error && error.code != "") {
        return next(new AppError(error.message, 404)) //TODO maybe change error.message to error.details
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
    }
    res.status(201).json({status: "success", message: "Applications filtered successfully", data})
})