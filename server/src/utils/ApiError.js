class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something wents wrong",
    errors = [], // from here we pass the multiple error.
    stack = "" // this is also used for the error stack.
  ) {
    // here we overried the constructor value
    // we can add the things that we can add the function.
    super(message);
    (this.statusCode = statusCode),
    (this.data = null),
    (this.message = message);
    this.success = false;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
      // if the stack of the error prensent or not
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


export {ApiError}