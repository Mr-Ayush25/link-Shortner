import { URL } from "@/app/models/urls.model";
import { connectToMongoose } from "@/utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const visitUrl = params.visitUrl.trim();
  console.log(visitUrl);
  if (!visitUrl || visitUrl.length != 8) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  try {
    await connectToMongoose();
    const entry = await URL.findOneAndUpdate(
      { shortId: visitUrl },
      {
        $push: {
          pastVisits: {
            timeLine: Date.now(),
          },
        },
      }
    );
    console.log(entry);
    if (entry) {
      return NextResponse.redirect(entry.redirectUrl);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
