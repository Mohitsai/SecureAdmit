import { generateProof } from '@/lib/generateProof';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }
  console.log(body);

  const writing = parseInt(body.writing);
  const reading = parseInt(body.reading);
  const listening = parseInt(body.listening);
  const speaking = parseInt(body.speaking);

  if (writing === undefined || Number.isNaN(writing) || reading === undefined || Number.isNaN(reading) || listening === undefined || Number.isNaN(listening) || speaking === undefined || Number.isNaN(speaking)) {
    return res.status(403).json({error: "Invalid inputs"});
  }
  const proof = await generateProof(writing, reading, listening, speaking);

  if (proof.proof === "") {
    return res.status(403).json({error: "Proving failed"});
  }

  res.setHeader("Content-Type", "text/json");
  res.status(200).json(proof);
}