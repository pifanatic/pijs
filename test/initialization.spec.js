import PiJS from "../js/pi.js";

describe("Initialization", function() {
    it("should fail without options", () => {
        assert.throws(() => {
            PiJS.init();
        }, "PiJS - Initialization failed: no options given!");
    });

    it("should fail without anchor element", () => {
        assert.throws(() => {
            PiJS.init({});
        }, "PiJS - Initialization failed: no anchor element given!");
    });

    it("should fail if anchor element is not in DOM", () => {
        assert.throws(() => {
            PiJS.init({ el: "#notThere" });
        }, "PiJS - Initialization failed: anchor element '#notThere' not in DOM");
    });

    it("should not fail with valid parameters", () => {
        let el = document.createElement("div");
        el.setAttribute("id", "foo");
        document.body.appendChild(el);

        assert.doesNotThrow(() => {
            PiJS.init({ el: "#foo" });
        });
    })
});
