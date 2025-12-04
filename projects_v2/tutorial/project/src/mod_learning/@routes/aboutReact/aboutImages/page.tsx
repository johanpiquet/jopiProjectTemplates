// Our image. Once imported, the value of "logo" is:
// - the url of the image
// - or the base64 encoded image if the image is small enough
//
import logo from "./jopiLogo.png";

export default function () {
    // You don't need to make the image public (though folder /public).
    // Jopi will automatically map a special url to the image and serve it.
    return <><img alt="" src={logo} /></>
}

// URL: http://localhost:3000/aboutReact/aboutImages