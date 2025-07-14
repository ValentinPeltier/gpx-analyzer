import { XMLParser } from "fast-xml-parser";

export class Extensions {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export class Link {
    "@href": string;
    text?: string;
    type?: string;
}

export class Metadata {
    name?: string;
    desc?: string;
    author?: {
        name?: string;
        email?: {
            "@id": string;
            "@domain": string;
        };
        link?: Link;
    };
    copyright?: {
        "@author": string;
        year?: string;
        license?: string;
    };
    link?: Link[];
    time?: string;
    keywords?: string;
    bounds?: {
        "@minlat": number;
        "@minlon": number;
        "@maxlat": number;
        "@maxlon": number;
    };
    extensions?: Extensions;
}

export class Pt {
    "@lat": number;
    "@lon": number;
    ele?: number;
    time?: string;
    magvar?: number;
    geoidheight?: number;
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    sym?: string;
    type?: string;
    fix?: "none" | "2d" | "3d" | "dgps" | "pps";
    sat?: number;
    hdop?: number;
    vdop?: number;
    pdop?: number;
    ageofdgpsdata?: number;
    dgpsid?: number;
    extensions?: Extensions;
}

export class TrkSeg {
    trkpt?: Pt[];
    extensions?: Extensions;
}

export class Rte {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    number?: number;
    type?: string;
    extensions?: Extensions;
    rtept?: Pt[];
}

export class Trk {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    number?: number;
    type?: string;
    extensions?: Extensions;
    trkseg?: TrkSeg[];
}

export default class GpxFile {

    // ----- Public attributes ----- //

    name: string;
    "@version": string;
    "@creator": string;
    metadata?: Metadata;
    wpt?: Pt[];
    rte?: Rte[];
    trk?: Trk[];
    extensions?: Extensions;

    // ----- Public methods ----- //

    constructor(name: string, version: string, creator: string) {
        this.name = name;
        this["@version"] = version;
        this["@creator"] = creator;
    }

    static parse(name: string, data: string) {
        // Parse GPX
        const gpx: GpxFile | undefined = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
            allowBooleanAttributes: true,
            isArray: (name: string, jsonPath: string): boolean => {
                return [
                    "gpx.metadata.link",
                    "gpx.wpt",
                    "gpx.wpt.link",
                    "gpx.rte",
                    "gpx.rte.link",
                    "gpx.rte.rtept",
                    "gpx.rte.rtept.link",
                    "gpx.trk",
                    "gpx.trk.link",
                    "gpx.trk.trkseg",
                    "gpx.trk.trkseg.trkpt",
                    "gpx.trk.trkseg.trkpt.link",
                ].indexOf(jsonPath) !== -1;
            },
        }).parse(data).gpx;
        if (gpx === undefined) {
            throw new Error("Unable to parse the file.");
        }

        // Instanciate an object and populate it with parsed data
        const file = new GpxFile(name, gpx["@version"], gpx["@creator"]);
        return Object.assign(file, gpx);
    }

    toString(): string {
        return JSON.stringify(this);
    }

    get nameWithoutExtension(): string {
        return this.name.replace(/\.[a-z0-9]$/i, "");
    }

    // ----- Private methods ----- //

    static #parseDate(date: string): Date {
        return new Date(Date.parse(date));
    }
}