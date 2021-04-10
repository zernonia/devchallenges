import mongoose, { HookNextFunction, Schema, model, Document, SchemaDefinition, Model } from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

interface User extends Document{
  bio?: string
  channel?: []
  email?: string
  github_id?: string
  password?: string
  photo?: string
  phone?: string
  name?: string
}

const schema: SchemaDefinition = {
  bio: {
    type: Schema.Types.String
  },
  channel: [{
    type: Schema.Types.ObjectId,
    ref: 'channel'
  }],
  email: {
    type: Schema.Types.String,
    unique: true,
    lowercase: true,
    // validate: [ validator.isEmail, 'Please enter a valid email']
  },
  github_id: {
    type: Schema.Types.Number,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    // minlength: [6, 'Minimum password length is 6 characters']
  },
  photo: {
    type: Schema.Types.String,
    validate: [ validator.isURL, 'Please enter a photo URL']
  },
  phone: {
    type: Schema.Types.String,
    validate: [ validator.isMobilePhone, 'Please enter a mobile phone']
  },
  name: {
    type: Schema.Types.String,
    unique: true
  },
}

const userSchema: Schema = new Schema(schema)

userSchema.pre('save', async function(next: HookNextFunction){
  const user = this as User
  if(user.password){
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

userSchema.statics.loginWithEmail = async function(email: string, password: string){
  const user = await this.findOne({email})
  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if(auth){
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

interface UserModel extends Model<User> {
  loginWithEmail: (email: string, password: string) => any;
}

const User: UserModel = model<User, UserModel>('user', userSchema)

export default User