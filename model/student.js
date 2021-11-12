const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err.message))

const studentSchema = new mongoose.Schema({
    name: {type:String,required:true,minlength:4,maxlength:20},
email: {type:String,unique:true,required:true,minlength:4,maxlength:20,match:/^.*@.*/},
    roll: {type:Number,default:null},
    regular: {type:Boolean,default:true}
})
const UserData = mongoose.model('users', studentSchema);

async function saveData(obj) {
    try {
        // UserData.schema.plugin(mongooseUniqueValidator,{    email: 'Unique Validation failed'    })
        studentSchema.plugin(mongooseUniqueValidator)
        const student = new UserData({
            name: obj.name,
            email: obj.email,
            roll: obj.roll,
            regular: obj.regular
        });
        const data = await student.save()
        return data;
    }
    catch (err) {
        console.log(err.message)
    }
}


async function fetchData(data) {
    // .find({roll:{$gt:5000,$lt:20000
    try {
        if (data.page && data.size) {
            const student = await UserData
                .find()
                .sort({ email: 1 })
                .skip((parseInt(data.page) - 1) * parseInt(data.size))
                .limit(parseInt(data.size))
                .select({ name: 1, email: 1, roll: 1 })
            return student;
        }
        else {
            const student = await UserData
                .find(data)
                .sort({ email: 1 })
                .select({ name: 1, email: 1, roll: 1 })
            // console.log("fetched data:",student);
            return student;
        }
    }
    catch (err) {
        console.log(err.message);
    }


}

async function updateData(id, data) {
    // .find({roll:{$gt:5000,$lt:20000
    try {
        return (await UserData.updateOne({ name: id.name }, { $set: data }))
    }
    catch (err) {
        console.log(err.message);
    }


}
async function deleteData(id) {
    // .find({roll:{$gt:5000,$lt:20000
    try {
        return (await UserData.deleteOne({ name: id.name }))
    }
    catch (err) {
        console.log(err.message);
    }


}
module.exports.fetchData = fetchData;
module.exports.saveData = saveData;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;