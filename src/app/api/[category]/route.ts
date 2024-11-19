import { NextResponse } from "next/server";
import { getAllDocuments, connectDatabase, insertDocument } from "@/services/mongo";
import { MongoClient } from "mongodb";

let cachedClient: MongoClient;

export async function getDatabaseClient(){
    if (!cachedClient) {
        cachedClient = await connectDatabase();
    }
    return cachedClient;
}

export async function GET(request: Request, { params }: { params: any }) {
    try {
        const { category } = await params;
        const client = await getDatabaseClient();
        const products = await getAllDocuments(client, category);
        return NextResponse.json(products);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "error get all products" });
    }
}

export async function POST(request: Request, { params }: { params: any }) {
    try {
        const { category } = await params;
        const client = await getDatabaseClient();
        const newProduct = await request.json();
        const result = await insertDocument(client, category, newProduct);
        return NextResponse.json(result);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "error" });
    }
}
