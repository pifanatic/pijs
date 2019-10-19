import PiJS from "./pi.js";
import tpl  from "./fooView.tpl.js";

PiJS.register({
    name: "FooView",
    tagName: "foo",
    template: tpl
});
