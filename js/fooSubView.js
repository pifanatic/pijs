import PiJS from "./pi.js";
import tpl  from "./fooSubView.tpl.js";

PiJS.register({
    name: "FooSubView",
    tagName: "foo-sub",
    template: tpl
});
