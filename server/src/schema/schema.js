import * as graphql from "graphql";
import User from "../models/user";
import {
  UserType,
  UsersType,
  UserInput,
  UserLoginPayload
} from "./graphQLTypes";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
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
      resolve(parent, { user }) {
        let newUser = new User(user)
        return newUser.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        user: {type: UserInput}
      },
        async resolve(parent, { user }) {
        await User.findOneAndUpdate({email: user.email}, user)
        return await User.findOne({ email: user.email });
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
    },
    userLogin: {
      type: UserLoginPayload,  
      args: {  
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let user = await User.findOne({ email: args.email });
        if (user && bcrypt.compareSync(args.password, user.password)) {
          const token = jwt.sign({ id: user._id }, process.env.secret || '', {
            expiresIn: "1h"
          });
          return {user, token}
        } else {
          return false;
        }
      }
    },    
    userRegister: {
      type: UserLoginPayload,  
      args: {  
        email: { type: GraphQLString },  
        password: { type: GraphQLString },  
      },
      resolve(parent, args) {
        return User.findOne({ name: args.name });
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})