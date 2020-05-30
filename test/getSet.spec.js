import PiJS from "../js/pi.js";

describe("Get/Set", () => {
    let el,
        view;

    beforeEach(() => {
        el = document.createElement("div");
        el.setAttribute("id", "foo");
        el.innerHTML = "<foo></foo>";

        PiJS.register({
            name: "FooView",
            tagName: "foo",
            template: "<div> Foobar </div>"
        });

        document.body.appendChild(el);
        PiJS.init({ el: "#foo" });

        view = PiJS.mainView.subviews[0].view;
    });

    afterEach(() => {
        PiJS._unregisterAll();

        document.body.removeChild(el);
    });

    describe("Set", () => {
        it("should set value correctly", () => {
            view.set("foo", "bar");

            expect(view._attributes["foo"]).to.equal("bar");
        });

        it("should render implicitly", () => {
            chai.spy.on(view, "render");

            view.set("foobar", 69);

            expect(view.render).to.have.been.called();
        });
    });

    describe("Get", () => {
        it("should return correct value", () => {
            view._attributes["foo"] = "bar";

            expect(view.get("foo")).to.equal("bar");
        });
    });
});
