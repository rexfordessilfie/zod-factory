// Sample Custom Schema format

export const name = {
  $kind: "string",
  $messages: {
    $required: "Name is required",
    $invalid: "Name is invalid",
  },
  $extensions: [
    { $kind: "min", $value: 10 },
    { $kind: "max", $value: 20 },
  ],
};

export const age = {
  $kind: "number",
};

export const email = {
  $kind: "string",
  $extensions: [{ $kind: "email" }],
};

export const person = {
  $refs: ["name", "age", "email"],
  $kind: "object",
  $fields: {
    name: "$ref:name",
    age: "$ref:age",
    emails: {
      $kind: "array",
      $element: "$ref:email",
    },
  },
};
