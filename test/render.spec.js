import PiJS from "../js/pi.js";

describe("Render", () => {
    let el;

    beforeEach(() => {
        el = document.createElement("div");
        el.setAttribute("id", "foo");

        PiJS.register({
            name: "FooView",
            tagName: "foo",
            template: "<div> Foobar </div>"
        });
    });

    afterEach(() => {
        PiJS._unregisterAll();

        document.body.removeChild(el);
    });

    function _initPiJS() {
        document.body.appendChild(el);
        PiJS.init({ el: "#foo" });
    }

    it("should render view template", () => {
        el.innerHTML = "<foo></foo>";

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
        PiJS.register({
            name: "FooView2",
            tagName: "foo-2",
            template: "<div> {{ foobar }} </div>"
        });

        el.innerHTML = "<foo-2></foo-2>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo-2><div> undefined </div></foo-2>"
        );
    });

    it("should replace defined placeholders correctly", () => {
        PiJS.register({
            name: "FooView2",
            tagName: "foo-2",
            template: "<div> {{ foobar }} </div>",
            init: function() {
                this.set("foobar", 69);
            }
        });

        el.innerHTML = "<foo-2></foo-2>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo-2><div> 69 </div></foo-2>"
        );
    });

    it("should replace multiple placeholders correctly", () => {
        PiJS.register({
            name: "FooView2",
            tagName: "foo-2",
            template: "<div> {{ foobar }} </div><span> {{ bazqrr }} {{ foobar }} </span>",
            init: function() {
                this.set("foobar", 69);
                this.set("bazqrr", 42);
            }
        });

        el.innerHTML = "<foo-2></foo-2>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo-2><div> 69 </div><span> 42 69 </span></foo-2>"
        );
    });

    it("should render implicitly after setting an attribute", () => {
        PiJS.register({
            name: "FooView2",
            tagName: "foo-2",
            template: "<div> {{ foobar }} </div>",
            init: function() {
                this.set("foobar", 69);
            }
        });

        el.innerHTML = "<foo-2></foo-2>";

        _initPiJS();

        expect(el.innerHTML).to.equal(
            "<foo-2><div> 69 </div></foo-2>"
        );

        PiJS.mainView.subviews[0].view.set("foobar", 42);

        expect(el.innerHTML).to.equal(
            "<foo-2><div> 42 </div></foo-2>"
        );
    });
});
