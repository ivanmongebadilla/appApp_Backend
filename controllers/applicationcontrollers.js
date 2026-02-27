import { catchAsync } from "../utils/catchasync.js"
import { supabase } from "../supabase/supabase.js";
import { AppError } from "../utils/apperror.js";


export const addApplication = catchAsync(async (req, res, next) => {
    const { data, error } = await supabase
            .from('Applications')
            .insert({
                user_id: req.body.userid, //TODO Just for now, it should change to get user_id from jwt
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
    
        console.log(data, error);
        if(error && error.code != "") {
            return next(new AppError(error.message, 404))
        } else if (error && !error.code) {
            return next(new AppError(error.message, 500))
        }
        return res.status(204).json({status: "success", message: "Application edited successfully", data});
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