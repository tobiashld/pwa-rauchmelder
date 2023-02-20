export interface GeoDatenI{
    address:{
        city?: string,
        city_district: string,
        construction: string,
        continent: string,
        country: string,
        country_code: string,
        house_number: string,
        neighbourhood: string,
        postcode: string,
        public_building: string,
        state: string,
        suburb: string
    },
    boundingbox:number[],
    display_name: string,
    importance: number,
    lat: string,
    licence: string,
    lon: string,
    osm_id: string,
    osm_type: string,
    place_id: string,
    svg: string,
    type: string
}

export class GeoDaten implements GeoDatenI{
    constructor(
        public address:{
            city?: string,
            city_district: string,
            construction: string,
            continent: string,
            country: string,
            country_code: string,
            house_number: string,
            neighbourhood: string,
            postcode: string,
            public_building: string,
            state: string,
            suburb: string
        },
        public boundingbox:number[],
        public display_name: string,
        public importance: number,
        public lat: string,
        public licence: string,
        public lon: string,
        public osm_id: string,
        public osm_type: string,
        public place_id: string,
        public svg: string,
        public type: string
    ){}
}


export function toGeoDatenConverter(data:any){
    return new GeoDaten(
        {
            city:data.address.city?data.address.city:undefined,
            city_district:data.adress.city_district,
            construction:data.address.construction,
            continent:data.address.continent,
            country:data.address.country,
            country_code:data.address.country_code,
            house_number:data.address.house_number,
            neighbourhood:data.address.neighbourhood,
            postcode:data.address.postcode,
            public_building:data.address.public_building,
            state:data.address.state,
            suburb:data.address.suburb,
        },data.boundingbox,data.display_name,data.importance,data.lat,data.licence,data.lon,data.osm_id,data.osm_type,data.place_id,data.svg,data.type
    )
}