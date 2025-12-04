import {RequireRoles} from "jopijs/uikit";
import AdminPageLayout from "@/uiComponents/page.layout.admin";

export default function () {
    // RequireRoles allows protection a UI content and displays
    // this content only if the user has the required roles.
    return <AdminPageLayout>
        <div>This part is visible for everyone</div>
        <RequireRoles roles={["writer"]}>
            <div>This part is only visible for users with "writer" role</div>
        </RequireRoles>
        <RequireRoles roles={["admin", "writer"]}>
            <div>This part is only visible for users with "admin" + "writer" roles</div>
        </RequireRoles>
    </AdminPageLayout>
}