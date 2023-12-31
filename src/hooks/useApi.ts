//import trending from "../dummy/trending.json";
import memes from "../dummy/list.json";
import axios from "axios";

export interface TrendingMeme {
  created_utc: number;
  title: string;
  url: string;
}

export interface Meme {
  name: string;
  image: string;
}

export const useApi = () => {
  const getTrending = async (): Promise<TrendingMeme[]> => {
    //const baseUrl = window.location.origin;
    //const result = await axios.get(`${baseUrl}/.netlify/functions/crazy-memes`);
    const result = await axios.get(
      `https://main--gabeapps.netlify.app/.netlify/functions/crazy-memes`
    );
    return result.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //return new Promise((resolve, reject) => {
    //setTimeout(() => {
    //resolve(trending);
    //}, 2000);
    //});
  };

  const getMemes = (): Promise<Meme[]> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = memes.map((meme) => {
          return {
            name: meme,
            image: `/img/${meme}.jpeg`,
          };
        });
        resolve(result);
      }, 20);
    });
  };

  const createMeme = async (
    top: string,
    bottom: string,
    meme: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    //return new Promise((resolve, reject) => {
    //setTimeout(async () => {
    //const result = await fetch("/img/10-Guy.jpeg");
    //const blog = await result.blob();
    //const objectURL = URL.createObjectURL(blog);
    //resolve(objectURL);
    //}, 20);
    //});
    const result = await axios.get(
      "https://ronreiter-meme-generator.p.rapidapi.com/meme",
      {
        params: {
          top,
          bottom,
          meme,
        },
        headers: {
          "X-RapidAPI-Key":
            "da448481ccmshb236abfc2f9a79cp10a4a5jsna5b4da544728",
          "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
        },
        responseType: "blob",
      }
    );

    console.log("after call: ", result);

    return URL.createObjectURL(result.data);
  };

  return {
    getTrending,
    getMemes,
    createMeme,
  };
};
