import PiJS from "../js/pi.js";

describe("Initialization", function() {
    it("should fail without options", () => {
        expect(() => {
            PiJS.init();
        }).to.throw("PiJS - Initialization failed: no options given!");
    });

    it("should fail without anchor element", () => {
        expect(() => {
            PiJS.init({});
        }).to.throw("PiJS - Initialization failed: no anchor element given!");
    });

    it("should fail if anchor element is not in DOM", () => {
        expect(() => {
            PiJS.init({ el: "#notThere" });
        }).to.throw("PiJS - Initialization failed: anchor element '#notThere' not in DOM");
    });

    it("should not fail with valid parameters", () => {
        let el = document.createElement("div");
        el.setAttribute("id", "foo");
        document.body.appendChild(el);

        expect(() => {
            PiJS.init({ el: "#foo" });
        }).not.to.throw();
    });
});
