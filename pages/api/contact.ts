import { validate } from "isemail";
import type { NextApiRequest, NextApiResponse } from "next"
import { CONTACT_FORM } from "../../lib/utils/constants";

const unsafeCharacters = "*:{}[]<>!^°_;|&$´`"; 

function safeformat(unformated: string) {

  for (const unsafeCharacter of unsafeCharacters) {
    unformated.replaceAll(unsafeCharacter, " ");
  }

  return unformated;

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method != "POST") res.status(500).json({ "errorMessage": "invalid api method" });
  
  const body = JSON.parse(req.body);

  const name = body[CONTACT_FORM.name];
  const email = body[CONTACT_FORM.email];
  const school = body[CONTACT_FORM.school];
  const schoolMail = body[CONTACT_FORM.schoolMail];
  const message = body[CONTACT_FORM.message];

  // custom validation:

  // validating emails

  if (!validate(email) || !validate(schoolMail)) res.status(500).json({ "errorMessage": "invalid emails" });

  // validating other inputs:

  const formatedName = safeformat(name);
  const formatedSchool = safeformat(school);
  const formatedMessage = safeformat(message);

  // now just send all of that data via emailing service

}
