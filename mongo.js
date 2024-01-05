const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.mhiy3na.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
// 'Note' is the singular name of the model, Mongoose automatically name collection as lowercase plural 'notes'
const Note = mongoose.model('Note', noteSchema)

// const note1 = new Note({
//     content: 'HTML is easy',
//     important: true,
// })
// const note2 = new Note({
//     content: 'CSS is hard',
//     important: true,
// })
// const note3 = new Note({
//     content: 'Mongoose makes things easy',
//     important: true,
// })

// objects retrieved from database with the find method of the Note model.
Note.find({}).then(result => { // restrict to only important notes { important: true }
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// note2.save().then(result => {
//     console.log('note saved!')
//     // mongoose.connection.close()
// })

// note3.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })