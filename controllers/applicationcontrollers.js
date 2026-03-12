import { catchAsync } from "../utils/catchasync.js"
import { createApplication, getApplicationById, 
    editPositionById, queryApplications, findAllApplications,
    getAllApplicationsByUserId, deleteApplicationById, queryUserApplications, 
    editUserApplicationById} from "../repositories/applicationrepositories.js";
import { json } from "zod";


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

export const editUserPosition = catchAsync(async(req, res, next) => {
    // 1) call the repository to make the changes and pass the application id
    const data = await editUserApplicationById(req.body, req.params.id, req.user.id)

    return res.status(202).json({status: "success", message: "Application edited successfully", data})
})

//For Admin user
export const editPosition = catchAsync(async (req, res, next) => {
    const data = editPositionById(req.body, req.params.id)
    
    return res.status(200).json({status: "success", message: "Application edited successfully", data});
});


//For Admin user
export const getSingleApplication = catchAsync(async(req, res, next) => {
    const data = await getApplicationById(req.params.id)
    
    return res.status(201).json({status: "success", data});
})


export const filterUserApplications = catchAsync(async(req, res, next) => {
    console.log("Query: ", req.query)
    const data = await queryUserApplications(req.query, req.user.id)
    res.status(201).json({status: "success", message: "Applications filtered successfully", data})
})

export const filterApplications = catchAsync(async(req, res, next) => {
    //TODO Test all queries
    const data = await queryApplications(req.query)
    
    res.status(201).json({status: "success", message: "Applications filtered successfully", data})
})

//For admin user
export const deleteApplication = catchAsync(async (req, res, next) => {
    const data = await deleteApplicationById(req.params.id)
    
    res.status(200).json({status: "success", message: "Application deleted successfully"})
})