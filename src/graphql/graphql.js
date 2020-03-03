import gql from "graphql-tag";

export const GET_ALL_USER_ADMIN = gql`
  query {
    getAllUserAdmin {
      id
      name
      mobile
      active
      access {
        admin
        teacher
        departemant
        course
        gallery
        offer
        website
        online
        live
      }
    }
  }
`;

export const GET_ALL_TEACER = gql`
  query {
    getAllTeacher {
      id
      name
      mobile
      password
      picture
      resume
      active
    }
  }
`;

export const GET_ALL_DEPARTEMANT = gql`
  query {
    getAllDepartemant {
      id
      name
      color
      active
      subDepartemant {
        id
        name
        active
      }
    }
  }
`;
