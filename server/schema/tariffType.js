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

const TariffDetailsType = new GraphQLObjectType({
    name : 'Tariff' ,
    fields : ()=>({
        id: {type : GraphQLInt},
        hotelid :  {type : GraphQLInt}, 
        roomType : {type : GraphQLString},
        tariff : {type : GraphQLInt},
        image:  {type : GraphQLString}
    })
})

module.exports = TariffDetailsType;