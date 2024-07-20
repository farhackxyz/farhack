/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { BANNER_IMG, BASE_URL } from "../../lib/utils";

 
const handleRequest = frames(async (ctx) => {
  let currentState: any = ctx.state;
  const name = ctx.searchParams.name;
  if(name === "Menu" && currentState.count !== 0){
    currentState = {count: 0}
    ctx.state.count = 0;
  }
  return {
    image: BANNER_IMG,
    buttons: [
      <Button action="post" target={{pathname: "/", query: { name: "Menu" }}}>
        Home
      </Button>,
       <Button action="link" target={BASE_URL}>View site</Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;