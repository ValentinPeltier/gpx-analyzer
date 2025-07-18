import { XMLParser } from "fast-xml-parser";
import Metadata from "./Metadata";
import Point from "./Point";
import Route from "./Route";
import Track from "./Track";
import Extensions from "./Extensions";

/**
 * A GPX file contains metadata, waypoints, routes and tracks.
 */
export default class File {

    /** File name. */
    name: string;

    /** GPX version. Must be "1.1". */
    "@version": string;

    /** Name or URL of the software that created the file. */
    "@creator": string;

    /** Metadata about the file. */
    metadata?: Metadata;

    /** A list of waypoints. */
    wpt?: Point[];

    /** A list of routes. */
    rte?: Route[];

    /** A list of tracks. */
    trk?: Track[];

    /** Extended elements from another schema. */
    extensions?: Extensions;

    constructor(name: string, version: string, creator: string) {
        this.name = name;
        this["@version"] = version;
        this["@creator"] = creator;
    }

    static parse(name: string, data: string) {
        // Parse GPX
        const gpx: File | undefined = new XMLParser({
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

        // Instanciate Track objects
        if (gpx.trk !== undefined) {
            gpx.trk = gpx.trk.map((trk) => Object.assign(new Track(), trk));
        }

        // Instanciate File object
        const file = new File(name, gpx["@version"], gpx["@creator"]);
        return Object.assign(file, gpx);
    }

    toString(): string {
        return JSON.stringify(this);
    }

    get nameWithoutExtension(): string {
        return this.name.replace(/\.[a-z0-9]$/i, "");
    }

    static #parseDate(date: string): Date {
        return new Date(Date.parse(date));
    }
}