import { Capture } from "../src";

const capture = new Capture("test", "test");

describe("Capture URL Builder", function () {
  describe("Image Requests", function () {
    it("should be an object", function () {
      expect(capture).toHaveProperty("buildImageUrl");
      expect(capture.buildImageUrl).toBeInstanceOf(Function);
    });

    it("buildImageUrl should return valid url", function () {
      const url = capture.buildImageUrl("https://news.ycombinator.com/");
      console.log(url);
      expect(url).toBe(
        "https://cdn.capture.techulus.in/test/f37d5fb3ee4540a05bf4ffeed6dffa28/image?url=https%3A%2F%2Fnews.ycombinator.com%2F"
      );
    });

    it("buildImageUrl with options should return valid url", function () {
      const url = capture.buildImageUrl("https://capture.techulus.in/", {
        full: true,
        delay: 3,
      });
      expect(url).toBe(
        "https://cdn.capture.techulus.in/test/2cb8b7ed9dbdb5c0db4a5dc4523a0780/image?full=true&delay=3&url=https%3A%2F%2Fcapture.techulus.in%2F"
      );
    });
  });

  describe("PDF Requests", () => {
    it("should be an object", function () {
      expect(capture).toHaveProperty("buildPdfUrl");
      expect(capture.buildPdfUrl).toBeInstanceOf(Function);
    });

    it("buildPdfUrl should return valid url", function () {
      const url = capture.buildPdfUrl("https://news.ycombinator.com/");
      expect(url).toBe(
        "https://cdn.capture.techulus.in/test/f37d5fb3ee4540a05bf4ffeed6dffa28/pdf?url=https%3A%2F%2Fnews.ycombinator.com%2F"
      );
    });

    it("buildPdfUrl with options should return valid url", function () {
      const url = capture.buildPdfUrl("https://capture.techulus.in/", {
        full: true,
        delay: 3,
      });
      expect(url).toBe(
        "https://cdn.capture.techulus.in/test/2cb8b7ed9dbdb5c0db4a5dc4523a0780/pdf?full=true&delay=3&url=https%3A%2F%2Fcapture.techulus.in%2F"
      );
    });
  });

  describe("Content Requests", () => {
    it("should be an object", function () {
      expect(capture).toHaveProperty("buildContentUrl");
      expect(capture.buildContentUrl).toBeInstanceOf(Function);
    });

    it("buildContentUrl should return valid url", function () {
      const url = capture.buildContentUrl("https://news.ycombinator.com/");
      expect(url).toBe(
        "https://cdn.capture.techulus.in/test/f37d5fb3ee4540a05bf4ffeed6dffa28/content?url=https%3A%2F%2Fnews.ycombinator.com%2F"
      );
    });
  });

  describe("Metadata Requests", () => {
    it("should be an object", function () {
      expect(capture).toHaveProperty("buildMetadataUrl");
      expect(capture.buildMetadataUrl).toBeInstanceOf(Function);
    });

    it("buildMetadataUrl should return valid url", function () {
      const url = capture.buildMetadataUrl("https://news.ycombinator.com/");
      expect(url).toBe(
        "https://cdn.capture.techulus.in/test/f37d5fb3ee4540a05bf4ffeed6dffa28/metadata?url=https%3A%2F%2Fnews.ycombinator.com%2F"
      );
    });
  });
});
