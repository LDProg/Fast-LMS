import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `http://localhost:3000/auth/email-verification?token=${token}`;
  console.log("email", email);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "luca.debionne@yahoo.fr",
    subject: "Confirmez votre email",
    html: `<p>Cliquez <a href="${confirmLink}">Ici</a> pour confirmer votre email.</p>`,
  });

  if (error) {
    return Response.json({ error });
  }
};
