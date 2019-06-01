import PiJS from "./pi.js";
import tpl  from "./fooView.tpl.js";

PiJS.register({
    name: "FooView",
    tag: "foo",
    template: tpl
});
