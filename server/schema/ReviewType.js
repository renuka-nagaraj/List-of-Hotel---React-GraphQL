const graphql = require('graphql');
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


const ReviewDetailsType = new GraphQLObjectType({
    name: 'Review' ,
    fields : () => ({
        id : {type : GraphQLInt}, 
        hotelId :{type : GraphQLInt}, 
        reviewer: {type : GraphQLString},
        rating: { type : GraphQLFloat}, 
        comments : {type : GraphQLString}
    })
   
})


module.exports = ReviewDetailsType