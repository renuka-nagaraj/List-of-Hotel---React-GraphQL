import gql from 'graphql-tag';

export default gql`
{
    hotels{
    id
    name
    address
    email
    images
    rating
    tariffDetails{
      id
      roomType
      tariff
    }
  }

}
`;