import * as graphql from "graphql";

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull
} = graphql;

// ExperienceType
export const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        position: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        start: { type: GraphQLString },
        end: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})
// Experience List Type
export const ExperienceListType = new GraphQLList(ExperienceType);

// Experience Input
export const ExperienceInput = new GraphQLInputObjectType({
    name: 'ExperienceInput',
    fields: () => ({
        position: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        start: { type: GraphQLString },
        end: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

//Resume Type
export const ResumeType = new GraphQLObjectType({
    name: 'Resume',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        objective: { type: GraphQLString },
        experience: {
            type: ExperienceListType
        }
    })
})

export const ResumesType = new GraphQLList(ResumeType);

export const ResumeInput = new GraphQLInputObjectType({
    name: 'ResumeInput',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        objective: { type: GraphQLString },
        experience: {
            type: new GraphQLList(ExperienceInput)
        }
    })
})

// User Type
export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        resumes: {
            type: ResumesType
        }
    })
})

export const UsersType = new GraphQLList(UserType);

export const UserInput = new GraphQLInputObjectType ({
    name: 'UserInput',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        resumes: {
        type: new GraphQLList(ResumeInput)
        }
    })
});