import { Capture } from "../dist";
import { describe, it, expect } from "vitest";

const capture = new Capture("test", "test");

describe("Capture URL Builder", () => {
	describe("Image Requests", () => {
		it("should be an object", () => {
			expect(capture).toHaveProperty("buildImageUrl");
			expect(capture.buildImageUrl).toBeInstanceOf(Function);
		});

		it("buildImageUrl should return valid url", () => {
			const url = capture.buildImageUrl("https://news.ycombinator.com/");
			expect(url).toBe(
				"https://cdn.capture.page/test/f37d5fb3ee4540a05bf4ffeed6dffa28/image?url=https%3A%2F%2Fnews.ycombinator.com%2F",
			);
		});

		it("buildImageUrl with options should return valid url", () => {
			const url = capture.buildImageUrl("https://capture.page/", {
				full: true,
				delay: 3,
			});
			expect(url).toBe(
				"https://cdn.capture.page/test/0e944abb6d823d0c8618dc22e508be6d/image?full=true&delay=3&url=https%3A%2F%2Fcapture.page%2F",
			);
		});
	});

	describe("PDF Requests", () => {
		it("should be an object", () => {
			expect(capture).toHaveProperty("buildPdfUrl");
			expect(capture.buildPdfUrl).toBeInstanceOf(Function);
		});

		it("buildPdfUrl should return valid url", () => {
			const url = capture.buildPdfUrl("https://news.ycombinator.com/");
			expect(url).toBe(
				"https://cdn.capture.page/test/f37d5fb3ee4540a05bf4ffeed6dffa28/pdf?url=https%3A%2F%2Fnews.ycombinator.com%2F",
			);
		});

		it("buildPdfUrl with options should return valid url", () => {
			const url = capture.buildPdfUrl("https://capture.page/", {
				full: true,
				delay: 3,
			});
			expect(url).toBe(
				"https://cdn.capture.page/test/0e944abb6d823d0c8618dc22e508be6d/pdf?full=true&delay=3&url=https%3A%2F%2Fcapture.page%2F",
			);
		});
	});

	describe("Content Requests", () => {
		it("should be an object", () => {
			expect(capture).toHaveProperty("buildContentUrl");
			expect(capture.buildContentUrl).toBeInstanceOf(Function);
		});

		it("buildContentUrl should return valid url", () => {
			const url = capture.buildContentUrl("https://news.ycombinator.com/");
			expect(url).toBe(
				"https://cdn.capture.page/test/f37d5fb3ee4540a05bf4ffeed6dffa28/content?url=https%3A%2F%2Fnews.ycombinator.com%2F",
			);
		});
	});

	describe("Metadata Requests", () => {
		it("should be an object", () => {
			expect(capture).toHaveProperty("buildMetadataUrl");
			expect(capture.buildMetadataUrl).toBeInstanceOf(Function);
		});

		it("buildMetadataUrl should return valid url", () => {
			const url = capture.buildMetadataUrl("https://news.ycombinator.com/");
			expect(url).toBe(
				"https://cdn.capture.page/test/f37d5fb3ee4540a05bf4ffeed6dffa28/metadata?url=https%3A%2F%2Fnews.ycombinator.com%2F",
			);
		});
	});

	describe("Animated Requests", () => {
		it("should be an object", () => {
			expect(capture).toHaveProperty("buildAnimatedUrl");
			expect(capture.buildAnimatedUrl).toBeInstanceOf(Function);
		});

		it("buildAnimatedUrl should return valid url", () => {
			const url = capture.buildAnimatedUrl("https://news.ycombinator.com/");
			expect(url).toBe(
				"https://cdn.capture.page/test/f37d5fb3ee4540a05bf4ffeed6dffa28/animated?url=https%3A%2F%2Fnews.ycombinator.com%2F",
			);
		});

		it("buildAnimatedUrl with options should return valid url", () => {
			const url = capture.buildAnimatedUrl("https://capture.page/", {
				delay: 3,
			});
			expect(url).toBe(
				"https://cdn.capture.page/test/27e77d8cd67d43e3a490a926c53a4516/animated?delay=3&url=https%3A%2F%2Fcapture.page%2F",
			);
		});
	});
});

describe("Falsy Value Handling", () => {
	it("should preserve zero values in query parameters", () => {
		const url = capture.buildImageUrl("https://capture.page/", {
			delay: 0,
			top: 0,
			left: 0,
		});

		expect(url).toContain("delay=0");
		expect(url).toContain("top=0");
		expect(url).toContain("left=0");
	});

	it("should preserve false boolean values in query parameters", () => {
		const url = capture.buildImageUrl("https://capture.page/", {
			full: false,
			darkMode: false,
			blockCookieBanners: false,
		});

		expect(url).toContain("full=false");
		expect(url).toContain("darkMode=false");
		expect(url).toContain("blockCookieBanners=false");
	});

	it("should exclude undefined values from query parameters", () => {
		const url = capture.buildImageUrl("https://capture.page/", {
			delay: undefined,
			full: undefined,
			vw: 1440,
		});

		expect(url).not.toContain("delay=");
		expect(url).not.toContain("full=");
		expect(url).toContain("vw=1440");
	});

	it("should exclude null values from query parameters", () => {
		const url = capture.buildImageUrl("https://capture.page/", {
			delay: null as any,
			full: null as any,
			vw: 1440,
		});

		expect(url).not.toContain("delay=");
		expect(url).not.toContain("full=");
		expect(url).toContain("vw=1440");
	});

	it("should handle mixed falsy and truthy values correctly", () => {
		const url = capture.buildImageUrl("https://capture.page/", {
			delay: 0,
			full: false,
			vw: 1440,
			darkMode: true,
			waitFor: undefined,
		});

		expect(url).toContain("delay=0");
		expect(url).toContain("full=false");
		expect(url).toContain("vw=1440");
		expect(url).toContain("darkMode=true");
		expect(url).not.toContain("waitFor=");
	});
});

describe("Capture URL Builder with useEdge", () => {
	const edgeCapture = new Capture("test", "test", { useEdge: true });

	it("buildImageUrl should use edge URL", () => {
		const url = edgeCapture.buildImageUrl("https://news.ycombinator.com/");
		expect(url.startsWith("https://edge.capture.page/")).toBe(true);
	});

	it("buildPdfUrl should use edge URL", () => {
		const url = edgeCapture.buildPdfUrl("https://news.ycombinator.com/");
		expect(url.startsWith("https://edge.capture.page/")).toBe(true);
	});

	it("buildContentUrl should use edge URL", () => {
		const url = edgeCapture.buildContentUrl("https://news.ycombinator.com/");
		expect(url.startsWith("https://edge.capture.page/")).toBe(true);
	});

	it("buildMetadataUrl should use edge URL", () => {
		const url = edgeCapture.buildMetadataUrl("https://news.ycombinator.com/");
		expect(url.startsWith("https://edge.capture.page/")).toBe(true);
	});

	it("buildAnimatedUrl should use edge URL", () => {
		const url = edgeCapture.buildAnimatedUrl("https://news.ycombinator.com/");
		expect(url.startsWith("https://edge.capture.page/")).toBe(true);
	});
});
