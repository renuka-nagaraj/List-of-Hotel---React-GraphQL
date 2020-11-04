const graphql = require('graphql');
const axios = require('axios');
const { ApolloError } = require('apollo-client');
const validator = require('validator');
const ValidationError = require('./validationError');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLBoolean
} = graphql

const HotelType = require('./hotelType');

const mutation = new GraphQLObjectType({
    name : 'Mutation' , 
    fields : {
        addHotel : {
            type : HotelType,
            args : {
                id : {type : GraphQLInt} ,
                name : {type :new GraphQLNonNull(GraphQLString)} ,
                address : { type : new GraphQLNonNull(GraphQLString)},
                rating : { type : GraphQLFloat},
                phone : { type : new GraphQLNonNull(GraphQLString)},
                email : { type : new GraphQLNonNull(GraphQLString)},
                country : { type : new GraphQLNonNull(GraphQLString)},
                pincode : { type : new GraphQLNonNull(GraphQLString)},
                latitude : { type : GraphQLFloat},
                longitude : { type : GraphQLFloat},
                checkIn : { type : GraphQLString},
                checkOut : { type : GraphQLString},
                images : { type : GraphQLString},
            },
            async resolve(parentValue , args){
                let errors =[];
                if(validator.isEmpty(args.name) && validator.isEmpty(args.address) && 
                   validator.isEmpty(args.phone)&& validator.isEmpty(args.email) &&
                   validator.isEmpty(args.country) && validator.isEmpty(args.pincode)){
                    errors.push({ key: 'allValue', message: 'Form fields should not be empty' })
                   } else{
                if (validator.isEmpty(args.name)) {
                    errors.push({ key: 'name', message: 'The name must not be empty.' });
                  }
                  if (validator.isEmpty(args.address)) {
                    errors.push({ key: 'address', message: 'The address must not be empty.' });
                  }
                  if (validator.isEmpty(args.phone)) {
                    errors.push({ key: 'phone', message: 'Phone number must not be empty.' });
                  }else if (!validator.isLength(args.phone, { min: 10 })) {
                    errors.push({ key: 'phone', message: 'The phone number must be 10 characters long.' });
                  }
                  if (validator.isEmpty(args.email)) {
                    errors.push({ key: 'email', message: 'The email must not be empty.' });
                  }
                  if (validator.isEmpty(args.country)) {
                    errors.push({ key: 'country', message: 'The country must not be empty.' });
                  }
                  if (validator.isEmpty(args.pincode)) {
                    errors.push({ key: 'pincode', message: 'The pincode must not be empty.' });
                  }
                }
                 // console.log(errors);
                  if (errors.length){ throw new ValidationError(errors)}
                  else{
                return await axios.post('http://localhost:3000/hotels' , args)
                .then(res => res.data);
            }
            }
        }
    }
})

module.exports = mutation