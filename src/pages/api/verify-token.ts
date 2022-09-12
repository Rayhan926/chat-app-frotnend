// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  verified: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const verifyToken = jwt.verify(req.body.token, process.env.JWT_SECRET!);
  res.status(200).json({ verified: !!verifyToken });
}
