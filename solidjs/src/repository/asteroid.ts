import {Asteroid} from "../model/asteroid";

export class NasaAsteroidRepository {
    private readonly nasa_api_key: string;
    private readonly version: string;

    public constructor(nasa_api_key: string) {
        this.nasa_api_key = nasa_api_key;
        this.version = "v1";
    }

    public async fetchNasaAsteroids(startDate: Date, endDate: Date): Promise<Record<string, string>> {
        let res = await fetch(
          `https://api.nasa.gov/neo/rest/${this.version}/feed?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&api_key=${this.nasa_api_key}`
        );
        let data: any = await res.json();
        const asteroids: Array<unknown> = Object.values(data["near_earth_objects"]).flatMap(array => array);
        const asteroid_id_name_map: Record<string, string> = {};
        for (const item of asteroids) {
            // @ts-ignore
            asteroid_id_name_map[item["id"]] = item["name"]
        }
        return asteroid_id_name_map
    }
    public async fetchAsteroidById(id: string): Promise<Asteroid> {
        return fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=6iFjRgFgLhAmhcZ0PfhTMRkdqxtdAmZO9gYIDdS7`
        ).then(res => res.json()).then((data) => {
            return new Asteroid(data)
        })
    }
}
