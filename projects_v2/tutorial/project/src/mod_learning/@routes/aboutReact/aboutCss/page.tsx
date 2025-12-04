import {useCssModule} from "jopijs/ui";

// Imported styles don't influence the others pages.
import "./style.css";

// CSS Modules are inlined into the page HTML.
// The principe of the CSS module is to rename the class names to avoid conflicts.
import buttonCss from "./button.module.css";

// Here you see something like:
// {button: "fhgd_button", blue: "fhgd_blue", red: "fhgd_red"}
//console.log("buttonCss content", buttonCss);

export default function () {
    // useCssModule is required to use CSS Modules.
    // It will inject the CSS into the page HTML.
    useCssModule(buttonCss);

    return <>
        <div className={buttonCss.button + " " + buttonCss.blue}>Blue button</div>
        <div className={buttonCss.button + " " + buttonCss.red}>Red button</div>
    </>;
}

// URL: http://localhost:3000/aboutReact/aboutCss