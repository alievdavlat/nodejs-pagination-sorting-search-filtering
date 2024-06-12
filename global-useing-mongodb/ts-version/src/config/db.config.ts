import  mongoose from 'mongoose';

const DB_UR:string = process.env.DB_URL || ''


const connectDB = async () => {
  try {
       await mongoose.connect(DB_UR).then((data:any) => {
        console.log(`Database connected on ${data.connection.host}`)
       }).catch((err:any) => console.log(err))
  } catch (err:any) {
    console.log(err.message);
    setTimeout(connectDB, 5000)
  }
}


export default  connectDB