import { Capture } from "../dist";

const capture = new Capture("test", "test");

describe("Capture URL Builder", () => {
	describe("Image Requests", () => {
		it("should be an object", () => {
			expect(capture).toHaveProperty("buildImageUrl");
			expect(capture.buildImageUrl).toBeInstanceOf(Function);
		});

		it("buildImageUrl should return valid url", () => {
			const url = capture.buildImageUrl("https://news.ycombinator.com/");
			console.log(url);
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
});
