import { HoudiniClient, type RequestHandlerArgs } from '$houdini';

// this function can take a second argument that will contain the session
// data during a request or mutation
async function fetchQuery({ text, fetch, variables = {} }: RequestHandlerArgs) {
  const result = await fetch('https://api.bitski.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // parse the result as json
  return await result.json();
}

export default new HoudiniClient(fetchQuery);
