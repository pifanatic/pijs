import PiJS from "../js/pi.js";

describe("View", () => {
    afterEach(() => {
        PiJS.unregister("FooView");
    });

    describe("Registration", () => {
        it("should fail without 'name'", () => {
            assert.throws(() => {
                PiJS.register({
                    tagName: "foo",
                    template: "<div></div>"
                });
            }, "PiJS - No 'name' given in view registration!");
        });

        it("should fail without 'tagName'", () => {
            assert.throws(() => {
                PiJS.register({
                    name: "FooView",
                    template: "<div></div>"
                });
            }, "PiJS - No 'tagName' given in view registration!");
        });

        it("should fail without 'template'", () => {
            assert.throws(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo"
                });
            }, "PiJS - No 'template' given in view registration!");
        });

        it("should succeed with valid parameters", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.isDefined(PiJS.classes.FooView);
        });

        it("should set correct name", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.equal(PiJS.classes.FooView.name, "FooView");
        });

        it("should set correct tagName", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.equal(PiJS.classes.FooView.tagName, "foo");
        });

        it("should convert template string to HTMLElement", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.instanceOf(PiJS.classes.FooView.template, HTMLElement);
        });

        it("should wrap view's template element in view tag", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.equal(PiJS.classes.FooView.template.tagName, "FOO");
        });

        it("should set template's innerHTML to given template string", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.equal(PiJS.classes.FooView.template.innerHTML, "<div></div>");
        });

        it("should succeed with empty template", () => {
            assert.doesNotThrow(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo",
                    template: ""
                });
            });
        });

        it("should throw on duplicated view name", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo-1",
                template: "<div></div>"
            });

            assert.throws(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo-2",
                    template: "<span></span>"
                });
            }, "PiJS - 'FooView' has already been registered!");
        });
    });

    describe("Unregistration", () => {
        it("should remove view registration", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            assert.isDefined(PiJS.classes.FooView);

            PiJS.unregister("FooView");

            assert.isUndefined(PiJS.classes.FooView);
        });

        it("should allow to register same view again", () => {
            PiJS.register({
                name: "FooView",
                tagName: "foo",
                template: "<div></div>"
            });

            PiJS.unregister("FooView");

            assert.doesNotThrow(() => {
                PiJS.register({
                    name: "FooView",
                    tagName: "foo",
                    template: "<div></div>"
                });
            });
        });
    });
});
