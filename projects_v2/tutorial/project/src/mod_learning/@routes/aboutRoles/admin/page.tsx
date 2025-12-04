import {RequireRoles} from "jopijs/uikit";
import AdminPageLayout from "@/uiComponents/page.layout.admin";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["admin"]}>
            <div>Admin Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}