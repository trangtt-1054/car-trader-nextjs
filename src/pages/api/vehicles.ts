import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";

export default async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open("./mydb.sqlite");
  const vehicle = await db.all("select * from vehicle"); //select from　phải chọn đúng tên trong 001-helloworld.sql;
  res.json(vehicle);
}
