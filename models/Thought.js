const { Schema, model, Types } = require('mongoose');
const {formatTimeStamp} = require('../public/utils/helper')

const reactionSchema = new Schema(
    {
reactionId:  
    {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
},
reactionBody: {
    type: String,
    required: true,
    max: 280,
},
username: {
    type: String,
    required: true,
},
createdAt: {
    type: Date,
    default: Date.now,
    get: (value) => {
        const formatDate = formatTimeStamp(value);
    console.log('Formatted Date:', formatDate);
    return formatDate;
},     
}
    });



const thoughtSchema = new Schema(
    {
thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
},
createdAt: {
    type: Date,
    default: Date.now,
    get: value => formatTimeStamp(value)
},     
username: {
    type: String,
    required: true,
    trim: true,
},
reactions: [reactionSchema]

},

{
    toJSON: {
        getters: true
    },
    id: false
 });




 thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
 })

 const Thought = model('Thought', thoughtSchema);
 module.exports = Thought;