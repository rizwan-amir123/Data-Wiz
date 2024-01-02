// Importing packages and functions
import { connectDB, disconnectDB } from '../db/connectDB.js'
import Ecom from '../schema/EcomSchema.js'
import chalk from 'chalk'
import ora from 'ora'

export default async function searchItem(options){
    try {
        // Connecting to the database
        await connectDB()

        // Starting the spinner
        const spinner = ora('Fetching the searched items...').start()

        const myKey = options.key
        const value = options.value[0] 
        console.log("value:", value)

        // Fetching all the items from the database
        let items = []
        if (options.value.length === 1) {
            if (myKey === "quantity") {
                items = await Ecom.find({quantity: value})
            }
            if (myKey === "price") {
                items = await Ecom.find({price: value})
            }
            if (myKey === "discount") {
                items = await Ecom.find({discount: value})
            }
            if (myKey === "name") {
                items = await Ecom.find({name: value})
            }
            if (myKey === "detail") {
                items = await Ecom.find({detail: value})
            }
            if (myKey === "category") {
                items = await Ecom.find({category: value})
            }
        }

        if (options.value.length === 2 && options.range) {
            console.log("ajdadhha")
            if (myKey === "price") {
                console.log("adkjaskdj")
                console.log("op1:",options.value[0])
                console.log("op2:",options.value[1])
                items = await Ecom.find({price: {$gt:options.value[0], $lt:options.value[1]}})
            }
            if (myKey === "discount") {
                items = await Ecom.find({discount: {$gt:options.value[0], $lt:options.value[1]}})
            }
            if (myKey === "quantity") {
                items = await Ecom.find({quantity: {$gt:options.value[0], $lt:options.value[1]}})
            }
        }

        if (options.value.length >= 2 && !options.range) {
            const search = [] 
            options.value.forEach((item) => search.push(item))
            if (myKey === "name") {
                items = await Ecom.find({name: {$in: search}}).exec()
            }
            if (myKey === "category") {
                console.log("JHjshdjhsjdh")
                items = await Ecom.find({category: {$in: search}}).exec()
            }
            if (myKey === "price") {
                items = await Ecom.find({price: {$in: search}}).exec()
            }
        }

        // stopping the spinner
        spinner.stop()

        // check if items exist or not
        if(items.length === 0){
            console.log(chalk.blueBright('No matches found!'))
        } else {
            items.forEach(item => {
                console.log(
                    chalk.cyanBright('Item Code: ') + item.code + '\n' + 
                    chalk.cyanBright('Name: ') + item.name + '\n' + 
                    chalk.cyanBright('Description: ') + item.detail + '\n' +
                    chalk.cyanBright('Item Category: ') + item.category + '\n' +
                    chalk.cyanBright('Item Quantity: ') + item.quantity + '\n' + 
                    chalk.cyanBright('Item Price: ') + item.price + '\n' +
                    chalk.cyanBright('Item Discount: ') + item.discount + '\n'
                )
            })
        }

        // disconnect from the database
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}
