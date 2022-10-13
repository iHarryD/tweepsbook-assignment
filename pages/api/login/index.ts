import { NextApiRequest, NextApiResponse } from "next";
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_KEY);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      const {
        body: {
          data: { phone },
        },
      } = req;
      if (phone === undefined) {
        return res
          .status(400)
          .send({ data: phone, message: "Invalid phone number." });
      }
      const { user, error } = await supabase.auth.signInWithOtp({
        phone,
      });
      if (error) {
        return res.status(500).send({ data: error, message: error.message });
      }
      return res.status(200).send({ data: user, message: "OTP sent." });
    default:
      return res
        .status(404)
        .send({ data: null, message: "Method not allowed." });
  }
}
