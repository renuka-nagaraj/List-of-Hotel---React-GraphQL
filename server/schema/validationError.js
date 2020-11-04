
const { GraphQLError } = require('graphql');

class ValidationError extends GraphQLError {
  constructor(errors) {
     // console.log(errors , "errors")
    // super('The request is invalid.');
    super(errors)
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
}

module.exports = ValidationError;