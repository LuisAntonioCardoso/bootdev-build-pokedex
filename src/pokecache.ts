
export type CacheEntry<T> = {
  createdAt: number,
  val: T,
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: ReturnType<typeof setInterval>|undefined = undefined;
  #interval: number;
 
  constructor(duration:number) {
    this.#interval = duration;
    this.#startReapLoop();
  } 

  add<T>(key:string, val:T){
    this.#cache.set(key,{
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key:string): T|undefined {
    return this.#cache.get(key)?.val;
  }

  #reap(){
    const now = Date.now();

    for(const [key,value] of this.#cache){
      if (value.createdAt <= now-this.#interval)
        this.#cache.delete(key);
    }
  }

  #startReapLoop(){
    this.#reapIntervalId = setInterval(()=>this.#reap(), this.#interval);
  }

  stopReapLoop(){
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId=undefined;
  }
}
