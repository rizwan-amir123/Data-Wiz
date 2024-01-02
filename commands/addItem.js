import inquirer from "inquirer";
import { connectDB, disconnectDB } from '../db/connectDB.js'
import Ecom from "../schema/EcomSchema.js";
import ora from "ora";
import chalk from "chalk";

async function input(){
  const answers = await inquirer.prompt([
      { name: 'name', message: 'Enter name of the item:', type: 'input' },
      { name: 'detail', message: 'Enter the details of the item:', type: 'input' },
      { name: 'category', message: 'Enter the category of the item:', type: 'input' },
      { name: 'quantity', message: 'Enter the quantity of the item:', type: 'input' },
      { name: 'price', message: 'Enter the price of the item:', type: 'input' },
      { name: 'discount', message: 'Enter the discount of the item:', type: 'input' },
  ])

  return answers
}

const askQuestions = async() => {

  const itemArray = []
  let loop = false

  do{
      const userRes = await input()
      itemArray.push(userRes)
      const confirmQ = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more items?', type: 'confirm' }])
      if(confirmQ.confirm){
          loop = true
      } else {
          loop = false
      }
  } while(loop)

  return itemArray
}

export default async function addItem() {
  try {
      // calling askQuestions() to get array of items
      const userResponse = await askQuestions()

      // connecting to the database
      await connectDB()

      // Displaying a spinner with the following text message using ora 
      let spinner = ora('Creating the items...').start()

      // looping over every item in the userResponse array
      // and saving each item in the database
      for(let i=0; i<userResponse.length; i++){
          const response = userResponse[i]
          await Ecom.create(response)
      }

      // Stopping the spinner and displaying the success message
      spinner.stop()
      console.log(
          chalk.greenBright('Created the item!')
      )

      // disconnecting the database
      await disconnectDB()
  } catch (error) {
      // Error Handling
      console.log('Something went wrong, Error: ', error)
      process.exit(1)
  }
}