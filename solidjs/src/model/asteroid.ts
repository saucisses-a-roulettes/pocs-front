export class Asteroid {
    readonly id: string;
    readonly name: string;
    readonly is_potentially_hazardous_asteroid: boolean;
    readonly close_approach_data: readonly CloseApproachData[];

    constructor(data: {
        id: string;
        name: string;
        is_potentially_hazardous_asteroid: boolean;
        close_approach_data: CloseApproachData[];
    }) {
        this.id = data.id;
        this.name = data.name;
        this.is_potentially_hazardous_asteroid = data.is_potentially_hazardous_asteroid;
        this.close_approach_data = data.close_approach_data.map(
          (approachData) => new CloseApproachData(approachData)
        );
    }
}

class CloseApproachData {
    readonly close_approach_date: string;
    readonly relative_velocity: {
        kilometers_per_second: number;
        kilometers_per_hour: number;
        miles_per_hour: number;
    };
    readonly miss_distance: {
        astronomical: number;
        lunar: number;
        kilometers: number;
        miles: number;
    };
    readonly orbiting_body: string;

    constructor(data: {
        close_approach_date: string;
        relative_velocity: {
            kilometers_per_second: number;
            kilometers_per_hour: number;
            miles_per_hour: number;
        };
        miss_distance: {
            astronomical: number;
            lunar: number;
            kilometers: number;
            miles: number;
        };
        orbiting_body: string;
    }) {
        this.close_approach_date = data.close_approach_date;
        this.relative_velocity = data.relative_velocity;
        this.miss_distance = data.miss_distance;
        this.orbiting_body = data.orbiting_body;
    }
}