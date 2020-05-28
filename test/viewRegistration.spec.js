import PiJS from "../js/pi.js";

describe("View", () => {
    afterEach(() => {
        PiJS._unregisterAll();
    });

    describe("Registration", () => {
        it("should fail without 'name'", () => {
            expect(() => {
                PiJS.register({
                    tagName: "foo",
                    template: "<div></div>"
                });
            }).to.throw("PiJS - No 'name' given in view registration!");
        });

        it("should fail without 'tagName'", () => {
            expect(() => {
                PiJS.register({
                    name: "FooView",
                    template: "<div></div>"
                });
            }).to.throw("PiJS - No 'tagName' given in view registration!");
        });

        it("should fail without 'template'", () => {
            expect(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo"
                });
            }).to.throw("PiJS - No 'template' given in view registration!");
        });

        it("should succeed with valid parameters", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView).to.exist;
        });

        it("should set correct name", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView.name).to.equal("FooView");
        });

        it("should set correct tagName", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView.tagName).to.equal("foo");
        });

        it("should convert template string to HTMLElement", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView.template).to.be.an.instanceOf(HTMLElement);
        });

        it("should wrap view's template element in view tag", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView.template.tagName).to.equal("FOO");
        });

        it("should set template's innerHTML to given template string", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView.template.innerHTML).to.equal("<div></div>");
        });

        it("should succeed with empty template", () => {
            expect(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo",
                    template: ""
                });
            }).not.to.throw();
        });

        it("should throw on duplicated view name", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo-1",
                template: "<div></div>"
            });

            expect(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo-2",
                    template: "<span></span>"
                });
            }).to.throw("PiJS - 'FooView' has already been registered!");
        });
    });

    describe("Unregistration", () => {
        it("should remove view registration", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            expect(PiJS.classes.FooView).to.exist;

            PiJS.unregister("FooView");

            expect(PiJS.classes.FooView).to.be.undefined;
        });

        it("should allow to register same view again", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            PiJS.unregister("FooView");

            expect(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo",
                    template: "<div></div>"
                });
            }).not.to.throw();
        });
    });
});
