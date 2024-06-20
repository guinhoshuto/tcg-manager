import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/supabase/db";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
){
    const { data, error } = await db.from('owned_cards').select('*').eq('user_id', params.id)
  
    console.log(data, error)
    const res = Array.isArray(data) ? data : [] 
    return NextResponse.json(res)
}