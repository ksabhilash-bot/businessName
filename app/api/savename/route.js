import { NextResponse } from "next/server";
import connectDB from "@/helpers/mongo";
import SavedNames from "@/Schema/savedNames";

export async function POST(req) {
  try {
    await connectDB();

    const { email, keyword, name } = await req.json();

    if (!email || !keyword || !name) {
      return NextResponse.json(
        { error: "Email, keyword, and name are required" },
        { status: 400 }
      );
    }

    // Find existing document for this user
    let savedDoc = await SavedNames.findOne({ email });

    if (savedDoc) {
      // Push new saved name into array
      savedDoc.savedNames.push({ keyword, name });
      await savedDoc.save();
    } else {
      // Create a new document if none exists
      savedDoc = await SavedNames.create({
        email,
        savedNames: [{ keyword, name }],
      });
    }

    return NextResponse.json(
      { message: "Saved successfully", data: savedDoc },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving name:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const names = await SavedNames.find({ email }).sort({ createdAt: -1 });

    return NextResponse.json({ names }, { status: 200 });
  } catch (error) {
    console.error("GET /savename error:", error);
    return NextResponse.json(
      { error: "Failed to fetch names" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { email, id } = await req.json();

    if (!email || !id) {
      return NextResponse.json(
        { error: "Email and Name ID are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the user's savedNames document and pull out the item by _id
    const updatedDoc = await SavedNames.findOneAndUpdate(
      { email },
      { $pull: { savedNames: { _id: id } } },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json(
        { error: "User not found or name not deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Name deleted successfully",
        savedNames: updatedDoc.savedNames,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting saved name:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
