var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var capture = require('../index')('test', 'test');

describe('Capture URL Builder', function () {

    describe('Image Requests', function () {

        it('should be an object', function () {
            expect(capture).to.be.a('object');
            expect(capture).to.have.property('buildImageUrl');
            expect(capture.buildImageUrl).to.be.a('function');
        });

        it('buildImageUrl should return valid url', function () {
            var url = capture.buildImageUrl('https://news.ycombinator.com/');
            expect(url).to.be.a('string');
        });

        it('buildImageUrl with options should return valid url', function () {
            var url = capture.buildImageUrl('https://capture.techulus.in/', {
                full: true,
                delay: 3,
                t: Date.now()
            });
            expect(url).to.be.a('string');
        });

    });

    describe('PDF Requests', function () {

        it('should be an object', function () {
            expect(capture).to.be.a('object');
            expect(capture).to.have.property('buildPdfUrl');
            expect(capture.buildPdfUrl).to.be.a('function');
        });

        it('buildPdfUrl should return valid url', function () {
            var url = capture.buildPdfUrl('https://news.ycombinator.com/');
            expect(url).to.be.a('string');
        });

        it('buildPdfUrl with options should return valid url', function () {
            var url = capture.buildPdfUrl('https://capture.techulus.in/', {
                full: true,
                delay: 3,
                t: Date.now()
            });
            expect(url).to.be.a('string');
        });

    });

});