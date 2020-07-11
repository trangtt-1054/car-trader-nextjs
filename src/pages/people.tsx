import { NextPageContext } from "next";
import myGet from "../../api/myGet";

export default function People({ people }: any) {
  return <h1>Hi, folks {JSON.stringify(people)}</h1>;
}

People.getInitialProps = async (ctx: NextPageContext) => { //this code run both on your server and everytime you navigate to this page on client side
  const json = await myGet("http://localhost:3000/api/people", ctx);
  return { people: json };
};
