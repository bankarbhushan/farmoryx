class ApiResponse {
    constructor(statusCode,data,message="Success"){
        this.statusCode = statusCode
        this.data= data
        this.message = message
        this.success = statusCode < 400
        //all the status code 300 to 400 becouse we were passing the success message.
    }
}