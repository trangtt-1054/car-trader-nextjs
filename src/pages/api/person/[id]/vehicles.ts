import { NextApiRequest, NextApiResponse } from 'next';

export default function getVehiclesByPersonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ byId: req.query.id, message: 'getVehiclesByPersonId' });
}
