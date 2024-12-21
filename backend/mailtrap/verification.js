import { VERIFICATION_EMAIL_TEMPLATE } from "./emailHtmlTemplates.js";
import { mailtrapClient, mailtrapSender } from "./mailtrapConfig.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.error(`Error in the sendVerificationEmail function: ${error}`);
    throw new Error(`Error in the sendVerificationEmail function: ${error}`);
  }
};
