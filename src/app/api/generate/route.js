import { URL } from "@/app/models/urls.model";
import { connectToMongoose } from "@/utils/connectToDB";
import { nanoid } from "nanoid";

export const POST = async (req) => {
  const { userInput } = await req.json();
  console.log(userInput);
  if (!userInput) {
    return Response.json({ message: "Invalid Url" }, { status: 400 });
  }

  try {
    await connectToMongoose();
    const shortId = nanoid(8);
    const entry = await URL.create({
      redirectUrl: userInput,
      shortId,
    });

    if (entry) {
      return Response.json(
        { message: "Created Successfull", url: entry.shortId },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went Wrong" }, { status: 500 });
  }
};
