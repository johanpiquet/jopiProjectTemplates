// We import our shared component.
// If you have an error, then start your app in dev mode.
// This will update the internal generated code (_jopiLinkerGen dir)
//
import MySharedComponent from "@/uiComponents/mySharedComponent";

export default function () {
    // You don't need to make the image public (though folder /public).
    // Jopi will automatically map a special url to the image and serve it.
    return <MySharedComponent title="Hello!" />
}

// URL: http://localhost:3000/aboutReact/aboutUiComponents