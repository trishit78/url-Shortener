import { serverConfig } from "../config";
import { redisClient } from "../config/redis";

export class CacheRepository{
    async getNextId():Promise<number>{
        const key = serverConfig.REDIS_COUNTER_KEY;
        if(!redisClient.isOpen){
            await redisClient.connect()
        }

        const result = await redisClient.incr(key);
        return result;
    }


    async setUrlMapping(shorturl: string, originalUrl:string){
        const key= `url:${shorturl}`;
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
        await redisClient.set(key,originalUrl,{EX:86400}) // 86400 - 24hrs in seconds
        return;
    }

    async getUrlMapping(shorturl:string):Promise<string | null>{
        const key = `url${shorturl}`;
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
         const res = await redisClient.get(key)
                return res;
    }

    async deleteUrlMapping(shorturl:string){
        const key = `url${shorturl}`;
        if(!redisClient.isOpen){
            await redisClient.connect()
        }
         await redisClient.del(key)
                return;
    }

}