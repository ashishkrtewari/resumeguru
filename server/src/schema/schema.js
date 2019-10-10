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
  UsersType
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
    userById: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({ id: args.id });
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        resumes: {
          type: new GraphQLList(ResumeInput)
        }
      },
      resolve(parent, args) {
        let user = new User(args)
        return user.save();
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