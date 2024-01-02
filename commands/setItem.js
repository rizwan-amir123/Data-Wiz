// Importing packages and functions
import {connectDB, disconnectDB} from '../db/connectDB.js'
import { getItemCode } from './deleteItem.js'
import Ecom from '../schema/EcomSchema.js'
import ora from 'ora'
import chalk from 'chalk'
import mongoose from 'mongoose'

export default async function setItem(options){
    try {
        const myKey = options.key
        const myValue = options.value
        // Connecting to the database
        await connectDB()

        for (let i=0; i<options.id.length; i++) {
            // Obtaining the task code entered by user 
            const userCode = options.id[i]

            // Starting the spinner
            const spinner = ora('Finding the item...').start()

            // Finding the item which the user wants to update
            const item = await Ecom.findOne({code: userCode})
            //console.log(item)

            // Stopping the spinner
            spinner.stop()

            // Checking if the item exists or not
            if(!item){
                console.log(chalk.redBright(`Could not find a item with the item id ${userCode} you provided.`))
            } else {
                console.log(chalk.blueBright('Updating the item.'))

                let update = {}
                if (myKey === "quantity") {
                    update = {quantity : myValue}
                }
                if (myKey === "price") {
                    update = {price : myValue}
                }
                if (myKey === "discount") {
                    update = {discount : myValue}
                }
                if (myKey === "name") {
                    update = {name : myValue}
                }
                if (myKey === "detail") {
                    update = {detail : myValue}
                }
                if (myKey === "category") {
                    update = {category : myValue}
                }
                
                // Update the item
                spinner.text = 'Updating the item'
                //item.quantity = 0;
                spinner.start()
                await Ecom.updateOne({_id: item._id}, update, {runValidators: true})
                spinner.stop()
                console.log(chalk.greenBright('Updated the item.'))
                }
        }
        // Disconnecting from the database
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}