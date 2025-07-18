import Extensions from "./Extensions";
import Link from "./Link";

/**
 * A waypoint, point of interest, or named feature on a map.
 */
export default class Point {

    /** The latitude of the point. Decimal degrees, WGS84 datum. */
    "@lat": number;

    /** The longitude of the point. Decimal degrees, WGS84 datum. */
    "@lon": number;

    /** Elevation (in meters) of the point. */
    ele?: number;

    /**
     * Date/time of the point.
     * Must be in Universal Coordinated Time (UTC).
     * Must be conform to ISO 8601 for date/time representation.
     * Fractional seconds are allowed.
     */
    time?: string;

    /** Magnetic variation (in degrees) at the point. */
    magvar?: number;

    /**
     * Height (in meters) of geoid (mean sea level) above WGS84 earth ellipsoid.
     * As defined in NMEA GGA message.
     * */
    geoidheight?: number;

    /** The name of the point. */
    name?: string;

    /** The comment of the point. */
    cmt?: string;

    /** A text description of the element. */
    desc?: string;

    /**
     * Source of data.
     * Included to give user some idea of reliability and accuracy of data.
     * e.g.: "Garmin eTrex", "USGS quad Boston North", ...
     */
    src?: string;

    /** Links to additional information about the point. */
    link?: Link[];

    /** Text of GPS symbol name. */
    sym?: string;

    /** Type (classification) of the point. */
    type?: string;

    /** Type of GPX fix. */
    fix?: "none" | "2d" | "3d" | "dgps" | "pps";

    /** Number of satellites used to calculate the GPX fix. */
    sat?: number;

    /** Horizontal dilution of precision. */
    hdop?: number;

    /** Vertical dilution of precision. */
    vdop?: number;

    /** Position dilution of precision. */
    pdop?: number;

    /** Number of seconds since last DGPS update. */
    ageofdgpsdata?: number;

    /** ID of DGPS station used in differential correction. */
    dgpsid?: number;

    /** Extended elements from another schema. */
    extensions?: Extensions;
}