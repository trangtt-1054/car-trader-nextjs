import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import sqlite from 'sqlite';
import { verify } from 'jsonwebtoken';
import { secret } from '../../../api/secret';

//authenticated thực chất là handleErrors function copy từ https://github.com/vercel/micro/, xong wrap getPeople với authenticated
export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //First, check if there is a valid token, verification function copied from https://www.npmjs.com/package/jsonwebtoken
  verify(req.headers.authorization!, secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res); //nếu ko có lỗi và decode ok thì mới chạy cái fn con (cái đc wrapped)
    }
    res.status(401).json({ message: 'Your not authenticated ' });
  });
};

//after import sqlite, make this function async, const select the people from db and pass it to res.json()
export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./mydb.sqlite');
  //const people = await db.all("select * from person"); //nếu ko có await thì people sẽ là empty object, because db.all returns a promise
  //res.json([{ name: 'trang' }, { name: 'bruno' }]);

  //sau khi có authenticate thì ko đc select * (all) nữa, nếu mà select * thì sẽ send cả password
  const people = await db.all('select id, email, name from person');
  res.json(people);
});
