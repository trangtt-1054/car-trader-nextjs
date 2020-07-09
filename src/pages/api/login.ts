import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"; //sign the object with userId, probaly with the name
import { secret } from "../../../api/secret";
import cookie from "cookie";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open("./mydb.sqlite");

  if (req.method === "POST") {
    //get person by email
    const person = await db.get("select * from person where email = ?", [
      req.body.email
    ]);
    compare(req.body.password, person.password).then(function(result) {
      if (result) {
        const claims = { sub: person.id, myPersonName: person.name }; //sub means subject
        const jwt = sign(claims, secret, {
          expiresIn: "1h"
        }); //sign claims with a secret
        //serialize tương đương với JSON.stringify, các options có trong này https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie ở phần Attributes
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", jwt, {
            httpOnly: true, //make sure JS can not access our cookie
            //secure: true, //make sure cookie is only transferred via https
            //đáng lẽ ra secure là true nhưng mà localhost thì ko có https nên set thành khi env ko phải là 'development' thì ko cần care secure
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600, //1 hr,
            path: "/"
          })
        );
        //res.json({ authToken: jwt }); //khi set httpOnly true rồi thì JS ko access đc token nữa nên ko nên pass token ở đây nữa, chỉ gửi 1 cái message welcome back thôi
        res.json({ message: "Welcome back to the App" });
      } else res.json({ message: "Oops" });
    });
  } else {
    //when request is not 'POST'
    res.status(405).json({ message: "We only accept POST" });

    //khi access localhost:3000/api/signup thì nhận đc message: 'we only accept POST' luôn vì khi access trang là thực hiện GET request?
  }
}
