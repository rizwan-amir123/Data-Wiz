// Importing packages and functions
import inquirer from "inquirer";
import Ecom from '../schema/EcomSchema.js'
import {connectDB, disconnectDB} from '../db/connectDB.js'
import ora from "ora";
import chalk from "chalk";


export async function getItemCode(){
    try {
        // Prompting the user to enter the item code
        const answers = await inquirer.prompt([
            {name: 'code', 'message': 'Enter the code of the item: ', type: 'input'},
        ])

        // Trimming user's response so that the item code does not contain any starting 
        // or trailing white spaces
        answers.code = answers.code.trim()

        return answers
    } catch (error) {
        console.log('Something went wrong...\n', error)
    }
}

export default async function deleteItem(){
    try {
        // Obtaining the item code provided by user
        const userCode = await getItemCode()

        // Connecting to the database
        await connectDB()

        // Starting the spinner
        const spinner = ora('Finding and Deleting the item...').start()

        // Deleting the task
        const response = await Ecom.deleteOne({code: userCode.code})

        // Stopping the spinner
        spinner.stop()

        // Checking the delete operation
        if(response.deletedCount === 0){
            console.log(chalk.redBright('Could not find any item matching the provided name. Deletion failed.'))
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully'))
        }

        // Disconnecting from the database
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}