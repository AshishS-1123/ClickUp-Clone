import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/supabase";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const body = JSON.parse(req.body);

  console.log('Method: ', method, ' Body: ', body);
  if (method === 'POST') {
    const { email, password } = body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (!error) {
      res.status(200).json({ status: 'OK', message: data });
    } else {
      res.status(400).json({ status: 'ERROR', message: error });
    }

    return;
  }

  res.status(400).json({ message: 'METHOD NOT HANDLED' });
}