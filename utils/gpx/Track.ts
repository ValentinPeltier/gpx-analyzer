import Extensions from "./Extensions";
import Link from "./Link";
import Point from "./Point";
import TrackSegment from "./TrackSegment";

export type TrackPoint = Point & {
    distance?: number;
}

/**
 * A track is an ordered list of points describing a path.
 */
export default class Track {

    /** GPS name of track. */
    name?: string;

    /** GPS comment for track. */
    cmt?: string;

    /** User description of track. */
    desc?: string;

    /** Source of data. */
    src?: string;

    /** Links to external information about track. */
    link?: Link[];

    /** GPS track number. */
    number?: number;

    /** Type (classification) of track. */
    type?: string;

    /** Extended elements from another schema */
    extensions?: Extensions;

    /** The track segments. */
    trkseg?: TrackSegment[];

    /**
     * Get the points of all the track segments, with additional information.
     */
    get points(): TrackPoint[] {
        const points: Point[] = [];

        // Flatten the points
        this.trkseg?.forEach((trkseg) => {
            if (trkseg.trkpt) {
                points.push(...trkseg.trkpt);
            }
        });

        // Compute additional info
        let distanceAccumulation = 0;
        return points.map<TrackPoint>((point, index) => {
            const trackPoint: TrackPoint = point;

            // Distance of the first point is 0 km
            if (index === 0) {
                trackPoint.distance = 0;
            }
            else {
                const previousPoint = points[index - 1];

                // Accumulate distance
                distanceAccumulation += Track.#calculateDistance(previousPoint, point);

                // Set the point distance
                trackPoint.distance = distanceAccumulation;
            }

            return trackPoint;
        });
    }

    /**
     * Calculate distance between two points, based on haversine formula
     * and using WGS84 semi-major axis value.
     * @returns The distance in kilometers.
     */
    static #calculateDistance(point1: Point, point2: Point): number {
        // WGS84 semi-major axis value
        const R = 6_378_137; // In meters

        const φ1 = point1["@lat"] * Math.PI / 180; // In radians
        const φ2 = point2["@lat"] * Math.PI / 180; // In radians
        const Δφ = φ2 - φ1;
        const Δλ = (point2["@lon"] - point1["@lon"]) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c / 1000;
    }
}