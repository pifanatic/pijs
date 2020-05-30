import PiJS from "../js/pi.js";

describe("View Initialization", function() {
    let el,
        init;

    function _setup() {
        PiJS.register({
            name: "FooView",
            tagName: "foo",
            template: "<div></div>",
            init: init
        });

        el = document.createElement("div");
        el.setAttribute("id", "foo");
        el.innerHTML = "<foo></foo>";
        document.body.appendChild(el);

        PiJS.init({ el: "#foo" });
    }

    afterEach(() => {
        PiJS._unregisterAll();

        if (el) {
            document.body.removeChild(el);
            el = null;
        }
    });

    it("should call 'init'", () => {
        init = chai.spy();

        _setup();

        expect(init).to.have.been.called.with();
    });

    it("should call init with the correct context", () => {
        let self;

        init = function() {
            self = this;
        };

        _setup();

        expect(self).to.equal(PiJS.mainView.subviews[0].view);
    });
});
