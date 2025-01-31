

export const schema =`#graphql

    type Restaurant{
        id: String!
        name: String!
        address: String!
        number: String!
        temp: Int!
        datetime: String!
    }
    type Query{
        getRestaurant(id:ID!): Restaurant!
        getRestaurants(city: String!): [Restaurant!]
    }

    type Mutation{
        addRestaurant(name: String!,address:String!,city:String!,number:String!): Boolean!
        deleteRestaurant(id:ID!):Boolean!
    }
`