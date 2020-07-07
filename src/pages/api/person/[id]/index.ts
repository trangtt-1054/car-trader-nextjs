import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";

export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open("./mydb.sqlite");

  if (req.method === "PUT") {
    const statement = await db.prepare(
      "UPDATE person SET name= ?, email = ? where id = ?"
    );
    const result = await statement.run(
      req.body.name,
      req.body.email,
      req.query.id
    ); //thứ tự statement.run phải đúng thứ tự db.prepare, giữa email và where id ko đc có dấu phẩy nếu ko sẽ bị lỗi 500 internal server error.
    result.finalize();
  }

  const person = await db.get("select * from person where id = ?", [
    req.query.id
  ]);
  res.json(person);
}

/* paste vào console
const response = await fetch('http://localhost:3000/api/person/2', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },

  body: JSON.stringify({ name: 'New Name', email: 'NewEmail@g.c'})
}) 

await response.json();
*/
