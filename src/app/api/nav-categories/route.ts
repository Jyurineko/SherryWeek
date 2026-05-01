import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/payload";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ categories: [] });
  }
}
