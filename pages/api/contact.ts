import { validate } from "isemail";
import type { NextApiRequest, NextApiResponse } from "next"
import { CONTACT_FORM, KEYWORDS, LINKS } from "../../lib/utils/constants";

import NodeMailer from "nodemailer";
import { env } from "process";
import SendmailTransport from "nodemailer/lib/sendmail-transport";

const unsafeCharacters = "*:{}[]<>!^°_;|&$´`"; 

function safeformat(unformated: string) {

  for (const unsafeCharacter of unsafeCharacters) {
    unformated.replaceAll(unsafeCharacter, " ");
  }

  return unformated;

}

async function sendMail (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  const name = body[CONTACT_FORM.name];
  const email = body[CONTACT_FORM.email];
  const school = body[CONTACT_FORM.school];
  const schoolMail = body[CONTACT_FORM.schoolMail];
  const message = body[CONTACT_FORM.message];

  // custom validation:

  // validating emails

  if (!validate(email) || !validate(schoolMail)) res.status(400).json({ "message": "Fehlhafte Emailangaben. Bitte überprüfe die angegebene Emails." });

  // validating other inputs:

  const formatedName = safeformat(name);
  const formatedSchool = safeformat(school);
  const formatedMessage = safeformat(message);

  // now just send all of that data via emailing service
  // https://nodemailer.com/about/


  const transporter = NodeMailer.createTransport({
    host: "smtp.ionos.com",
    port: 587,
    secure: true,
    auth: {
      // TODO: configure USER and PASS in env.local
      user: process.env.SECRET_IONOS_USER,
      pass: process.env.SECRET_IONOS_PASS
    }
  })  

  const info = await transporter.sendMail({
    from: `"${formatedName}" <${email}>`, // sender address
    to: LINKS.email, // list of receivers
    subject: `Antragstellung Teilnahme ${KEYWORDS.nameAbbreviation}`, // Subject line
    text: `
---

Name des Antragstellers - ${formatedName}

Email des Antragstellers - ${email}

Name der betroffenen Schule - ${formatedSchool}

Email der betroffenen Schule - ${schoolMail}

---

${formatedMessage}

---
    `, // plain text body
  });

  return info.response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method != "POST") res.status(400).json({ "message": "invalid api method" });
  

  sendMail(req, res).catch((e) => {
    res.status(500)
  }).then((response) => {
    res.status(200).json({message: response})
  })

}
