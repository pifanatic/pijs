import PiJS from "../../js/pi.js";

describe("If", () => {
    let el,
        template,
        view;

    beforeEach(() => {
        el = document.createElement("div");
        el.setAttribute("id", "foo");
        el.innerHTML = "<foo></foo>";

        template = "PRE <div pi-if='foo'> Foobar </div> AFTER";
    });

    afterEach(() => {
        PiJS._unregisterAll();

        document.body.removeChild(el);
    });

    function _initPiJS() {
        document.body.appendChild(el);

        PiJS.register({
            name: "FooView",
            tagName: "foo",
            template: template
        });

        PiJS.init({ el: "#foo" });

        view = PiJS.mainView.subviews[0].view;
    }

    it("should render element if condition yields true", () => {
        _initPiJS();
        view.set("foo", true);

        expect(view.$el.innerHTML).to.equal("PRE <div> Foobar </div> AFTER");
    });

    it("should not render element if condition yields false", () => {
        _initPiJS();
        view.set("foo", false);

        expect(view.$el.innerHTML).to.equal("PRE  AFTER");
    });

    it("should also remove deeper nested elements", () => {
        template = "PRE <div><div pi-if='foo'> Foobar </div></div> AFTER";
        _initPiJS();
        view.set("foo", false);

        expect(view.$el.innerHTML).to.equal("PRE <div></div> AFTER");
    });
});
