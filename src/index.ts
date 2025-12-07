import { createHash } from "node:crypto";

/**
 * The type of capture request to perform.
 */
export type RequestType = "image" | "pdf" | "content" | "metadata" | "animated";

/**
 * Options that can be passed to customize the capture request.
 */
export type RequestOptions = Record<string, string | number | boolean>;

/**
 * Main class for interacting with the Capture.page API.
 */
export class Capture {
	static API_URL = "https://cdn.capture.page";
	static EDGE_URL = "https://edge.capture.page";

	key: string;
	secret: string;
	options: { useEdge?: boolean };

	/**
	 * Creates a new Capture instance.
	 *
	 * @param key - Your Capture.page API key
	 * @param secret - Your Capture.page API secret
	 * @param options - Optional configuration
	 */
	constructor(key: string, secret: string, options?: { useEdge?: boolean }) {
		this.key = key;
		this.secret = secret;
		this.options = options ?? { useEdge: false };
	}

	private _generateToken(secret: string, url: string) {
		return createHash("md5")
			.update(secret + url)
			.digest("hex");
	}

	private _toQueryString(options: RequestOptions) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(options)) {
			if (!value) {
				continue;
			}

			params.append(key, String(value));
		}

		return params.toString();
	}

	private _buildUrl(
		type: RequestType,
		url: string,
		requestOptions?: RequestOptions,
	) {
		if (!this.key || !this.secret) {
			throw new Error("Key and Secret is required");
		}
		if (typeof url !== "string") {
			throw new Error(
				"url should be of type string (something like www.google.com)",
			);
		}
		if (url === null) {
			throw new Error("url is required");
		}

		let query = "";
		let options = Object.assign({}, requestOptions);
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
		return `${this.options.useEdge ? Capture.EDGE_URL : Capture.API_URL}/${
			this.key
		}/${token}/${type}?${query}`;
	}

	/**
	 * Builds a URL for capturing a screenshot image.
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns The complete API URL for the image capture request
	 */
	buildImageUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("image", url, options);
	}

	/**
	 * Builds a URL for capturing a PDF.
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns The complete API URL for the PDF capture request
	 */
	buildPdfUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("pdf", url, options);
	}

	/**
	 * Builds a URL for capturing page content (HTML and text).
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns The complete API URL for the content capture request
	 */
	buildContentUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("content", url, options);
	}

	/**
	 * Builds a URL for capturing page metadata.
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns The complete API URL for the metadata capture request
	 */
	buildMetadataUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("metadata", url, options);
	}

	/**
	 * Builds a URL for capturing an animated screenshot (GIF or video).
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns The complete API URL for the animated capture request
	 */
	buildAnimatedUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("animated", url, options);
	}

	/**
	 * Captures and fetches a screenshot image.
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns A promise that resolves to the image data as an ArrayBuffer
	 */
	async fetchImage(
		url: string,
		options?: RequestOptions,
	): Promise<ArrayBuffer> {
		return fetch(this.buildImageUrl(url, options)).then((res) =>
			res.arrayBuffer(),
		);
	}

	/**
	 * Captures and fetches a PDF.
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns A promise that resolves to the PDF data as an ArrayBuffer
	 */
	async fetchPdf(url: string, options?: RequestOptions): Promise<ArrayBuffer> {
		return fetch(this.buildPdfUrl(url, options)).then((res) =>
			res.arrayBuffer(),
		);
	}

	/**
	 * Captures and fetches page content (HTML and text).
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns A promise that resolves to an object containing the HTML and text content
	 */
	async fetchContent(
		url: string,
		options?: RequestOptions,
	): Promise<{
		success: boolean;
		html: string;
		textContent: string;
		markdown: string;
	}> {
		return fetch(this.buildContentUrl(url, options)).then((res) => res.json());
	}

	/**
	 * Captures and fetches page metadata.
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns A promise that resolves to an object containing the page metadata
	 */
	async fetchMetadata(
		url: string,
		options?: RequestOptions,
	): Promise<{
		success: boolean;
		metadata: Record<string, string | number>;
	}> {
		return fetch(this.buildMetadataUrl(url, options)).then((res) => res.json());
	}

	/**
	 * Captures and fetches an animated screenshot (GIF or video).
	 *
	 * @param url - The target URL to capture
	 * @param options - Optional request parameters to customize the capture
	 * @returns A promise that resolves to the animated content as an ArrayBuffer
	 */
	async fetchAnimated(
		url: string,
		options?: RequestOptions,
	): Promise<ArrayBuffer> {
		return fetch(this.buildAnimatedUrl(url, options)).then((res) =>
			res.arrayBuffer(),
		);
	}
}
