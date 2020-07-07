import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'; //sign the object with userId, probaly with the name
import { secret } from '../../../api/secret';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open('./mydb.sqlite');

  if (req.method === 'POST') {
    //get person by email
    const person = await db.get('select * from person where email = ?', [
      req.body.email,
    ]);
    compare(req.body.password, person.password).then(function (result) {
      if (result) {
        const claims = { sub: person.id, myPersonName: person.name }; //sub means subject
        const jwt = sign(claims, secret, {
          expiresIn: '1h',
        }); //sign claims with a secret
        res.json({ authToken: jwt });
      } else res.json({ message: 'Oops' });
    });
  } else {
    //when request is not 'POST'
    res.status(405).json({ message: 'We only accept POST' });

    //khi access localhost:3000/api/signup thì nhận đc message: 'we only accept POST' luôn vì khi access trang là thực hiện GET request?
  }
}
