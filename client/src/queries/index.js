import { gql } from 'apollo-boost';

export const getUserByEmail = gql`
query userByEmail($email: String){
  userByEmail(email: $email) {
    name
    email
    resumes {
      name
      email
      address
      phone
      objective
      experience {
        position
        name
        location
        start
        end
        description
      }
    }
  }
}`;

export const getUserQuery = gql`
{
  users {
    name
    email
    password
  }
}`;

export const updateUserMutation = gql`
mutation updateUser($user: UserInput){
  updateUser(user: $user) {
    name
    email
    resumes {
      name
      email
      address
      phone
      objective
      experience {
        position
        name
        location
        start
        end
        description
      }
    }
  }
}`;