import gql from "graphql-tag";

export default gql`
  query HotelQuery($id: Int) {
    hotel(id: $id) {
      id
      name
      email
      images
      rating
      address
      tariff {
        id
        tariff
        roomType
        image
      }
      review {
        id
        reviewer
        comments
      }
      amenities {
        id
       wifi
       roomService
       laundry
       locker
       swimmingPool
       giftShops
      }
    }
  }
`;
