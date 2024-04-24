const{ StatusCodes } =require( "http-status-codes");


 class ErrorHandle  extends Error{
  constructor(message){
    super(message)
    this.name='Not Found ';
    this.StatusCodes=StatusCodes.NOT_FOUND;
  }
}
class BadRequestError extends Error{
  constructor(message){
    super(message);
    this.name='Bad Request',
    this.StatusCodes=StatusCodes.BAD_REQUEST;
  }
}
class Unauthenticated extends Error{
  constructor(message){
    super(message)
    this.name='UnAuthenticated User'
    this.StatusCodes=StatusCodes.UNAUTHORIZED;

  }
}

 class UnAuthorized extends Error{
  constructor(message){
    super(message);
    this.name='UnAuthorized User',
    this.StatusCodes=StatusCodes.FORBIDDEN;
  }
}

module.exports={UnAuthorized,Unauthenticated,BadRequestError,ErrorHandle}