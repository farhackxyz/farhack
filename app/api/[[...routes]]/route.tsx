/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog';
import { handle } from 'frog/vercel';

import {
  framePageOne,
  framePageTwo,
  framePageThree,
  framePageFour,
  rsvpUrl
} from '@utils/index';

type State = {
  count: number;
};

const app = new Frog<{ State: State }>({
  basePath: '/api',
  initialState: {
    count: 0
  }
});

app.frame('/', (c) => {
  const { buttonValue, deriveState } = c;
  const state = deriveState((previousState) => {
    if (buttonValue === 'next' && previousState.count < 3)
      previousState.count++;
    if (buttonValue === 'back') previousState.count--;
  });

  return c.res({
    image:
      state.count === 0
        ? framePageOne
        : state.count === 1
        ? framePageTwo
        : state.count === 2
        ? framePageThree
        : framePageFour,
    imageAspectRatio: '1:1',
    intents:
      state.count === 0
        ? [<Button value="next">Continue to RSVP</Button>]
        : state.count === 1
        ? [
            <Button value="back">Back</Button>,
            <Button value="next">Continue to RSVP</Button>
          ]
        : state.count === 2
        ? [
            <Button value="back">Back</Button>,
            <Button value="next">Continue to RSVP</Button>
          ]
        : [
            <Button value="back">Back</Button>,
            <Button action={rsvpUrl}>Continue to RSVP</Button>
          ]
  });
});

export const GET = handle(app);
export const POST = handle(app);
