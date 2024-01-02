import mongoose from 'mongoose'
import {nanoid} from 'nanoid'
const EcomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    discount: {
        type: Number,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        default: 'code',
        trim: true
    }
}, {timestamps: true})

EcomSchema.pre('save', function(next){
    this.code = nanoid(10)
    next()
})

const Ecom = mongoose.model('Ecom', EcomSchema)
export default Ecom