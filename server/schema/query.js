const graphql = require('graphql');
const axios = require('axios');
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

const ReviewDetailsType = require('./ReviewType');
const HotelType = require('./hotelType');
const HotelsType = require('./hotelsType');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType' ,
    fields : {
        hotel : {
            type : HotelType ,
            args : { id : { type : GraphQLInt}},
            resolve(parentValue , args) {
                return axios.get(`http://localhost:3000/hotels/${args.id}`)
                .then(res =>  res.data )
            }
        } ,
        hotels : {
            type : new GraphQLList(HotelsType) ,
            args : { id : { type : GraphQLInt}},
            resolve(parentValue , args) {
                return axios.get(`http://localhost:3000/hotels`)
                .then(res =>  res.data )
            }
        },
        review : {
            type : new GraphQLList(ReviewDetailsType) ,
            args : {hotelId : { type : GraphQLInt }},
            resolve(parentValue , args) {
               // console.log(args.hotelId);
                return axios.get(`http://localhost:3000/reviewDetails?hotelId=${args.hotelId}`)
                .then(res => res.data)
            }
        }
    }
})


module.exports = RootQuery;