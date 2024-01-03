# Data Wiz: A Database CLI

A CLI written in node that uses MongoDB as database, it can be used to perform CRUD operations on a website. When used for an e-commerce website database it can create, delete, update, read, search and setproperties for items.

Set schema for you database first, then proceed with the commands.
### Create
It createa a product item for database. Use the following command at CLI
```
ecom create 
```
Then you will asked various data items of the producr, answer them and the item will be created.
### Read
It displays all items from database. Use the following command at CLI
```
ecom read 
```
### Update
It updates an item from database. Use the following command at CLI
```
ecom update
```
First it will ask about code for the item, so that it can identify which item to update. Then it asks all the data for the item.
### Delete
It deletes an item from database. Use the following command at CLI
```
ecom delete
```
First it will ask about code for the item, so that it can identify which item to delete, then it deletes it.
### Search
It searches an item from database. Use the following command at CLI
```
ecom search -k <key> -v <val1> <val2>
```
-k is used to specify key of the item, while -v specifies the values allowed for key. The search returns all such items that have the values specified after -v for the key -k.
For example, to find all items that have category of furniture the command would look like
```
ecom search -k category -v "furniture"
```
Mention the values as strings, as this will allow greater flexibility in naming.
For multiple values the above command would be
```
ecom search -k category -v "furniture" "toys"
```
Now, this command would return all items that have category values of toys or furniture.
For numeric values range can also be mentioned. Say you want to find all items that have price in the range of 100 to 1000 the command can be written as
```
ecom search -k category --range -v 100 1000
```
Keep in mind it would return all items that have value greater than 100 but less than 1000.
### Set
It can be used to set certain key values of a single or multiple items.
```
ecom set -i <id1> <id2> -k price -v 1000
```
The above command would set price to 1000 of all such items whose ids have been provided. In this case items having ids of id1 and id2 would have their price set to 1000.


