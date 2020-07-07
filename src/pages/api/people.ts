import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";

//after import sqlite, make this function async, const select the people from db and pass it to res.json()
export default async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open("./mydb.sqlite");
  const people = await db.all("select * from person"); //nếu ko có await thì people sẽ là empty object, because db.all returns a promise
  //res.json([{ name: 'trang' }, { name: 'bruno' }]);
  res.json(people);
}
