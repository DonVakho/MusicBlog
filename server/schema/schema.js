const graphql = require('graphql');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        created: { type: GraphQLString },
        modified: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, _) {
                return Post.find({ userid: parent.id });
            }
        }
    })
});
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        created: { type: GraphQLString },
        modified: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, _) {
                return User.findById(parent.userid)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, _) {
                return Comment.find({ postid: parent.id })
            }
        }
    })
});
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        created: { type: GraphQLString },
        modified: { type: GraphQLString },
        post: {
            type: PostType,
            resolve(parent, _) {
                return Post.findById(parent.postid);
            }
        },
        user: {
            type: UserType,
            resolve(parent, _) {
                return User.findById(parent.userid);
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(_, args) {
                return User.findOne({email: args.email})
            }
        },
        userConf: {
            type: UserType,
            args: { email: { type: GraphQLString }, password: {type: GraphQLString} },
            resolve(_, args) {
                return User.findOne({email: args.email, password: args.password})
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return Post.findById(args.id);
            }
        },
        comment: {
            type: CommentType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return Comment.findById(args.id);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(_, __) {
                return Post.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(_, __) {
                return User.find({});
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(_, __) {
                return Comment.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(_, args) {
                let user = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                    created: new Date().toString(),
                    modified: new Date().toString(),
                });
                return user.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(_, args) {
                return User.findByIdAndUpdate(args.id, {
                    firstName: args.firstName ? args.firstName : this.firstName,
                    lastName: args.lastName ? args.lastName : this.lastName,
                    email: args.email ? args.email : this.email,
                    password: args.password ? args.password : this.password,
                    modified: new Date().toString()
                }, { new: true });
            }
        },
        removeUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedUser = User.findByIdAndRemove(args.id).exec();
                if (!removedUser) {
                    throw new Error(`Couldn't find User with id: ${args.id}`)
                } else {
                    return removedUser;
                }
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userid: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args) {
                let post = new Post({
                    title: args.title,
                    description: args.description,
                    created: new Date().toString(),
                    modified: new Date().toString(),
                    userid: args.userid
                });
                return post.save();
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(_, args) {
                return Post.findByIdAndUpdate(args.id, {
                    title: args.title ? args.title : this.title,
                    description: args.description ? args.description : this.description,
                    modified: new Date().toString()
                }, { new: true })
            }
        },
        removePost: {
            type: PostType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedPost = Post.findByIdAndRemove(args.id).exec();
                if (!removedPost) {
                    throw new Error(`Couldn't find Post with id: ${args.id}`)
                }
                const removedComments = Comment.deleteMany({postid: args.id}).exec()
                console.log(removedComments)
                if(!removedComments){
                    console.log('there were no comments for this post')
                }
                return removedPost;
            }
        },
        addComment: {
            type: CommentType,
            args: {
                text: { type: new GraphQLNonNull(GraphQLString) },
                postid: { type: new GraphQLNonNull(GraphQLString) },
                userid: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args) {
                let comment = new Comment({
                    text: args.text,
                    created: new Date().toString(),
                    modified: new Date().toString(),
                    postid: args.postid,
                    userid: args.userid
                });
                return comment.save();
            }
        },
        updateComment: {
            type: CommentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                text: { type: GraphQLString },
            },
            resolve(_, args) {
                return Comment.findByIdAndUpdate(args.id, {
                    text: args.text ? args.text : this.text,
                    modified: new Date().toString()
                }, { new: true })
            }
        },
        removeComment: {
            type: CommentType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedComment = Comment.findByIdAndRemove(args.id).exec();
                if (!removedComment) {
                    throw new Error(`Couldn't find Comment with id: ${args.id}`)
                }
                return removedComment;
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})