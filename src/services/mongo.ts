"use service"

import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

let cachedClient: MongoClient;

export async function getDatabaseClient() {
    if (!cachedClient) {
        cachedClient = await connectDatabase();
    }
    return cachedClient;
}


export async function connectDatabase() : Promise<MongoClient> {
   if (!client) {
       const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
       if (!dbConnectionString) {
           throw new Error('Database connection string is not defined');
       }
       client = new MongoClient(dbConnectionString);
       clientPromise = client.connect();
   }
   return clientPromise;
}

export async function insertDocument(client: any, collection: string, document: object) {
    const db = client.db('db1');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client: any, collection: string) {
    const db = client.db('db1');
    console.log(collection);
    const documents = await db.collection(collection).find().toArray();
    return documents;
 }

 export async function deleteDocument(client: any, collection: string, id: number){
    const db = client.db('db1');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result;
 }
 

 export async function updateDocument(client: any, collection: string, id: number, updatedDocument: object){
    const db = client.db('db1');
    console.log(id, updatedDocument);
    
    const result = await db.collection(collection).updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedDocument }
    );
    
    return result;
 }