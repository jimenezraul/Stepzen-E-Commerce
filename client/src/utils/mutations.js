import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      first_name: $firstName
      last_name: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation Mutation($productId: ID!, $token: Secret!) {
    addToWishlist(productId: $productId, token: $token) {
      _id
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation Mutation($productId: ID!, $token: Secret!) {
    removeFromWishlist(productId: $productId, token: $token) {
      _id
      name
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation Mutation(
    $id: ID!
    $name: String!
    $description: String!
    $imageUrl: String!
    $price: Float!
    $quantity: Int!
    $token: Secret!
  ) {
    add2Cart(
      _id: $id
      description: $description
      image_url: $imageUrl
      name: $name
      price: $price
      quantity: $quantity
      token: $token
    ) {
      _id
      quantity
    }
  }
`;

export const DELETE_FROM_CART = gql`
  mutation Mutation($productId: ID!, $token: Secret!) {
    deleteFromCart(productId: $productId, token: $token) {
      _id
    }
  }
`;

export const ADD_ORDER = gql`
  mutation Mutation($products: [ID]!, $token: Secret!) {
    addOrder(products: $products, token: $token) {
      _id
      products {
        _id
      }
    }
  }
`;
