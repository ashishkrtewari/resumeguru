import * as graphql from "graphql";
import User from "../models/user";
import {
  ExperienceType,
  ExperienceListType,
  ExperienceInput,
  ResumeType,
  ResumesType,
  ResumeInput,
  UserType,
  UsersType,
  UserInput
} from "./graphQLTypes";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: UsersType,
      resolve() {
        return User.find();
      }
    },
    userByEmail: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({ email: args.email });
      }
    },
    userByName: {
      type: UserType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({ name: args.name });
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        user: {type: UserInput}
      },
      resolve(parent, {user}) {
        let newUser = new User(user)
        return newUser.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        user: {type: UserInput}
      },
      async resolve(parent, {user}) {
        return await User.findOneAndUpdate({email: user.email}, user)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findOneAndDelete({ name: args.name });
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})