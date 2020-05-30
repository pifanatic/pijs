import PiJS from "../js/pi.js";

describe("Render", () => {
    let el,
        template,
        view;

    beforeEach(() => {
        el = document.createElement("div");
        el.setAttribute("id", "foo");
        el.innerHTML = "<foo></foo>";

        template = "<div> Foobar </div>";
    });

    afterEach(() => {
        PiJS._unregisterAll();

        document.body.removeChild(el);
    });

    function _initPiJS() {
        PiJS.register({
            name: "FooView",
            tagName: "foo",
            template: template
        });

        document.body.appendChild(el);
        PiJS.init({ el: "#foo" });

        view = PiJS.mainView.subviews[0].view;
    }

    it("should render view template", () => {
        _initPiJS();

        expect(el.innerHTML).to.equal("<foo><div> Foobar </div></foo>");
    });

    it("should render multiple views of same type correctly", () => {
        el.innerHTML = "<foo></foo><foo></foo>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo><div> Foobar </div></foo>" +
            "<foo><div> Foobar </div></foo>"
        );
    });

    it("should render multiple views of different type correctly", () => {
        PiJS.register({
            name: "FooView2",
            tagName: "foo-2",
            template: "<span> Foobar-2 </span>"
        });

        el.innerHTML = "<foo></foo><foo-2></foo-2>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo><div> Foobar </div></foo>" +
            "<foo-2><span> Foobar-2 </span></foo-2>"
        );
    });

    it("should render nested views correctly", () => {
        PiJS.register({
            name: "FooView2",
            tagName: "foo-2",
            template: "Foobar-2 <foo></foo>"
        });

        el.innerHTML = "<foo-2></foo-2>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo-2>Foobar-2 <foo><div> Foobar </div></foo></foo-2>"
        );
    });

    it("should replace undefined placeholders correctly", () => {
        template = "<div> {{ foobar }} </div>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo><div> undefined </div></foo>"
        );
    });

    it("should replace defined placeholders correctly", () => {
        template = "<div> {{ foobar }} </div>";

        _initPiJS();

        view.set("foobar", 69);

        expect(el.innerHTML).to.equal(
            "<foo><div> 69 </div></foo>"
        );
    });

    it("should replace multiple placeholders correctly", () => {
        template = "<div> {{ foobar }} </div><span> {{ bazqrr }} {{ foobar }} </span>";

        _initPiJS();

        view.set("foobar", 69);
        view.set("bazqrr", 42);

        expect(el.innerHTML).to.equal(
            "<foo><div> 69 </div><span> 42 69 </span></foo>"
        );
    });
});
