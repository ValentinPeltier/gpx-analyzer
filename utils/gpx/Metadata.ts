import Extensions from "./Extensions";
import Link from "./Link";

/**
 * Information about the GPX file, author and copyright restrictions.
 */
export default class Metadata {

    /** The name of the GPX file. */
    name?: string;

    /** A description of the contents of the GPX file. */
    desc?: string;

    /** The person or organization who created the GPX file. */
    author?: {
        /** Name of person or organization. */
        name?: string;

        /** Email address. */
        email?: {
            /** Username of the email address. */
            "@id": string;

            /** Domain of the email address. */
            "@domain": string;
        };

        /** Link to Web site or other external information about person. */
        link?: Link;
    };

    /** Copyright and license information governing use of the file. */
    copyright?: {
        /** Copyright holder. */
        "@author": string;

        /** Year of copyright. */
        year?: string;

        /** Link to external file containing license text. */
        license?: string;
    };

    /** URLs associated with the location described in the file. */
    link?: Link[];

    /** The creation date of the file. */
    time?: string;

    /** Keywords associated with the file. */
    keywords?: string;

    /** Minimum and maximum coordinates which describe the extent of the coordinates in the file. */
    bounds?: {
        /** The minimum latitude. */
        "@minlat": number;

        /** The minimum longitude. */
        "@minlon": number;

        /** The maximum latitude. */
        "@maxlat": number;

        /** The maximum longitude. */
        "@maxlon": number;
    };

    /** Extended elements from another schema. */
    extensions?: Extensions;
}