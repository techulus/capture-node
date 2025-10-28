import { Capture } from "../dist";
import { describe, it, expect, beforeAll } from "vitest";

const CAPTURE_API_KEY = process.env.CAPTURE_API_KEY;
const CAPTURE_API_SECRET = process.env.CAPTURE_API_SECRET;
const TEST_URL = "https://techulus.xyz";

describe.skipIf(!CAPTURE_API_KEY || !CAPTURE_API_SECRET)("E2E Tests", () => {
	let capture: Capture;

	beforeAll(() => {
		capture = new Capture(
			CAPTURE_API_KEY as string,
			CAPTURE_API_SECRET as string,
		);
	});

	it("should fetch image successfully", async () => {
		const response = await fetch(capture.buildImageUrl(TEST_URL));
		expect(response.status).toBe(200);
		expect(response.ok).toBe(true);

		const buffer = await response.arrayBuffer();
		expect(buffer.byteLength).toBeGreaterThan(0);
	}, 30000);

	it("should fetch PDF successfully", async () => {
		const response = await fetch(capture.buildPdfUrl(TEST_URL));
		expect(response.status).toBe(200);
		expect(response.ok).toBe(true);

		const buffer = await response.arrayBuffer();
		expect(buffer.byteLength).toBeGreaterThan(0);
	}, 30000);

	it("should fetch content successfully", async () => {
		const response = await fetch(capture.buildContentUrl(TEST_URL));
		expect(response.status).toBe(200);
		expect(response.ok).toBe(true);

		const data = await response.json();
		expect(data).toHaveProperty("success");
		expect(data).toHaveProperty("html");
		expect(data).toHaveProperty("textContent");
	}, 30000);

	it("should fetch metadata successfully", async () => {
		const response = await fetch(capture.buildMetadataUrl(TEST_URL));
		expect(response.status).toBe(200);
		expect(response.ok).toBe(true);

		const data = await response.json();
		expect(data).toHaveProperty("success");
		expect(data).toHaveProperty("metadata");
	}, 30000);

	it("should fetch image with options successfully", async () => {
		const response = await fetch(
			capture.buildImageUrl(TEST_URL, {
				full: true,
				delay: 2,
			}),
		);
		expect(response.status).toBe(200);
		expect(response.ok).toBe(true);
	}, 30000);

	it("should use edge URL when useEdge option is enabled", async () => {
		const edgeCapture = new Capture(
			CAPTURE_API_KEY as string,
			CAPTURE_API_SECRET as string,
			{
				useEdge: true,
			},
		);

		const response = await fetch(edgeCapture.buildImageUrl(TEST_URL));
		expect(response.status).toBe(200);
		expect(response.ok).toBe(true);
	}, 30000);

	it("should test SDK convenience methods", async () => {
		const imageBuffer = await capture.fetchImage(TEST_URL);
		expect(imageBuffer.byteLength).toBeGreaterThan(0);

		const pdfBuffer = await capture.fetchPdf(TEST_URL);
		expect(pdfBuffer.byteLength).toBeGreaterThan(0);

		const content = await capture.fetchContent(TEST_URL);
		expect(content.success).toBe(true);
		expect(content.html).toBeTruthy();

		const metadata = await capture.fetchMetadata(TEST_URL);
		expect(metadata.success).toBe(true);
		expect(metadata.metadata).toBeTruthy();
	}, 60000);
});
