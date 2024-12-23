import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailHtmlTemplates.js";
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

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipient,
      template_uuid: "6344bf0e-48c8-40a7-8e53-7072dd0fc861",
      template_variables: {
        name,
      },
    });
    console.log("Welcome email send successfully", res);
  } catch (error) {
    console.error(`Error in the sendWelcomeEmail function: ${error}`);
    throw new Error(`Error in the sendWelcomeEmail function: ${error}`);
  }
};

export const sendResetPassword = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipient,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password Reset Sent Successfully", res);
  } catch (error) {
    console.error(`Error in the sendResetPassword function: ${error}`);
    throw new Error(`Error in the sendResetPassword function: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password Reset Successfully", res);
  } catch (error) {
    console.error(`Error in the sendResetSuccessEmail function: ${error}`);
    throw new Error(`Error in the sendResetSuccessEmail function: ${error}`);
  }
};

