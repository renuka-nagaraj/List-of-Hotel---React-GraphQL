
const graphql = require('graphql');
const axios = require('axios');;
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
const TariffDetailsType = require('./tariffType');
const AmentiesDetailsType = require('./amenitiesType');
const ReviewDetailsType = require('./ReviewType');

const HotelType = new GraphQLObjectType({
    name: 'Hotel' ,
    fields : ()=> ({
        id : {type : GraphQLInt} ,
        name : {type : GraphQLString} ,
        address : { type : GraphQLString},
        rating : { type : GraphQLFloat},
        phone : { type : GraphQLString},
        email : { type : GraphQLString},
        country : { type : GraphQLString},
        pincode : { type : GraphQLString},
        latitude : { type : GraphQLFloat},
        longitude : { type : GraphQLFloat},
        checkIn : { type : GraphQLString},
        checkOut : { type : GraphQLString},
        images : { type : GraphQLString},
        tariff : {
            type : new GraphQLList(TariffDetailsType) ,
            resolve(parentValue , args){
               // console.log(parentValue,"from hotel");
                return axios.get(`http://localhost:3000/tariffDetails?hotelid=${parentValue.id}`)
                .then(res=> res.data);
            }
        },
        amenities : {
            type : new GraphQLList(AmentiesDetailsType),
            resolve(parentValue , args) {
                // console.log(parentValue, 'from amernitie')
                return axios.get(`http://localhost:3000/amentiesDetails?hotelid=${parentValue.id}`)
                .then(res=>res.data);
            }
        },
        review : {
            type :new GraphQLList( ReviewDetailsType),
            resolve(parentValue , args) {
                return axios.get(`http://localhost:3000/reviewDetails?hotelId=${parentValue.id}`)
                .then(res=>res.data);
            }
        }
    })
})

module.exports = HotelType;