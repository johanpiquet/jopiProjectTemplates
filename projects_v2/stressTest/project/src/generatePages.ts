import * as jk_fs from "jopi-toolkit/jk_fs";

const template = `export default function() {
    return <div>Stress Test COUNT</div>
};`

async function start() {
    for (let i=1;i<1000;i++) {
        let filePath = jk_fs.resolve("src/mod_stressTest/@routes/t" + i + "/page.tsx");
        await jk_fs.writeTextToFile(filePath, template.replace("COUNT", i.toString()));
    }
}

await start();