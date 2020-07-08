import { NextPageContext } from "next";
import Router from "next/router";

const myGet = async (url: string, ctx: NextPageContext) => {
  //fix lỗi khi navigate từ home sang people thì ok nhưng khi refresh tại page people thì fail auth
  //console.log(ctx.req)
  const cookie = ctx.req!.headers.cookie; //grab the cookie
  const res = await fetch(url, {
    headers: {
      cookie: cookie!
    }
  });

  if (res.status === 401 && !ctx.req) {
    //we're on client side, ở client side thì ko có request
    Router.replace("/login");
    return {}; //make sure that we get away/we're done/we're out of here
  }

  if (res.status === 401 && ctx.req) {
    //we're on server-side
    //soft redirect, khi access people mà chưa có auth thì redirect trực tiếp đến login
    ctx.res!.writeHead(302, {
      Location: "http://localhost:3000/login"
    });
    ctx.res!.end(); //make sure that we get away/we're done/we're out of here
    return;
  }
  const json = await res.json();
  return json;
};

export default myGet;
