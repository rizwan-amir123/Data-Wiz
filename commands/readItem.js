// Importing packages and functions
import { connectDB, disconnectDB } from '../db/connectDB.js'
import Ecom from '../schema/EcomSchema.js'
import chalk from 'chalk'
import ora from 'ora'

export default async function readItem(){
    try {
        // connecting to the database
        await connectDB()

        // starting the spinner
        const spinner = ora('Fetching all items...').start()

        // fetching all the items from the database 
        const items = await Ecom.find({})

        // stopping the spinner
        spinner.stop()

        // check if items exist or not
        if(items.length === 0){
            console.log(chalk.blueBright('You do not have any tasks yet!'))
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
