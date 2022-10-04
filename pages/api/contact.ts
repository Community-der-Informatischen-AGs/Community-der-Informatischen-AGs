import { validate } from "isemail";
import type { NextApiRequest, NextApiResponse } from "next";
import { CONTACT_FORM, KEYWORDS, LINKS } from "../../lib/utils/constants";

/*
function safeformat(unformated: string) {

  for (const unsafeCharacter of unsafeCharacters) {
    unformated.replace(new RegExp(unsafeCharacter, "g"), " ")
  }
    
  console.log(unformated)
  return unformated;

}
*/

async function sendMail (req: NextApiRequest, res: NextApiResponse) {

  console.log("=============")
  console.log("sending email!")
  console.log("=============")

  const body = JSON.parse(req.body);

  const name = body[CONTACT_FORM.name];
  const email = body[CONTACT_FORM.email];
  const school = body[CONTACT_FORM.school];
  const schoolMail = body[CONTACT_FORM.schoolMail];
  const message = body[CONTACT_FORM.message];

  // custom validation:

  // validating emails

  if (!validate(email) || !validate(schoolMail)) {
    res.status(400).json({ "message": "Fehlhafte Emailangaben. Bitte überprüfe die angegebene Emails." });
    return false;
  }


  const sgMail = require("@sendgrid/mail")
  sgMail.setApiKey(process.env.SECRET_SENDGRID_API_KEY)

  const emailInfo = {
    to: LINKS.email,
    from: LINKS.email,
    subject: `Antragstellung Teilnahme ${KEYWORDS.nameAbbreviation}`,
    text: `
====
Name des Antragstellers - ${name}

Email des Antragstellers - ${email}

Name der betroffenen Schule - ${school}

Email der betroffenen Schule - ${schoolMail}
====

${message}

        `
  }

  const response = await sgMail.send(emailInfo)

  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method != "POST") res.status(400).json({ "message": "invalid api method" });
  
  try {
    const response = await sendMail(req, res)
    console.log("it should have worked")
    res.status(200).json({"message": response})
  } catch (e) {
    console.log(e)
    res.status(500).json({"message": "something went wrong..."})
  }
  
}
