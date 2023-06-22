/**
 * @summary Capture Node SDK
 * @author Arjun Komath <arjunkomath@gmail.com>
 */

import qs from "qs";
import md5 from "md5";

export type RequestType = "image" | "pdf" | "content" | "metadata";
export type RequestOptions = Record<string, string | number | boolean>;

export class Capture {
  static API_URL = "https://cdn.capture.techulus.in";

  key: string;
  secret: string;

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  private _generateToken(secret: string, url: string) {
    return md5(secret + url);
  }

  private _toQueryString(options: RequestOptions) {
    const filterFunc = (key: string, value: string | number) => {
      if (key === "format") {
        return;
      }
      if (!value) {
        return;
      }
      return value;
    };

    const fixedEncodeURIComponent = (str: string) =>
      encodeURIComponent(str).replace(
        /[!'()*]/g,
        (c) => "%" + c.charCodeAt(0).toString(16)
      );

    return qs.stringify(options, {
      encoder: fixedEncodeURIComponent,
      filter: filterFunc,
      arrayFormat: "repeat",
    });
  }

  private _buildUrl(type: RequestType, url: string, options?: RequestOptions) {
    if (!this.key || !this.secret) {
      throw new Error("Key and Secret is required");
    }
    if (typeof url !== "string") {
      throw new Error(
        "url should be of type string (something like www.google.com)"
      );
    }
    if (url === null) {
      throw new Error("url is required");
    }
    let query = "";
    if (options) {
      options = Object.assign({}, options, {
        url: url,
      });
      query = this._toQueryString(options);
    } else {
      options = {
        url: url,
      };
      query = this._toQueryString(options);
    }
    const token = this._generateToken(this.secret, query);
    return `${Capture.API_URL}/${this.key}/${token}/${type}?${query}`;
  }

  buildImageUrl(url: string, options?: RequestOptions) {
    return this._buildUrl("image", url, options);
  }

  buildPdfUrl(url: string, options?: RequestOptions) {
    return this._buildUrl("pdf", url, options);
  }

  buildContentUrl(url: string, options?: RequestOptions) {
    return this._buildUrl("content", url, options);
  }

  buildMetadataUrl(url: string, options?: RequestOptions) {
    return this._buildUrl("metadata", url, options);
  }
}
