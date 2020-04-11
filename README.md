# Easy XML Parser

XML <-> JSON parser, for easy convert data avoiding unnecesary properties.

## Examples

```JavaScript

xmlToJson(`
  <root>
    <param arg1="some value"/>
    <param arg1="some value"/>
    <param arg1="some value"/>
    <param2>Text sample</param2>
    <param3 arg="123">Text sample</param3>
    <param4 arg="12" prop="123">
      <inner arg="123"/>
      <inner2 arg="123"/>
      <inner2 arg="123"/>
      <inner2 arg="123"/>
    </param4>
  </root>
`);

// will generate
{
  "root": {
    "param": [
      {
        "arg1": "some value"
      },
      {
        "arg1": "some value"
      },
      {
        "arg1": "some value"
      }
    ],
    "param2": "Text sample",
    "param3": "Text sample",
    "param4": {
      "arg": 12,
      "prop": 123,
      "inner": {
        "arg": 123
      },
      "inner2": [
        {
          "arg": 123
        },
        {
          "arg": 123
        },
        {
          "arg": 123
        }
      ]
    }
  }
}

jsonToXml({
  root: {
    param: [
      {
        arg1: "some value",
      },
      {
        arg1: "some value",
      },
      {
        arg1: "some value",
      },
    ],
    param2: "Text sample",
    param3: "Text sample",
    param4: {
      arg: 12,
      prop: 123,
      inner: {
        arg: 123,
      },
      inner2: [
        {
          arg: 123,
        },
        {
          arg: 123,
        },
        {
          arg: 123,
        },
      ],
    },
  },
});

// will generate
<root param2="Text sample" param3="Text sample">
  <param arg1="some value"/>
  <param arg1="some value"/>
  <param arg1="some value"/>
  <param4 arg="12" prop="123">
    <inner arg="123"/>
    <inner2 arg="123"/>
    <inner2 arg="123"/>
    <inner2 arg="123"/>
  </param4>
</root>
```

## Important Bahavior

```JavaScript
// Text content of XML tag will replace all attributes with

xmlToJson(`
  <root>
    <param arg1="some value">Text content</param>
  </root>
`)

// will generate
{
  root: {
    param: "Text content"
  }
}

// next example
xmlToJson(`
  <root>
    <param arg1="some value">Text content</param>
    <param arg1="some value">Text content</param>
    <param arg1="some value">Text content</param>
  </root>
`)

// will generate
{
  "root": {
    "param": [
      "Text content",
      "Text content",
      "Text content"
    ]
  }
}

// Single XMP tag will become as attribute and will replace exisiting one with the same name

```
