import Extensions from "./Extensions";
import Point from "./Point";

/**
 * A track segment holds a list of track points which are logically connected in order.
 * To represent a single GPS track where GPS reception was lost, or the GPS receiver was turned off,
 * start a new Track Segment for each continuous span of track data.
 */
export default class TrackSegment {

    /** The track points. */
    trkpt?: Point[];

    /** Extended elements from another schema. */
    extensions?: Extensions;
}
