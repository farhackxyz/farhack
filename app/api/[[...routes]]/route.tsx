/** @jsxImportSource frog/jsx */

import { FARHACK_RECAP_BANNER_URL, masonryGridImages } from '@/lib/utils'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    count: 0
  }
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', async(c) => {
  const { buttonValue, status, deriveState } = c
  const state = deriveState((previousState: any) => {
    if (buttonValue === 'next')
      previousState.count++;
    if (buttonValue === 'back') previousState.count--;
    if(buttonValue === 'restart') previousState.count = 1;
  }) as unknown as any;

  return c.res({
    image: state.count === 0 ? FARHACK_RECAP_BANNER_URL : masonryGridImages[state.count - 1].src,
    imageAspectRatio: '1:1',
    intents: state.count === 0 ? [
      <Button value="next">View images</Button>,
      <Button.Redirect location="https://farhack.xyz">Learn more</Button.Redirect>
    ] : masonryGridImages.length === state.count ? 
    [
      <Button value="back">Back</Button>,
      <Button value="restart">Restart</Button>
    ] : 
    [
      <Button value="back">Back</Button>,
      <Button value="next">Next</Button>
    ]
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)