import md5 from "md5";
import qs from "qs";

export type RequestType = "image" | "pdf" | "content" | "metadata" | "animated";
export type RequestOptions = Record<string, string | number | boolean>;

export class Capture {
	static API_URL = "https://cdn.capture.page";
	static EDGE_URL = "https://edge.capture.page";

	key: string;
	secret: string;
	options: { useEdge?: boolean };

	constructor(key: string, secret: string, options?: { useEdge?: boolean }) {
		this.key = key;
		this.secret = secret;
		this.options = options ?? { useEdge: false };
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
				(c) => `%${c.charCodeAt(0).toString(16)}`,
			);

		return qs.stringify(options, {
			encoder: fixedEncodeURIComponent,
			filter: filterFunc,
			arrayFormat: "repeat",
		});
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
		return `${this.options.useEdge ? Capture.EDGE_URL : Capture.API_URL}/${this.key}/${token}/${type}?${query}`;
	}

	buildImageUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("image", url, options);
	}

	buildPdfUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("pdf", url, options);
	}

	buildContentUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("content", url, options);
	}

	buildMetadataUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("metadata", url, options);
	}

	buildAnimatedUrl(url: string, options?: RequestOptions): string {
		return this._buildUrl("animated", url, options);
	}

	async fetchImage(
		url: string,
		options?: RequestOptions,
	): Promise<ArrayBuffer> {
		return fetch(this.buildImageUrl(url, options)).then((res) =>
			res.arrayBuffer(),
		);
	}

	async fetchPdf(url: string, options?: RequestOptions): Promise<ArrayBuffer> {
		return fetch(this.buildPdfUrl(url, options)).then((res) =>
			res.arrayBuffer(),
		);
	}

	async fetchContent(
		url: string,
		options?: RequestOptions,
	): Promise<{ success: boolean; html: string; textContent: string }> {
		return fetch(this.buildContentUrl(url, options)).then((res) => res.json());
	}

	async fetchMetadata(
		url: string,
		options?: RequestOptions,
	): Promise<{
		success: boolean;
		metadata: Record<string, string | number>;
	}> {
		return fetch(this.buildMetadataUrl(url, options)).then((res) => res.json());
	}

	async fetchAnimated(
		url: string,
		options?: RequestOptions,
	): Promise<ArrayBuffer> {
		return fetch(this.buildAnimatedUrl(url, options)).then((res) =>
			res.arrayBuffer(),
		);
	}
}
