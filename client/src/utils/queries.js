import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($token: Secret!) {
    user(token: $token) {
      _id
      email
      cart {
        _id
        product {
          _id
          description
          category {
            _id
            name
          }
          image_url
          name
          price
          quantity
        }
        quantity
      }
      first_name
      image_url
      isAdmin
      last_name
      orders {
        _id
        order_status
        products {
          _id
          description
          image_url
          name
          price
          quantity
        }
        purchaseDate
      }
      wishlist {
        _id
        description
        image_url
        name
        price
        quantity
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Query {
    products {
      _id
      name
      description
      image_url
      price
      quantity
      category {
        _id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Query($productId: ID!) {
    product(id: $productId) {
      _id
      name
      description
      image_url
      price
      quantity
    }
  }
`;

export const GET_CART = gql`
  query Query {
    get_cart {
      product {
        _id
        name
        description
        image_url
        price
      }
      quantity
      _id
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query MyQuery($products: [ID]!, $token: Secret!) {
    checkout(products: $products, token: $token) {
      session
    }
  }
`;

export const GET_ORDERS = gql`
  query Get_orders($id: ID!) {
    get_orders(_id: $id) {
      _id
      purchasedDate
      products {
        _id
        name
        description
        image_url
        price
        quantity
      }
    }
  }
`;
