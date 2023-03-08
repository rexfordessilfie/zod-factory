ts-node "./codegen/codegen-custom.ts" -d "sources" "custom-schema:.*"
ts-node "./codegen/codegen.ts" -d "sources" "with-zf:.*" "with-zfl:.*" "with-zfs:.*"
ts-node "./codegen/codegen-openapi.ts" -d "sources" "openapi-schema:.*" 