import { NextPageContext } from "next";
import myGet from "../../api/myGet";

export default function People({ people }: any) {
  return <h1>Hi, folks {JSON.stringify(people)}</h1>;
}

People.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet("http://localhost:3000/api/people", ctx);
  return { people: json };
};
