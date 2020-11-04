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


const AmentiesDetailsType = new GraphQLObjectType({
    name : 'Amenties' , 
    fields : ()=>({
        id: {type : GraphQLInt}, 
        hotelid : {type : GraphQLInt}, 
        wifi : {type : GraphQLBoolean}, 
        roomService: {type : GraphQLBoolean}, 
        laundry: {type : GraphQLBoolean}, 
        locker: {type : GraphQLBoolean}, 
        swimmingPool : {type : GraphQLBoolean}, 
        giftShops: {type : GraphQLBoolean}
    })
})

module.exports = AmentiesDetailsType;