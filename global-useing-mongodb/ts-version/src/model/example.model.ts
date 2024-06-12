import mongoose from 'mongoose'

 interface movieSchemaType {
  name:string,
  img :string,
  year :number,
  genre :string[],
  rating :number,
 }

const movieSchema =  new mongoose.Schema<movieSchemaType>({
  name :{
    type:String,
    required:true
  },
  img :{
    type:String,
    required:true
  },
  year :{
    type:Number,
    required:true
  },
  genre :{
    type:[String],
    required:true
  },
  rating :{
    type:Number,
    required:true
  }
})


export const Example =  mongoose.model<movieSchemaType>('movie', movieSchema)