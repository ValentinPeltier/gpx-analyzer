import Extensions from "./Extensions";
import Link from "./Link";
import Point from "./Point";

/**
 * A route is an ordered list of waypoints representing a series of turn points leading to a destination.
 */
export default class Route {

    /** Name of route. */
    name?: string;

    /** Comment of the route. */
    cmt?: string;

    /** Description of the route. */
    desc?: string;

    /** Source of data. */
    src?: string;

    /** Links to external information about the route. */
    link?: Link[];

    /** GPS route number. */
    number?: number;

    /** Type (classification) of route. */
    type?: string;

    /** Extended elements from another schema. */
    extensions?: Extensions;

    /** A list of route points. */
    rtept?: Point[];
}