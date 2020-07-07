import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";

export default async function getVehicleById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open("./mydb.sqlite");
  const vehicle = await db.get("select * from vehicle where id = ?", [
    req.query.id
  ]); //select vehicle where id is equal to parameter, parameter is [req.query.id], pass [req.query.id] vào cái dấu hỏi chấm kia
  //get 1 vehicle thôi nhưng lại là array (có 1 element) => ko muốn array đấy mà chỉ muốn 1 object thôi thì đổi db.all thành db.get
  res.json(vehicle);
}
