import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('testimoni')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching testimoni:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimoni' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    const { data, error } = await supabase.from('testimoni').insert([body]).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating testimoni:', error);
    return NextResponse.json({ success: false, error: 'Failed to create testimoni' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const supabase = await createClient();
    const { data, error } = await supabase.from('testimoni').update({ ...updateData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating testimoni:', error);
    return NextResponse.json({ success: false, error: 'Failed to update testimoni' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase.from('testimoni').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimoni:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete testimoni' }, { status: 500 });
  }
}
