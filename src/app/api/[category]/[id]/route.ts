import { NextResponse, NextRequest } from "next/server";
import { deleteDocument, updateDocument } from "@/services/mongo";
import {getDatabaseClient} from '../route'

export async function DELETE(request: NextRequest, { params }: { params: any }) {
    try {
        const client = await getDatabaseClient();
        const { id, category } = await params;
        await deleteDocument(client, category, id);
        return NextResponse.json({ message: 'Product deleted successfully!' });
    }
    catch (error : any) {
        return NextResponse.json({ message : "error" });
    }
}

export async function PUT(request: NextRequest, { params }: { params: any }) {
    try{
        const client = await getDatabaseClient();
        const { id, category } = await params;
        const updatedProduct = await request.json();
        await updateDocument(client, category, id, updatedProduct);
        return NextResponse.json({ message: 'Product updated successfully!' });
    }
    catch (error : any) {
        return NextResponse.json({ message : "error" });
    }
}