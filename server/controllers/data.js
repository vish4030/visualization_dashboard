
import dbConnection from "../db/db.config.js";


export const retrieveData = async(req, res)=>{
    const db = await dbConnection();
    const data  = await db.collection("data").find().toArray();
    res.send(data);
}