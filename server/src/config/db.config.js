const  mongoose =  require('mongoose')

const DB_URL = process.env.DB_URL || ''


const connectDB = async () => {
  try {
       await mongoose.connect(DB_URL).then((data) => {
        console.log(`Database connected on ${data.connection.host}`)
       }).catch(err => console.log(err))
  } catch (err) {
    console.log(err.message);
    setTimeout(connectDB, 5000)
  }
}


module.exports =  connectDB