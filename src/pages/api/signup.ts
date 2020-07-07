import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import { hash } from "bcrypt";

export default async function SignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open("./mydb.sqlite");

  if (req.method === "POST") {
    hash(req.body.password, 10, async function(err, hash) {
      // Store hash in your password DB.

      const statement = await db.prepare(
        "INSERT INTO person (name, email, password) values (?, ?, ?)"
      );
      const result = await statement.run(
        req.body.name,
        req.body.email,
        //req.body.password
        hash
      ); //thứ tự statement.run phải đúng thứ tự db.prepare, giữa email và where id ko đc có dấu phẩy nếu ko sẽ bị lỗi 500 internal server error.
      result.finalize();

      const person = await db.get("select * from person"); //select all user
      res.json(person);
    });
  } else {
    //when request is not 'POST'
    res.status(405).json({ message: "We only accept POST" });

    //khi access localhost:3000/api/signup thì nhận đc message: 'we only accept POST' luôn vì khi access trang là thực hiện GET request?
  }
}
