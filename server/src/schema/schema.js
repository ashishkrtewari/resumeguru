const graphql = require('graphql');
const User = require('../models/user');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList} = graphql;

const experienceType = new GraphQLObjectType({
  name: 'experience',
  fields: () => ({
    position: {type: GraphQLString},
    name: {type: GraphQLString},
    location: {type: GraphQLString},
    start: {type: GraphQLString},
    end: {type: GraphQLString},
    description: {type: GraphQLString}
  })
})
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    address: {type: GraphQLString},
    phone: {type: GraphQLString},
    objective: {type: GraphQLString},
    experience: {
      type: experienceType
    }
  })
}) 

const UsersType = new GraphQLList(UserType);

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
      args: {id: {type : GraphQLString}},
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({id: args.id});
      }
    },
    userByName: {
      type: UserType,
      args: {name: {type : GraphQLString}},
      resolve(parent, args) {
        // Code to fetch from database.
        return User.findOne({name: args.name});
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
        name: {type: GraphQLString},
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name
        })
        return user.save();
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        name: {type: GraphQLString}
      },
      resolve(parent, args) {
        return User.findOneAndDelete({name: args.name});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})