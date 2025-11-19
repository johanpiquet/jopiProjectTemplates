import * as jk_schema from "jopi-toolkit/jk_schema";

export const Schema = jk_schema.schema({
    name: jk_schema.string("name", false),
});

jk_schema.registerSchema(
    "d99e8745-9ae0-4de3-a23b-657203caa3fc", Schema,
    {
        title: "Person",
        description: "A person"
    });

export type Type = jk_schema.SchemaToType<typeof Schema>;