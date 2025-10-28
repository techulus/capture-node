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
