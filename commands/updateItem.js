// Importing packages and functions
import {connectDB, disconnectDB} from '../db/connectDB.js'
import { getItemCode } from './deleteItem.js'
import inquirer from 'inquirer'
import Ecom from '../schema/EcomSchema.js'
import ora from 'ora'
import chalk from 'chalk'

async function askUpdateQ(item){
    try {
        // Prompting the user to update the item data
        const update = await inquirer.prompt([
            {name: 'name', message: 'Update the name?', type: 'input', default: item.name},
            {name: 'detail', message: 'Update the Description?', type: 'input', default: item.detail},
            {name: 'category', message: 'Update the Category?', type: 'input', default: item.category},
            {name: 'quantity', message: 'Update the Quantity?', type: 'input', default: item.quantity},
            {name: 'price', message: 'Update the Price?', type: 'input', default: item.price},
            {name: 'discount', message: 'Update the Discount?', type: 'input', default: item.discount}
        ])

        return update
    } catch (error) {
        console.log('Something went wrong... \n', error)
    }
}

export default async function updateItem(){
    try {
        // Obtaining the task code entered by user by calling getItemCode() method
        const userCode = await getItemCode()

        // Connecting to the database
        await connectDB()

        // Starting the spinner
        const spinner = ora('Finding the item...').start()

        // Finding the item which the user wants to update
        const item = await Ecom.findOne({code: userCode.code})

        // Stopping the spinner
        spinner.stop()

        // Checking if the item exists or not
        if(!item){
            console.log(chalk.redBright('Could not find a item with the code you provided.'))
        } else{
            console.log(chalk.blueBright('Type the updated properties. Press Enter if you don\'t want to update the data.'))

            // Get the user's response of the updated data by calling askUpdateQ() method
            const update = await askUpdateQ(item)

            // If user marked status as completed, we delete the item else we update the data
            if(update.status === 'completed'){
                // Changing spinner text and starting it again
                spinner.text = 'Deleting the item...'
                spinner.start()

                // Deleting the item
                await Ecom.deleteOne({_id : item._id})

                // Stopping the spinner and display the success message
                spinner.stop()
                console.log(chalk.greenBright('Deleted the item.'))
            } else {
                // Update the item
                spinner.text = 'Updating the item'
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