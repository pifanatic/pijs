import Utils from "../src/utils.js";

describe("Escape", function() {
    it("should handle '<' correctly", () => {
        expect(Utils.escape("<")).to.equal("&lt;");
    });

    it("should handle '>' correctly", () => {
        expect(Utils.escape(">")).to.equal("&gt;");
    });

    it("should handle '&' correctly", () => {
        expect(Utils.escape("&")).to.equal("&amp;");
    });

    it("should replace multiple values correctly", () => {
        expect(Utils.escape(">>>")).to.equal("&gt;&gt;&gt;");
    });

    it("should handle a combination of all values correctly", () => {
        expect(Utils.escape("<&>")).to.equal("&lt;&amp;&gt;");
    });

    it("should return undefined for an undefined value", () => {
        expect(Utils.escape(undefined)).to.be.undefined;
    });

    it("should return undefined for a null value", () => {
        expect(Utils.escape(null)).to.be.undefined;
    });

    it("should stringify numerical values", () => {
        expect(Utils.escape(42)).to.equal("42");
    });

    it("should handle empty string correctly", () => {
        expect(Utils.escape("")).to.equal("");
    });

    it("should handle 0 correctly", () => {
        expect(Utils.escape(0)).to.equal("0");
    });

    it("should stringify boolean values", () => {
        expect(Utils.escape(true)).to.equal("true");
    });

    it("should stringify objects", () => {
        expect(Utils.escape({ foo: "bar" })).to.equal("[object Object]");
    });

    it("should throw for non-stringifiable argument", () => {
        let f = function() {};

        f.prototype.toString = null;

        expect(() => {
            Utils.escape(new f());
        }).to.throw("Cannot stringify argument!");
    });
});
