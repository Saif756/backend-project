const asynHandler = (requestHandler) => {
   return  (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asynHandler}


// asynHandler higher order function

// const asynHandler = (func) => async (req,res,next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }