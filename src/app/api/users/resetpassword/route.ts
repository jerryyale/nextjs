import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    // TODO: read the body and pull out `token` AND `password`
    const reqBody = await request.json();
    const { token, password } = reqBody;
        console.log(token);


    // TODO: find the user whose forgotPasswordToken matches the token
    const user = await User.findOne({
      forgotPasswordToken: token,
    //       AND whose forgotPasswordTokenExpiry is still in the future
       forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    //       if no user → return 400 "Invalid or expired token"
 if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
    console.log(user);
    // TODO: hash the new password (2 lines — copy from signup)
     const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

    // TODO: update 3 fields on the user:
    //       password → the hashed password
    //       forgotPasswordToken → undefined
    //       forgotPasswordTokenExpiry → undefined
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    

   

    // TODO: save the user
    await user.save();

    // TODO: return a success message
return NextResponse.json({
      message: "Password reset successful",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}