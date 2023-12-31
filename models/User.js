//importing mongoose
const { Schema, model } = require('mongoose');

// creating model/schema for User
const userSchema = new Schema(
    {
username: {
    type: String,
    required: true, 
    unique: true, 
    trim: true},
email: {
    type: String, 
    required: true, 
    unique: true,
    validator: function(v) {
        return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2-4\b/.test(v)
    },
    message: "Invalid email format",
},

thoughts: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Thought',
},
],
friends: [
    {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
 ],
},
{
toJSON: {
    virtuals: true,
},
id: false,
 }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;