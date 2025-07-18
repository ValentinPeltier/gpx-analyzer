/**
 * A link to an external resource (Web page, digital photo, video clip, etc) with additional information.
 */
export default class Link {

    /** URL of hyperlink. */
    "@href": string;

    /** Text of hyperlink. */
    text?: string;

    /** MIME type of content (e.g.: `image/jpeg`). */
    type?: string;
}