import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/supabase/db";
import { update } from "lodash";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
){
    const { data, error } = await db.from('owned_cards').select('*').eq('user_id', params.id)
  
    console.log(data, error)
    const res = Array.isArray(data) ? data : [] 
    return NextResponse.json(res)
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
){
    const body = await req.json()
    const code = body.code_variant.split('_')[0]
    console.log(body, code)

    const { data, error } = await db
        .from('owned_cards')
        .select('*')
        .eq('user_id', params.id)
        .eq('code_variant', body.code_variant)
        .single()
        console.log(data)
    if(!data){
        await db.from('owned_cards').insert({
            updated_at: new Date(),
            code: code,
            lang: 'eng',
            status: 'active',
            user_id: params.id,
            code_variant: body.code_variant,
            qtd: body.qtd
        })
    } else {
        console.log('oi')
        await db
            .from('owned_cards')
            .update({
                updated_at: new Date(),
                qtd: body.qtd
            })
            .eq('id', data.id)
    }
    return NextResponse.json({})
}