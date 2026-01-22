import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('site_settings').select('*').order('key');
    if (error) throw error;
    
    // Convert to key-value object
    const settings: Record<string, string> = {};
    data?.forEach(item => {
      settings[item.key] = item.value || '';
    });
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    
    // Update each setting
    const updates = Object.entries(body).map(async ([key, value]) => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value: value as string, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      if (error) throw error;
    });
    
    await Promise.all(updates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
