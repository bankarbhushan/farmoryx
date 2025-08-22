 // this is the program that will be the function of req ,res
const asyncHandler = (requestHandler) => {
  (req,res,next) =>{
    Promise.resolve(requestHandler(req,res,next))
    .catch((err)=>next(err))
  }
}

export {asyncHandler}

//here we pass the data and return the function 



// M2 to handle the async req,res

// const asyncHandler = (requestHandler) => async (req, res, next) => {
//   try {
//     await requestHandler(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.code,
//     });
//   }
// };