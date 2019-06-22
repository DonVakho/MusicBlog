const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

//connect to database
const uri = "mongodb+srv://user_vakho:test123@cluster0-k0rvt.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connnected to mongodb');
})

//cors
app.use(cors());
//sellect port
app.listen(4000, () => {
    console.log('listening to port 4000');
});
//set up enterence point
app.use('/entrance', graphqlHTTP({
    schema,
    graphiql: true
}));
