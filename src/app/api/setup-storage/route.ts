import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    
    // Check if 'uploads' bucket exists
    const uploadsBucket = data.find(b => b.name === 'uploads');
    let message = "Buckets listed.";
    
    if (!uploadsBucket) {
        // Try to create it
        const { data: newBucket, error: createError } = await supabase.storage.createBucket('uploads', {
            public: true,
            fileSizeLimit: 5242880, // 5MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']
        });
        if (createError) {
             message = "Bucket 'uploads' missing and failed to create: " + createError.message;
        } else {
             message = "Bucket 'uploads' created successfully.";
        }
    } else {
        message = "Bucket 'uploads' already exists.";
    }

    return NextResponse.json({ success: true, buckets: data, message });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
