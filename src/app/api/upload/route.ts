import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validation
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique name
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
    const fileName = `${timestamp}-${cleanName}`;

    const supabase = createAdminClient();

    // Upload to 'uploads' bucket
    const { data, error } = await supabase
      .storage
      .from("uploads")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from("uploads")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
