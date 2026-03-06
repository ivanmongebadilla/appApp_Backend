import { catchAsync } from "../utils/catchasync.js"
import { createApplication, getApplicationById, 
    editPositionById, queryApplications, findAllApplications,
    getAllApplicationsByUserId } from "../repositories/applicationrepositories.js";


export const getAllApplications = catchAsync(async (req,res,next) => {
    const data = await findAllApplications()

    return res.status(201).json({status: "success",  data});
})

export const getAllUserApplications = catchAsync(async (req, res, next) => {
    const data = await getAllApplicationsByUserId(req.user.id)

    return res.status(201).json({status: "success", data});
})

export const addApplication = catchAsync(async (req, res, next) => {
    const data = await createApplication(req.body, req.user)
    
    return res.status(201).json({status: "success", message: "Application added successfully", data});
})

export const editPosition = catchAsync(async (req, res, next) => {
    const data = editPositionById(req.body, req.params.id)
    
    return res.status(200).json({status: "success", message: "Application edited successfully", data});
});

export const getSingleApplication = catchAsync(async(req, res, next) => {
    const data = await getApplicationById(req.params.id)
    
    return res.status(201).json({status: "success", data});
})

export const filterApplications = catchAsync(async(req, res, next) => {
    //TODO Test all queries
    const data = await queryApplications(req.query)
    
    res.status(201).json({status: "success", message: "Applications filtered successfully", data})
})