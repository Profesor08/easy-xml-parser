import { xmlToJson, jsonToXml } from "../index";

test("XML to JSON test 1", () => {
  expect(
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
`),
  ).toStrictEqual({
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
});

test("XML to JSON test 2", () => {
  expect(
    xmlToJson(`
      <root>
        <param arg1="some value">Text content</param>
      </root>
    `),
  ).toStrictEqual({
    root: {
      param: "Text content",
    },
  });
});

test("XML to JSON test 3", () => {
  expect(
    xmlToJson(`
      <root>
        <param arg1="some value">Text content</param>
        <param arg1="some value">Text content</param>
        <param arg1="some value">Text content</param>
      </root>
    `),
  ).toStrictEqual({
    root: {
      param: ["Text content", "Text content", "Text content"],
    },
  });
});

test("XML to JSON test 4", () => {
  expect(
    xmlToJson(`
  <EarringAttribute testAttribute="123" testAttribute2="sdfasdf">
    <TestText>1g2f3dh34fgh123dh341f23gfh34d234</TestText>
    <TestText>1g2f3dh34fgh123dh341f23gfh34d234</TestText>
    <TestText>1g2f3dh34fgh123dh341f23gfh34d234</TestText>
    <!-- <TestText>1g2f3dh34fgh123dh341f23gfh34d234</TestText> -->

    <EditionSettings>
      <Edition ID="1" OptionRate1="20" OptionRate2="40" OptionRate3="40" OptionRate4="0" OptionRate5="0" />
      <Edition ID="2" OptionRate1="20" OptionRate2="40" OptionRate3="40" OptionRate4="0" OptionRate5="0" />
    </EditionSettings>

    <OptionLinkSettings>
    <!-- Left -->
      <Option LinkID="1" Index1="19" ValueIdx1="1" Rate1="2000" Index2="23" ValueIdx2="4" Rate2="2000" Index3="18" ValueIdx3="6" Rate3="2000" Index4="16" ValueIdx4="6" Rate4="2000" Index5="11" ValueIdx5="0" Rate5="2000" Edition="1" ItemCat="12" ItemIndex="449" Name="Rage" />
      <Option LinkID="2" Index1="19" ValueIdx1="1" Rate1="2000" Index2="28" ValueIdx2="4" Rate2="2000" Index3="29" ValueIdx3="6" Rate3="2000" Index4="30" ValueIdx4="6" Rate4="2000" Index5="11" ValueIdx5="0" Rate5="2000" Edition="2" ItemCat="12" ItemIndex="450" Name="Ancestor" />
      <!-- <Option LinkID="3" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="451" Name="Flurry" /> -->
      <!-- <Option LinkID="4" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="452" Name="Honor" /> -->
      <!-- <Option LinkID="5" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="453" Name="Ultimate" /> -->
      <!-- <Option LinkID="6" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="454" Name="Conquest" /> -->
      <!-- <Option LinkID="7" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="455" Name="Fracture" /> -->
      <!-- <Option LinkID="8" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="456" Name="Commitment" /> -->
    <!-- Right -->
      <Option LinkID="9" Index1="9" ValueIdx1="5" Rate1="2000" Index2="17" ValueIdx2="2" Rate2="2000" Index3="15" ValueIdx3="2" Rate3="2000" Index4="14" ValueIdx4="3" Rate4="2000" Index5="12" ValueIdx5="0" Rate5="2000" Edition="1" ItemCat="12" ItemIndex="457" Name="Rage II" />
      <Option LinkID="10" Index1="9" ValueIdx1="5" Rate1="2000" Index2="17" ValueIdx2="2" Rate2="2000" Index3="15" ValueIdx3="2" Rate3="2000" Index4="14" ValueIdx4="3" Rate4="2000" Index5="12" ValueIdx5="0" Rate5="2000" Edition="2" ItemCat="12" ItemIndex="458" Name="Ancestor II" />
      <!-- <Option LinkID="11" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="459" Name="Flurry II" /> -->
      <!-- <Option LinkID="12" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="460" Name="Honor II" /> -->
      <!-- <Option LinkID="13" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="461" Name="Ultimate II" /> -->
      <!-- <Option LinkID="14" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="462" Name="Conquest II" /> -->
      <!-- <Option LinkID="15" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="463" Name="Destruction II" /> -->
      <!-- <Option LinkID="16" Index1="0" ValueIdx1="0" Rate1="0" Index2="0" ValueIdx2="0" Rate2="0" Index3="0" ValueIdx3="0" Rate3="0" Index4="0" ValueIdx4="0" Rate4="0" Index5="0" ValueIdx5="0" Rate5="0" Edition="0" ItemCat="0" ItemIndex="464" Name="Commitment II" /> -->
    </OptionLinkSettings>

    <LinkedOptionActivation> <!-- Linked option is being activated when left and right earning (link indexes) are worn together -->
      <Link ID1="1" ID2="9" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Rage" />
      <Link ID1="2" ID2="10" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Ancestor" />
      <!-- <Link ID1="3" ID2="11" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Flurry" /> -->
      <!-- <Link ID1="4" ID2="12" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Honor" /> -->
      <!-- <Link ID1="5" ID2="13" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Ultimate" /> -->
      <!-- <Link ID1="6" ID2="14" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Conquest" /> -->
      <!-- <Link ID1="7" ID2="15" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Destruction" /> -->
      <!-- <Link ID1="8" ID2="16" OptIdx1="21" OptValIdx1="7" OptIdx2="24" OptValIdx2="2" Name="Commitment" /> -->
    </LinkedOptionActivation>

    <OptionSettings>
    <!-- Edition 1 -->
      <OptionSet Index="0" Value="200" Edition="1" Description="Max Life Increase and Max Mana Increase" />
      <OptionSet Index="1" Value="17" Edition="1" Description="Skill Damage Increase" />
      <OptionSet Index="2" Value="4" Edition="1" Description="Excellent Damage Probability Increase and Critical Damage Probability Increase" />
      <OptionSet Index="3" Value="10" Edition="1" Description="AG Auto Recovery Amount Increase" />
      <OptionSet Index="4" Value="20" Edition="1" Description="Attack Power / Wizardry Increase" />
      <OptionSet Index="5" Value="7" Edition="1" Description="Attack Speed Increase" />
      <OptionSet Index="6" Value="35" Edition="1" Description="Attack Power Increase and Critical Damage Power Increase" />
      <OptionSet Index="7" Value="1" Edition="1" Description="Ignore enemy defense" />
    <!-- Edition 2 -->
      <OptionSet Index="0" Value="400" Edition="2" Description="Max Life Increase and Max Mana Increase" />
      <OptionSet Index="1" Value="19" Edition="2" Description="Skill Damage Increase" />
      <OptionSet Index="2" Value="5" Edition="2" Description="Excellent Damage Probability Increase and Critical Damage Probability Increase" />
      <OptionSet Index="3" Value="10" Edition="2" Description="AG Auto Recovery Amount Increase" />
      <OptionSet Index="4" Value="0" Edition="2" Description="Attack Power / Wizardry Increase" />
      <OptionSet Index="5" Value="7" Edition="2" Description="Attack Speed Increase" />
      <OptionSet Index="6" Value="1" Edition="2" Description="Attack Power Increase and Critical Damage Power Increase" />
      <OptionSet Index="7" Value="2" Edition="2" Description="Ignore enemy defense" />
    </OptionSettings>

    <OptionsList> <!-- Section used by tools only -->
      <Option Index="0" Name="Strength Increase" Operator="1" />
      <Option Index="1" Name="Agility Increase" Operator="1" />
      <Option Index="2" Name="Energy Increase" Operator="1" />
      <Option Index="3" Name="Vitality Increase" Operator="1" />
      <Option Index="4" Name="Command Increase" Operator="1" />
      <Option Index="5" Name="Min Damage Power Increase" Operator="1" />
      <Option Index="6" Name="Max Damage Power Increase" Operator="1" />
      <Option Index="7" Name="Wizardry Increase" Operator="2" />
      <Option Index="8" Name="Damage Increase" Operator="2" />
      <Option Index="9" Name="Attack Speed Increase" Operator="1" />
      <Option Index="10" Name="Defense Increase" Operator="1" />
      <Option Index="11" Name="Maximum Life Increase" Operator="1" />
      <Option Index="12" Name="Maximum Mana Increase" Operator="1" />
      <Option Index="13" Name="AG Automatic Recover Increase" Operator="1" />
      <Option Index="14" Name="AG Automatic Recovery Increase" Operator="1" />
      <Option Index="15" Name="Critical Damage Probability Increase" Operator="2" />
      <Option Index="16" Name="Critical Damage Power Increase" Operator="1" />
      <Option Index="17" Name="Excellent Damage Probability Increase" Operator="2" />
      <Option Index="18" Name="Excellent Damage Power Increase" Operator="1" />
      <Option Index="19" Name="Skill Damage Increases" Operator="1" />
      <Option Index="20" Name="Double Damage probability Increase" Operator="2" />
      <Option Index="21" Name="Ignore Enemy Defense" Operator="2" />
      <Option Index="22" Name="Defense Increased when equipping Shield" Operator="2" />
      <Option Index="23" Name="ATK / HP" Operator="1" />
      <!-- <Option Index="24" Name="Healing Power Increase" Operator="0" /> -->
      <!-- <Option Index="25" Name="Increased interpersonal defense rate of allies near 6" Operator="0" /> -->
      <!-- <Option Index="26" Name="Min Damage Power Increase" Operator="0" /> -->
      <!-- <Option Index="27" Name="Triple Damage Chance Increase" Operator="0" /> -->
      <Option Index="24" Name="All Stats Increase" Operator="1" />
      <!-- <Option Index="25" Name="Base Defense Increase" Operator="1" /> -->
      <Option Index="26" Name="Damage Increase" Operator="1" />
      <Option Index="27" Name="Wizardry Power Increase" Operator="1" />
      <Option Index="28" Name="Mastery attack power and wizardry increase" Operator="1" />
      <Option Index="29" Name="Mastery Excellent Damage Increase" Operator="1" />
      <Option Index="30" Name="Mastery Critical Damage Increase" Operator="1" />
    </OptionsList>
  </EarringAttribute>
  `),
  ).toStrictEqual({
    EarringAttribute: {
      testAttribute: 123,
      testAttribute2: "sdfasdf",
      TestText: [
        "1g2f3dh34fgh123dh341f23gfh34d234",
        "1g2f3dh34fgh123dh341f23gfh34d234",
        "1g2f3dh34fgh123dh341f23gfh34d234",
      ],
      EditionSettings: {
        Edition: [
          { ID: 1, OptionRate1: 20, OptionRate2: 40, OptionRate3: 40, OptionRate4: 0, OptionRate5: 0 },
          { ID: 2, OptionRate1: 20, OptionRate2: 40, OptionRate3: 40, OptionRate4: 0, OptionRate5: 0 },
        ],
      },
      OptionLinkSettings: {
        Option: [
          {
            LinkID: 1,
            Index1: 19,
            ValueIdx1: 1,
            Rate1: 2000,
            Index2: 23,
            ValueIdx2: 4,
            Rate2: 2000,
            Index3: 18,
            ValueIdx3: 6,
            Rate3: 2000,
            Index4: 16,
            ValueIdx4: 6,
            Rate4: 2000,
            Index5: 11,
            ValueIdx5: 0,
            Rate5: 2000,
            Edition: 1,
            ItemCat: 12,
            ItemIndex: 449,
            Name: "Rage",
          },
          {
            LinkID: 2,
            Index1: 19,
            ValueIdx1: 1,
            Rate1: 2000,
            Index2: 28,
            ValueIdx2: 4,
            Rate2: 2000,
            Index3: 29,
            ValueIdx3: 6,
            Rate3: 2000,
            Index4: 30,
            ValueIdx4: 6,
            Rate4: 2000,
            Index5: 11,
            ValueIdx5: 0,
            Rate5: 2000,
            Edition: 2,
            ItemCat: 12,
            ItemIndex: 450,
            Name: "Ancestor",
          },
          {
            LinkID: 9,
            Index1: 9,
            ValueIdx1: 5,
            Rate1: 2000,
            Index2: 17,
            ValueIdx2: 2,
            Rate2: 2000,
            Index3: 15,
            ValueIdx3: 2,
            Rate3: 2000,
            Index4: 14,
            ValueIdx4: 3,
            Rate4: 2000,
            Index5: 12,
            ValueIdx5: 0,
            Rate5: 2000,
            Edition: 1,
            ItemCat: 12,
            ItemIndex: 457,
            Name: "Rage II",
          },
          {
            LinkID: 10,
            Index1: 9,
            ValueIdx1: 5,
            Rate1: 2000,
            Index2: 17,
            ValueIdx2: 2,
            Rate2: 2000,
            Index3: 15,
            ValueIdx3: 2,
            Rate3: 2000,
            Index4: 14,
            ValueIdx4: 3,
            Rate4: 2000,
            Index5: 12,
            ValueIdx5: 0,
            Rate5: 2000,
            Edition: 2,
            ItemCat: 12,
            ItemIndex: 458,
            Name: "Ancestor II",
          },
        ],
      },
      LinkedOptionActivation: {
        Link: [
          { ID1: 1, ID2: 9, OptIdx1: 21, OptValIdx1: 7, OptIdx2: 24, OptValIdx2: 2, Name: "Rage" },
          { ID1: 2, ID2: 10, OptIdx1: 21, OptValIdx1: 7, OptIdx2: 24, OptValIdx2: 2, Name: "Ancestor" },
        ],
      },
      OptionSettings: {
        OptionSet: [
          { Index: 0, Value: 200, Edition: 1, Description: "Max Life Increase and Max Mana Increase" },
          { Index: 1, Value: 17, Edition: 1, Description: "Skill Damage Increase" },
          {
            Index: 2,
            Value: 4,
            Edition: 1,
            Description: "Excellent Damage Probability Increase and Critical Damage Probability Increase",
          },
          { Index: 3, Value: 10, Edition: 1, Description: "AG Auto Recovery Amount Increase" },
          { Index: 4, Value: 20, Edition: 1, Description: "Attack Power / Wizardry Increase" },
          { Index: 5, Value: 7, Edition: 1, Description: "Attack Speed Increase" },
          { Index: 6, Value: 35, Edition: 1, Description: "Attack Power Increase and Critical Damage Power Increase" },
          { Index: 7, Value: 1, Edition: 1, Description: "Ignore enemy defense" },
          { Index: 0, Value: 400, Edition: 2, Description: "Max Life Increase and Max Mana Increase" },
          { Index: 1, Value: 19, Edition: 2, Description: "Skill Damage Increase" },
          {
            Index: 2,
            Value: 5,
            Edition: 2,
            Description: "Excellent Damage Probability Increase and Critical Damage Probability Increase",
          },
          { Index: 3, Value: 10, Edition: 2, Description: "AG Auto Recovery Amount Increase" },
          { Index: 4, Value: 0, Edition: 2, Description: "Attack Power / Wizardry Increase" },
          { Index: 5, Value: 7, Edition: 2, Description: "Attack Speed Increase" },
          { Index: 6, Value: 1, Edition: 2, Description: "Attack Power Increase and Critical Damage Power Increase" },
          { Index: 7, Value: 2, Edition: 2, Description: "Ignore enemy defense" },
        ],
      },
      OptionsList: {
        Option: [
          { Index: 0, Name: "Strength Increase", Operator: 1 },
          { Index: 1, Name: "Agility Increase", Operator: 1 },
          { Index: 2, Name: "Energy Increase", Operator: 1 },
          { Index: 3, Name: "Vitality Increase", Operator: 1 },
          { Index: 4, Name: "Command Increase", Operator: 1 },
          { Index: 5, Name: "Min Damage Power Increase", Operator: 1 },
          { Index: 6, Name: "Max Damage Power Increase", Operator: 1 },
          { Index: 7, Name: "Wizardry Increase", Operator: 2 },
          { Index: 8, Name: "Damage Increase", Operator: 2 },
          { Index: 9, Name: "Attack Speed Increase", Operator: 1 },
          { Index: 10, Name: "Defense Increase", Operator: 1 },
          { Index: 11, Name: "Maximum Life Increase", Operator: 1 },
          { Index: 12, Name: "Maximum Mana Increase", Operator: 1 },
          { Index: 13, Name: "AG Automatic Recover Increase", Operator: 1 },
          { Index: 14, Name: "AG Automatic Recovery Increase", Operator: 1 },
          { Index: 15, Name: "Critical Damage Probability Increase", Operator: 2 },
          { Index: 16, Name: "Critical Damage Power Increase", Operator: 1 },
          { Index: 17, Name: "Excellent Damage Probability Increase", Operator: 2 },
          { Index: 18, Name: "Excellent Damage Power Increase", Operator: 1 },
          { Index: 19, Name: "Skill Damage Increases", Operator: 1 },
          { Index: 20, Name: "Double Damage probability Increase", Operator: 2 },
          { Index: 21, Name: "Ignore Enemy Defense", Operator: 2 },
          { Index: 22, Name: "Defense Increased when equipping Shield", Operator: 2 },
          { Index: 23, Name: "ATK / HP", Operator: 1 },
          { Index: 24, Name: "All Stats Increase", Operator: 1 },
          { Index: 26, Name: "Damage Increase", Operator: 1 },
          { Index: 27, Name: "Wizardry Power Increase", Operator: 1 },
          { Index: 28, Name: "Mastery attack power and wizardry increase", Operator: 1 },
          { Index: 29, Name: "Mastery Excellent Damage Increase", Operator: 1 },
          { Index: 30, Name: "Mastery Critical Damage Increase", Operator: 1 },
        ],
      },
    },
  });
});

test("JSON to XML test 1", () => {
  expect(
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
    }),
  ).toBe(
    `<root param2="Text sample" param3="Text sample"><param arg1="some value"/><param arg1="some value"/><param arg1="some value"/><param4 arg="12" prop="123"><inner arg="123"/><inner2 arg="123"/><inner2 arg="123"/><inner2 arg="123"/></param4></root>`,
  );
});

test("JSON to XML test 2", () => {
  expect(
    jsonToXml({
      root: {
        a: 123123,
        b: `1231'23`,
        c: null,
        d: undefined,
        e: () => 123,
        arr: [
          {
            a: 123,
          },
          {
            a: 234,
          },
        ],
      },
    }),
  ).toBe(`<root a="123123" b="1231&#039;23" c="null" d="undefined"><arr a="123"/><arr a="234"/></root>`);
});

test("JSON to XML test 3 (for fun)", () => {
  expect(jsonToXml("bad json")).toBe(`<0>b</0><1>a</1><2>d</2><3> </3><4>j</4><5>s</5><6>o</6><7>n</7>`);
});

test("JSON to XML test 4 (for fun)", () => {
  expect(jsonToXml([1, 2, 3])).toBe(`<0>1</0><1>2</1><2>3</2>`);
});

test("JSON to XML test 5", () => {
  expect(
    jsonToXml([
      1,
      2,
      [
        3,
        {
          a: 123,
        },
      ],
    ]),
  ).toBe(`<0>1</0><1>2</1><2>3</2><2 a="123"/>`);
});

test("xmlToJson - Throws error on wrong XML", () => {
  expect(() => {
    xmlToJson("bad xml");
  }).toThrow();
});

test("jsonToXml - Throws error on null", () => {
  expect(() => {
    jsonToXml(null);
  }).toThrow();
});

test("jsonToXml - Throws error on undefined", () => {
  expect(() => {
    jsonToXml(undefined);
  }).toThrow();
});
