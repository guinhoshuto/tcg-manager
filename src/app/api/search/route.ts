import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/supabase/db";

export async function GET(
    req: NextRequest
){
    const name = new URL(req.url).searchParams.get('name')
    const color = new URL(req.url).searchParams.get('color')
    const attr = new URL(req.url).searchParams.get('attr')
    const trigger = new URL(req.url).searchParams.get('trigger')
    let query = db
        .from('optcg_cards')
        .select('*')
        .range(0, 50);
    
    if (name) query = query.ilike('name', `%${name}%`);
    
    const { data, error } = await query;
  
    console.log(data, error)
    return NextResponse.json(data)
}