import cssMod from "./style.module.css";
import {useCssModule} from "jopijs/ui";

export default function({title}: {title: string}) {
    useCssModule(cssMod);
    return <div className={cssMod.button}>{title}</div>
}