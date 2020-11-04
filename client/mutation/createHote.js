import gql from 'graphql-tag';

export default gql`
mutation AddHotel($name : String! , $address : String! , $phone : String! , $email : String! , $country : String! , $pincode : String! , $images : String!){
  addHotel(name: $name , address: $address , phone: $phone , email : $email , country : $country , pincode : $pincode , images : $images) {
    name
    address
  }
}
`;