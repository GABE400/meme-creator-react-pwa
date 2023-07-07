import { Handler } from "@netlify/functions";
import axios from "axios";

const { RAPIDAPI_KEY } = process.env;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: Handler = async (event, context) => {
  const result = await axios.get(
    "https://reddit-meme.p.rapidapi.com/memes/trending",
    {
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        "X-RapidAPI-Key": RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "reddit-meme.p.rapidapi.com",
      },
    }
  );
  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
  };
};
