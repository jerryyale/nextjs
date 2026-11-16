import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    // TODO: read the request body and pull out `email`
    const reqBody = await request.json();
    const {  email } = reqBody;
    console.log(reqBody);

    // TODO: find the user by email
    const user = await User.findOne({ email });
    if (!user) {
            //       if no user → return a 400 error

      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    
    // TODO: call sendEmail — what should emailType be this time?

   
   

    await sendEmail({ email, emailType: "RESET", userId: user._id });
    // TODO: return a success message
      return NextResponse.json({
      message: "Password reset email sent",
      success: true,
      });
      
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}