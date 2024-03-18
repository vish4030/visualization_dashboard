import { MongoClient } from "mongodb";

const url = "mongodb+srv://vishwajeetk4030:1234mongodb@cluster0.wacrhyu.mongodb.net/";
const client = new MongoClient(url);

export default async function dbConnection(){
    try{
       return (await client.connect()).db("mydb");
    }catch(err){console.log(err); return null}
}