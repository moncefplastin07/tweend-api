import { serve } from "http/server.ts";
import { getTrendList } from "./getTrends.ts";
serve(async (_req) => {
  const pathName = new URL(_req.url).pathname
  
      return new Response(`${JSON.stringify(await getTrendList(pathName, 10))}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }),
    });
    
    
});