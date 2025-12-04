import style from "./style.module.css";
import {useCssModule} from "jopijs/ui";
import {useState} from "react";
import myEvent from "@/events/card.product.added";

function sendEvent() {
    myEvent.send({productId: 123456789});
}

export default function() {
    useCssModule(style);
    const [refreshCount, setRefreshCount] = useState(0);

    myEvent.reactListener(() => {
        setRefreshCount(c => c + 1);
    });

    return <>
        <div onClick={sendEvent} className={style.button}>Click to add to card</div>
        <div>refreshCount value is {refreshCount}</div>
    </>
}

// Url: http://localhost:3000/aboutEvents