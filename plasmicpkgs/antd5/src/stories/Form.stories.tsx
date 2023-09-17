import { StoryFn } from "@storybook/react";
import React from "react";
import {
  FormWrapper as Form,
  FormWrapperProps,
  FormGroup,
  FormItemWrapper as FormItem,
  InputType,
  SimplifiedFormItemsProp,
} from "../registerForm";
import { Button, Checkbox, Input, InputNumber } from "antd";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { Select } from "antd/lib";
import { useDollarState } from "@plasmicapp/react-web";
import {
  userEvent,
  within,
  queryByAttribute,
  screen,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { PlasmicCanvasContext } from "@plasmicapp/host";
import { fakeInitDatabase, fakeSchema } from "./fake-data-source";

export default {
  title: "Form",
};

const deepClone = function <T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ExtendedSimplifiedFormItemsProp extends SimplifiedFormItemsProp {
  selectedLabel?: string;
}

const ALL_FORM_ITEMS_TYPE: ExtendedSimplifiedFormItemsProp[] = [
  {
    name: "textField",
    label: "Text Field",
    inputType: InputType.Text,
    initialValue: "text",
    preserve: false,
  },
  {
    name: "textAreaField",
    label: "Text Area Field",
    inputType: InputType.TextArea,
    initialValue: "textarea",
    preserve: false,
  },
  {
    name: "numberField",
    label: "Number Field",
    inputType: InputType.Number,
    initialValue: "123",
    preserve: false,
  },
  {
    name: "passwordField",
    label: "Password Field",
    inputType: InputType.Password,
    initialValue: "password",
    preserve: false,
  },
  {
    name: "selectField",
    label: "Select Field",
    inputType: InputType.Select,
    options: [
      {
        label: "Opt 1",
        value: "opt1",
      },
      {
        label: "Opt 2",
        value: "opt2",
      },
    ],
    initialValue: "opt1",
    preserve: false,
  },
  {
    name: "checkboxField",
    label: "Checkbox Field",
    inputType: InputType.Checkbox,
    initialValue: true,
    preserve: false,
  },
  {
    name: "radioGroupField",
    inputType: InputType.RadioGroup,
    options: [
      {
        label: "radio 1",
        value: "radio1",
      },
      {
        label: "radio 2",
        value: "radio2",
      },
    ],
    initialValue: "radio1",
    preserve: false,
  },
];

const SubmitSlot = ({ label }: { label?: string }) => (
  <Button type="primary" htmlType="submit">
    {label ?? "Submit"}
  </Button>
);

const _SimplifiedForm: StoryFn = (args: any) => {
  const $state = useDollarState(
    [
      {
        path: "form.value",
        type: "private",
        variableType: "object",
      },
    ],
    { $props: args }
  );
  return (
    <div>
      <Form
        extendedOnValuesChange={(values) => ($state.form.value = values)}
        formItems={args.formItems}
        mode="simplified"
        submitSlot={<SubmitSlot />}
      />
      <p>{JSON.stringify($state.form.value)}</p>
    </div>
  );
};

export const SimplifiedForm = _SimplifiedForm.bind({});
SimplifiedForm.args = {
  formItems: ALL_FORM_ITEMS_TYPE,
};

const _AdvancedForm: StoryFn = (args: any) => {
  const $state = useDollarState(
    [
      {
        path: "form.value",
        type: "private",
        variableType: "object",
      },
    ],
    { $props: args }
  );
  return (
    <div>
      <Form extendedOnValuesChange={(values) => ($state.form.value = values)}>
        <FormItem label={<p>Text Field</p>} name="textField">
          <Input />
        </FormItem>
        <FormItem label={<p>Text Area</p>} name="textAreaField">
          <TextArea />
        </FormItem>
        <FormItem label={<p>Number</p>} name="numberField">
          <InputNumber />
        </FormItem>
        <FormItem label={<p>Password</p>} name="passwordField">
          <Input.Password />
        </FormItem>
        <FormItem
          label={<p>Select</p>}
          name="selectField"
          initialValue={"opt1"}
        >
          <Select
            options={[
              { label: "Opt1", value: "opt1" },
              { label: "Opt2", value: "opt2" },
            ]}
          />
        </FormItem>
        <FormItem
          label={"Checkbox"}
          name="checkboxField"
          valuePropName="checked"
        >
          <Checkbox />
        </FormItem>
        <Button type="primary">Submit</Button>
      </Form>
      <p>{JSON.stringify($state.form.value)}</p>
    </div>
  );
};

export const AdvancedForm = _AdvancedForm.bind({});
AdvancedForm.args = {};

const _TestSimplifiedForm: StoryFn = (args: any) => {
  const ref = React.createRef<TextAreaRef>();
  const $state = useDollarState(
    [
      {
        path: "form.value",
        type: "private",
        variableType: "object",
      },
      {
        path: "submittedValue",
        type: "private",
        variableType: "object",
      },
      {
        path: "formItems",
        type: "private",
        variableType: "text",
        initFunc: ({ $props }) => JSON.stringify($props.formItems),
      },
    ],
    { $props: args }
  );
  return (
    <div>
      <FormItem label="Form items">
        <Input.TextArea
          defaultValue={$state.formItems}
          ref={ref}
          rows={5}
          data-testid="formItems"
        />
      </FormItem>
      <Button
        onClick={() =>
          ($state.formItems = ref.current?.resizableTextArea?.textArea.value)
        }
      >
        Update form
      </Button>
      <h1>Form</h1>
      <Form
        mode="simplified"
        formItems={JSON.parse($state.formItems)}
        submitSlot={<SubmitSlot />}
        extendedOnValuesChange={(values) => ($state.form.value = values)}
        onFinish={(values) => ($state.submittedValue = values)}
      />
      <p data-testid={"value"}>Value: {JSON.stringify($state.form.value)}</p>
      <p data-testid={"submitted"}>
        Submitted: {JSON.stringify($state.submittedValue)}
      </p>
    </div>
  );
};

export const TestSimplifiedForm = _TestSimplifiedForm.bind({});
TestSimplifiedForm.args = {
  formItems: ALL_FORM_ITEMS_TYPE,
};

const checkFormItems = async (
  canvasElement: HTMLElement,
  expectedFormItems: ExtendedSimplifiedFormItemsProp[]
) => {
  for (const formItem of expectedFormItems) {
    const dom = queryByAttribute(
      "id",
      canvasElement,
      formItem.name ?? ""
    ) as HTMLSelectElement;
    await expect(dom).toBeInTheDocument();
    if (!formItem.initialValue) {
      continue;
    }
    if (formItem.inputType === InputType.Select) {
      await userEvent.click(dom);
      await userEvent.click(dom);
      const optionDom = document.querySelector('[aria-selected="true"]');
      await expect(optionDom).toBeInTheDocument();
      await expect(optionDom).toHaveTextContent(formItem.initialValue);
    } else if (formItem.inputType === InputType.Checkbox) {
      if (formItem.initialValue) {
        await expect(dom).toBeChecked();
      } else {
        await expect(dom).not.toBeChecked();
      }
    } else if (formItem.inputType === InputType.RadioGroup) {
      if (formItem.initialValue) {
        const optionDom = queryByAttribute("value", dom, formItem.initialValue);
        await expect(optionDom).toBeChecked();
      }
    } else {
      await expect(dom).toHaveValue(`${formItem.initialValue}`);
    }
  }
};

const modifyFormItems = async (
  canvasElement: HTMLElement,
  expectedFormItems: Partial<ExtendedSimplifiedFormItemsProp>[]
) => {
  for (const formItem of expectedFormItems) {
    const dom = queryByAttribute(
      "id",
      canvasElement,
      formItem.name ?? ""
    ) as HTMLSelectElement;
    await expect(dom).toBeInTheDocument();
    if (formItem.inputType === InputType.Select) {
      await userEvent.click(dom);
      await sleep(100);
      const optionDom = document.querySelector(
        `[title="${formItem.selectedLabel}"]`
      );
      if (optionDom) {
        await userEvent.click(optionDom);
      }
    } else if (formItem.inputType === InputType.Checkbox) {
      await userEvent.click(dom);
    } else if (formItem.inputType === InputType.RadioGroup) {
      const optionDom = queryByAttribute("value", dom, formItem.initialValue);
      await expect(optionDom).toBeInTheDocument();
      if (optionDom) {
        await userEvent.click(optionDom);
      }
    } else {
      await userEvent.type(dom, `{selectall}{del}${formItem.initialValue}`);
    }
  }
};

const getFormItemsValue = (
  expectedFormItems: ExtendedSimplifiedFormItemsProp[]
) => {
  return Object.fromEntries(
    expectedFormItems
      .filter((formItem) => formItem.initialValue != null)
      .map((formItem) => [formItem.name, formItem.initialValue])
  );
};

TestSimplifiedForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  let expectedFormItems = deepClone(ALL_FORM_ITEMS_TYPE);

  await checkFormItems(canvasElement, expectedFormItems);

  expectedFormItems[0].initialValue = "foo";
  // test state is updating properly
  await modifyFormItems(canvasElement, expectedFormItems.slice(0, 1));
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    `Value: ${JSON.stringify(getFormItemsValue(expectedFormItems))}`
  );

  expectedFormItems[1].initialValue = "bar";
  expectedFormItems[2].initialValue = 456;
  await modifyFormItems(canvasElement, expectedFormItems.slice(1, 3));
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    `Value: ${JSON.stringify(getFormItemsValue(expectedFormItems))}`
  );

  await checkFormItems(canvasElement, expectedFormItems);

  await userEvent.click(canvas.getByText("Submit"));
  await sleep(100);
  await expect(canvas.getByTestId("submitted")).toHaveTextContent(
    `Submitted: ${JSON.stringify(getFormItemsValue(expectedFormItems))}`
  );

  // test can modify the form structure -- simulates changing props in studio
  expectedFormItems = [
    {
      name: "text2",
      label: "Text 2",
      inputType: InputType.Text,
      initialValue: "foo",
    },
    {
      name: "number2",
      label: "Number 2",
      inputType: InputType.Number,
      initialValue: "456",
    },
    {
      name: "select2",
      label: "Select 2",
      inputType: InputType.Select,
      options: [
        {
          label: "Opt 3",
          value: "opt3",
        },
        {
          label: "Opt 4",
          value: "opt4",
        },
      ],
      initialValue: "opt4",
    },
  ];

  await sleep(1000);
  await userEvent.type(canvas.getByTestId("formItems"), `{selectall}{del}`);
  await userEvent.paste(
    canvas.getByTestId("formItems"),
    JSON.stringify(expectedFormItems)
  );
  await userEvent.click(canvas.getByText("Update form"));
  await checkFormItems(canvasElement, expectedFormItems);

  expectedFormItems[2].initialValue = "opt3";
  expectedFormItems[2].selectedLabel = "Opt 3";
  await modifyFormItems(canvasElement, expectedFormItems.slice(2, 3));
  await sleep(100);
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    `Value: ${JSON.stringify(getFormItemsValue(expectedFormItems))}`
  );
  await checkFormItems(canvasElement, expectedFormItems);
  await userEvent.click(canvas.getByText("Submit"));
  await sleep(100);
  await expect(canvas.getByTestId("submitted")).toHaveTextContent(
    `Submitted: ${JSON.stringify(getFormItemsValue(expectedFormItems))}`
  );
};

const useForceRender = () => {
  const [_, setRenderCnt] = React.useState(0);
  return () => setRenderCnt((c) => c + 1);
};

const _InternalFormCtx: StoryFn = (args: any) => {
  const forceRender = useForceRender();
  const ctxDataRef = React.useRef<any>(() => undefined);
  const setControlContextData = React.useCallback((data: any) => {
    if (JSON.stringify(ctxDataRef.current) !== JSON.stringify(data)) {
      ctxDataRef.current = data;
      forceRender();
    }
  }, []);
  const registeredFields = ctxDataRef.current.registeredFields;
  const $state = useDollarState(
    [
      {
        path: "form.value",
        type: "private",
        variableType: "object",
      },
    ],
    { $props: args }
  );
  const [formItems, setFormItems] = React.useState(() => [
    {
      name: "textField",
    },
    {
      name: "textAreaField",
      hidden: true,
    },
    {
      name: "numberField",
    },
    {
      name: "address",
    },
    {
      name: "city",
    },
    {
      name: "state",
    },
  ]);
  const [selectedFormItem, setSelectedFormItem] = React.useState<string>("0");
  const [renameInput, setRenameInput] = React.useState("");
  const [fieldVisibility, setFieldVisibility] = React.useState<
    "visible" | "invisible"
  >("visible");
  return (
    <div>
      <PlasmicCanvasContext.Provider
        value={{
          // registered fields are enabled only in canvas
          componentName: "test",
          globalVariants: {},
        }}
      >
        <Form
          extendedOnValuesChange={(values) => ($state.form.value = values)}
          setControlContextData={setControlContextData}
        >
          {!formItems[0].hidden && (
            <FormItem label={"Text Field"} name={formItems[0].name}>
              <Input />
            </FormItem>
          )}
          {!formItems[1].hidden && (
            <FormItem label={"Text Area"} name={formItems[1].name}>
              <TextArea />
            </FormItem>
          )}
          {!formItems[2].hidden && (
            <FormItem label={"Number"} name={formItems[2].name}>
              <InputNumber />
            </FormItem>
          )}
          {!formItems[3].hidden && (
            <FormGroup name={formItems[3].name}>
              {!formItems[4].hidden && (
                <FormItem label="City" name={formItems[4].name}>
                  <Input />
                </FormItem>
              )}
              {!formItems[5].hidden && (
                <FormItem label="State" name={formItems[5].name}>
                  <Input />
                </FormItem>
              )}
            </FormGroup>
          )}
        </Form>
        <p data-testid={"registeredFields"}>
          {JSON.stringify(registeredFields)}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p>Modify fields</p>
          <select
            data-testid={"registeredFieldsSelect"}
            value={selectedFormItem}
            onChange={(e) => setSelectedFormItem(e.target.value)}
          >
            {formItems.map((formItem, index) => (
              <option value={index}>{formItem.name}</option>
            ))}
          </select>
          <div style={{ display: "flex" }}>
            <Input
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              style={{ width: 200 }}
              data-testid={"renameInput"}
            />
            <Button
              onClick={() => {
                setFormItems((formItems) => {
                  formItems[+selectedFormItem].name = renameInput;
                  return [...formItems];
                });
                setRenameInput("");
              }}
            >
              Rename field
            </Button>
          </div>
          <div>
            <select
              data-testid={"visibilitySelect"}
              value={fieldVisibility}
              onChange={(e) => setFieldVisibility(e.target.value as any)}
            >
              <option value="visible">Visible</option>
              <option value="invisible">Invisible</option>
            </select>
            <Button
              onClick={() => {
                setFormItems((formItems) => {
                  formItems[+selectedFormItem].hidden =
                    fieldVisibility === "invisible";
                  return [...formItems];
                });
                setRenameInput("");
              }}
            >
              Change visibility
            </Button>
          </div>
        </div>
      </PlasmicCanvasContext.Provider>
    </div>
  );
};

export const InternalFormCtx = _InternalFormCtx.bind({});
InternalFormCtx.args = {};
InternalFormCtx.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  let expectedRegisteredFields = [
    { fullPath: ["textField"], name: "textField" },
    { fullPath: ["numberField"], name: "numberField" },
    { fullPath: ["address", "city"], name: "city" },
    { fullPath: ["address", "state"], name: "state" },
  ];
  await sleep(100);
  await expect(canvas.getByTestId("registeredFields")).toHaveTextContent(
    JSON.stringify(expectedRegisteredFields)
  );
  // change fields visibility --> this should register/unregister fields
  expectedRegisteredFields.push({
    fullPath: ["textAreaField"],
    name: "textAreaField",
  });
  await userEvent.selectOptions(
    canvas.getByTestId("registeredFieldsSelect"),
    "1"
  );
  await userEvent.selectOptions(
    canvas.getByTestId("visibilitySelect"),
    "visible"
  );
  await userEvent.click(canvas.getByText("Change visibility"));
  await sleep(100);
  await expect(canvas.getByTestId("registeredFields")).toHaveTextContent(
    JSON.stringify(expectedRegisteredFields)
  );

  expectedRegisteredFields = expectedRegisteredFields.slice(1);
  await userEvent.selectOptions(
    canvas.getByTestId("registeredFieldsSelect"),
    "0"
  );
  await userEvent.selectOptions(
    canvas.getByTestId("visibilitySelect"),
    "invisible"
  );
  await userEvent.click(canvas.getByText("Change visibility"));
  await sleep(100);
  await expect(canvas.getByTestId("registeredFields")).toHaveTextContent(
    JSON.stringify(expectedRegisteredFields)
  );

  //rename fields name
  expectedRegisteredFields = [
    ...expectedRegisteredFields.slice(-1),
    ...expectedRegisteredFields.slice(0, -1),
  ];
  expectedRegisteredFields[1].fullPath[0] = "new field name";
  expectedRegisteredFields[1].name = "new field name";
  await userEvent.selectOptions(
    canvas.getByTestId("registeredFieldsSelect"),
    "2"
  );
  await userEvent.type(canvas.getByTestId("renameInput"), "new field name");
  await userEvent.click(canvas.getByText("Rename field"));
  await sleep(100);
  await expect(canvas.getByTestId("registeredFields")).toHaveTextContent(
    JSON.stringify(expectedRegisteredFields)
  );

  //renaming form group name should rename all children
  expectedRegisteredFields[2].fullPath[0] = "address2";
  expectedRegisteredFields[3].fullPath[0] = "address2";
  await userEvent.selectOptions(
    canvas.getByTestId("registeredFieldsSelect"),
    "3"
  );
  await userEvent.type(canvas.getByTestId("renameInput"), "address2");
  await userEvent.click(canvas.getByText("Rename field"));
  await sleep(100);
  await expect(canvas.getByTestId("registeredFields")).toHaveTextContent(
    JSON.stringify(expectedRegisteredFields)
  );
};

const _SchemaForms: StoryFn = (args: any) => {
  const [formType, setFormType] = React.useState<"new" | "update">("new");
  const [table, setTable] = React.useState<"athletes" | "products">("athletes");
  const [id, setId] = React.useState<number>(0);
  const [newFieldName, setNewFieldName] = React.useState("");
  const [dataFields, setDataFields] = React.useState<SimplifiedFormItemsProp[]>(
    []
  );
  const [dataOp, setDataOp] = React.useState<
    FormWrapperProps["data"] | undefined
  >({
    sourceId: "fake",
    opId: "fake",
    userArgs: {
      table: "athletes",
      opName: "schema",
    },
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <p>Form Type</p>
        <select
          data-testid={"formType"}
          value={formType}
          onChange={(e) => setFormType(e.target.value as any)}
        >
          <option value="new">New Entry</option>
          <option value="update">Update Entry</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <p>Table</p>
        <select
          data-testid={"table"}
          value={table}
          onChange={(e) => setTable(e.target.value as any)}
        >
          <option value={"athletes"}>Athletes</option>
          <option value="products">Products</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span>Id</span>
        <InputNumber
          value={id}
          onChange={(val) => setId(val ?? 0)}
          data-testid={"rowId"}
        />
      </div>
      <Button
        onClick={() => {
          setDataOp({
            sourceId: "fake",
            opId: "fake",
            userArgs: {
              table,
              opName: formType === "new" ? "schema" : "getRow",
              id,
            },
          });
        }}
      >
        Generate new form
      </Button>
      <Button
        onClick={() => {
          setDataOp(undefined);
          setDataFields([]);
        }}
        danger
      >
        Disconnect from data
      </Button>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span>New field name</span>
        <Input
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          style={{ width: 200 }}
          data-testid={"newFieldName"}
        />
        <Button
          onClick={() => {
            setDataFields((dataFields) => [
              ...dataFields,
              {
                inputType: InputType.Text,
                name: newFieldName,
                label: newFieldName,
              },
            ]);
            setNewFieldName("");
          }}
        >
          Add field
        </Button>
      </div>
      <hr />
      <Form
        mode="simplified"
        submitSlot={<SubmitSlot />}
        colon={false}
        data={dataOp}
        formItems={[
          {
            inputType: InputType.Text,
            name: "name",
            label: "Name",
            initialValue: "hello",
          },
          { inputType: InputType.TextArea, name: "message", label: "Message" },
        ]}
        dataFormItems={dataFields}
      />
    </div>
  );
};

export const SchemaForms = _SchemaForms.bind({});
SchemaForms.args = {};
SchemaForms.parameters = {
  mockData: [
    {
      url: "https://data.plasmic.app/api/v1/server-data/sources/:id/execute",
      method: "POST",
      status: 200,
      response: (request: any) => {
        const body = JSON.parse(request.body);
        const { opName, id } = body.userArgs;
        const table = body.userArgs.table;
        return {
          data:
            opName === "getRow"
              ? fakeInitDatabase[table].find((row: any) => row.id === id)
              : [],
          schema: {
            id: table,
            fields: fakeSchema[table],
          },
        };
      },
    },
  ],
};
SchemaForms.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const genExpectedFormItemsFromSchema = (
    table: keyof typeof fakeSchema,
    formType: "new" | "update",
    id?: number
  ) => {
    return fakeSchema[table].map((column) => ({
      name: column.name,
      fieldId: column.name,
      id: column.name,
      inputType:
        column.type === "string"
          ? InputType.Text
          : column.type === "number"
          ? InputType.Number
          : column.type === "boolean"
          ? InputType.Checkbox
          : InputType.Text,
      ...(formType === "update"
        ? {
            initialValue: fakeInitDatabase[table].find(
              (row: any) => row.id === id
            )?.[column.name],
          }
        : {}),
    })) as SimplifiedFormItemsProp[];
  };

  let expectedFormItems = genExpectedFormItemsFromSchema("athletes", "new");
  await sleep(100);
  await checkFormItems(canvasElement, expectedFormItems);

  // can switch between rows and tables
  await userEvent.selectOptions(canvas.getByTestId("formType"), "update");
  await userEvent.type(canvas.getByTestId("rowId"), "{selectall}{del}1");
  await userEvent.click(canvas.getByText("Generate new form"));
  await sleep(100);
  expectedFormItems = genExpectedFormItemsFromSchema("athletes", "update", 1);
  await checkFormItems(canvasElement, expectedFormItems);

  await userEvent.selectOptions(canvas.getByTestId("formType"), "update");
  await userEvent.type(canvas.getByTestId("rowId"), "{selectall}{del}2");
  await userEvent.click(canvas.getByText("Generate new form"));
  await sleep(100);
  expectedFormItems = genExpectedFormItemsFromSchema("athletes", "update", 2);
  await checkFormItems(canvasElement, expectedFormItems);

  await userEvent.selectOptions(canvas.getByTestId("formType"), "new");
  await userEvent.selectOptions(canvas.getByTestId("table"), "products");
  await userEvent.click(canvas.getByText("Generate new form"));
  await sleep(100);
  expectedFormItems = genExpectedFormItemsFromSchema("products", "update");
  await checkFormItems(canvasElement, expectedFormItems);

  await userEvent.selectOptions(canvas.getByTestId("formType"), "update");
  await userEvent.type(canvas.getByTestId("rowId"), "{selectall}{del}2");
  await userEvent.click(canvas.getByText("Generate new form"));
  await sleep(100);
  expectedFormItems = genExpectedFormItemsFromSchema("products", "update", 2);
  await checkFormItems(canvasElement, expectedFormItems);

  // can add new fields to schema forms
  await userEvent.type(canvas.getByTestId("newFieldName"), "new field");
  await userEvent.click(canvas.getByText("Add field"));
  await sleep(100);
  expectedFormItems.push({
    inputType: InputType.Text,
    name: "new field",
    label: "new field",
  });
  await userEvent.type(canvas.getByTestId("newFieldName"), "new field2");
  await userEvent.click(canvas.getByText("Add field"));
  await sleep(100);
  expectedFormItems.push({
    inputType: InputType.Text,
    name: "new field2",
    label: "new field2",
  });
  await checkFormItems(canvasElement, expectedFormItems);

  // disconnecting from data switches to the formItems prop
  await userEvent.click(canvas.getByText("Disconnect from data"));
  expectedFormItems = [
    {
      inputType: InputType.Text,
      name: "name",
      initialValue: "hello",
    },
    {
      inputType: InputType.TextArea,
      name: "message",
    },
  ];
  await sleep(100);
  await checkFormItems(canvasElement, expectedFormItems);

  // can connect back to data
  await userEvent.selectOptions(canvas.getByTestId("formType"), "update");
  await userEvent.selectOptions(canvas.getByTestId("table"), "athletes");
  await userEvent.type(canvas.getByTestId("rowId"), "{selectall}{del}3");
  await userEvent.click(canvas.getByText("Generate new form"));
  await sleep(100);
  expectedFormItems = genExpectedFormItemsFromSchema("athletes", "update", 3);
  await checkFormItems(canvasElement, expectedFormItems);
};

const _MultiStepForm: StoryFn = (args: any) => {
  const [step, setStep] = React.useState(0);
  const $state = useDollarState(
    [
      {
        path: "form.value",
        type: "private",
        variableType: "object",
      },
      {
        path: "submittedData",
        type: "private",
        variableType: "object",
      },
    ],
    { $props: args }
  );
  return (
    <div>
      <Form
        extendedOnValuesChange={(values) => ($state.form.value = values)}
        onFinish={(values) => ($state.submittedData = values)}
        validateTrigger={"onFinish"}
      >
        {[0, 1, 2].map((formStep) => {
          if (formStep !== step) {
            return null;
          }
          return [0, 1].map((fieldId) => (
            <FormItem
              name={`field${formStep}${fieldId}`}
              label={`Field ${formStep} ${fieldId}`}
            >
              {fieldId === 0 ? <Input /> : <InputNumber />}
            </FormItem>
          ));
        })}
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            danger
            onClick={() => setStep((s) => s - 1)}
            disabled={step < 1}
            data-testid="prevStep"
          >
            Prev step
          </Button>
          <Button
            onClick={async () => {
              setStep((s) => s + 1);
            }}
            disabled={step == 2}
            data-testid="nextStep"
          >
            Next step
          </Button>
          <Button
            type="primary"
            disabled={step != 2}
            htmlType="submit"
            data-testid="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
      <p data-testid="value">{JSON.stringify($state.form.value)}</p>
      <p data-testid="submittedData">{JSON.stringify($state.submittedData)}</p>
    </div>
  );
};

export const MultiStepForm = _MultiStepForm.bind({});
MultiStepForm.args = {};
MultiStepForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  let expectedFormItems: SimplifiedFormItemsProp[] = [
    { name: "field00", inputType: InputType.Text },
    { name: "field01", inputType: InputType.Number },
  ];
  const formItemsValues: Record<string, any> = {
    field00: "foo",
    field01: 123,
  };

  // $state.form.value keeps value stored even if the component is unmounted

  await checkFormItems(canvasElement, expectedFormItems);
  expectedFormItems[0].initialValue = formItemsValues.field00;
  expectedFormItems[1].initialValue = formItemsValues.field01;
  await modifyFormItems(canvasElement, expectedFormItems);
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    JSON.stringify(formItemsValues)
  );

  await userEvent.click(canvas.getByText("Next step"));

  expectedFormItems = [
    { name: "field10", inputType: InputType.Text },
    { name: "field11", inputType: InputType.Number },
  ];
  await checkFormItems(canvasElement, expectedFormItems);
  formItemsValues.field10 = "bar";
  formItemsValues.field11 = 456;
  expectedFormItems[0].initialValue = formItemsValues.field10;
  expectedFormItems[1].initialValue = formItemsValues.field11;
  await modifyFormItems(canvasElement, expectedFormItems);
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    JSON.stringify(formItemsValues)
  );

  await userEvent.click(canvas.getByText("Next step"));

  expectedFormItems = [
    { name: "field20", inputType: InputType.Text },
    { name: "field21", inputType: InputType.Number },
  ];
  await checkFormItems(canvasElement, expectedFormItems);
  formItemsValues.field20 = "baz";
  formItemsValues.field21 = 789;
  expectedFormItems[0].initialValue = formItemsValues.field20;
  expectedFormItems[1].initialValue = formItemsValues.field21;
  await modifyFormItems(canvasElement, expectedFormItems);
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    JSON.stringify(formItemsValues)
  );

  await userEvent.click(canvas.getByText("Submit"));
  await sleep(100);
  await expect(canvas.getByTestId("submittedData")).toHaveTextContent(
    JSON.stringify(formItemsValues)
  );

  await userEvent.click(canvas.getByText("Prev step"));
  expectedFormItems = [
    { name: "field10", inputType: InputType.Text, initialValue: "bar" },
    { name: "field11", inputType: InputType.Number, initialValue: 456 },
  ];
  await checkFormItems(canvasElement, expectedFormItems);
  formItemsValues.field10 = "";
  formItemsValues.field11 = 123;
  expectedFormItems[0].initialValue = formItemsValues.field10;
  expectedFormItems[1].initialValue = formItemsValues.field11;
  await modifyFormItems(canvasElement, expectedFormItems);
  await expect(canvas.getByTestId("value")).toHaveTextContent(
    JSON.stringify(formItemsValues)
  );

  await userEvent.click(canvas.getByText("Next step"));
  await userEvent.click(canvas.getByText("Submit"));
  await sleep(100);
  await expect(canvas.getByTestId("submittedData")).toHaveTextContent(
    JSON.stringify(formItemsValues)
  );
};

const _FormValidation: StoryFn = (args: any) => {
  return (
    <div>
      Simple Validation
      <Form
        mode="simplified"
        submitSlot={<SubmitSlot label="Submit 1" />}
        formItems={[
          {
            inputType: InputType.Text,
            name: "field1",
            label: "Required Field",
            rules: [
              {
                ruleType: "required",
                message: "Field Is Required",
              },
            ],
          },
          {
            inputType: InputType.Text,
            name: "field2",
            label: "Field with maximum length",
            rules: [
              {
                ruleType: "max",
                length: 5,
                message: "Maximum Length is 5",
              },
            ],
          },
          {
            inputType: InputType.Text,
            name: "field3",
            label: "Field with minimum length",
            rules: [
              {
                ruleType: "min",
                length: 5,
                message: "Minimum Length is 5",
              },
            ],
          },
          {
            inputType: InputType.Text,
            name: "field4",
            label: "Must be one of rule",
            rules: [
              {
                ruleType: "enum",
                options: [{ value: "foo" }, { value: "bar" }, { value: "baz" }],
                message: "Invalid value for field4",
              },
            ],
          },
          {
            inputType: InputType.Text,
            name: "field5",
            label: "Forbid all-whitespace",
            rules: [
              {
                ruleType: "whitespace",
                message: "Only whitespace",
              },
            ],
          },
          {
            inputType: InputType.Text,
            name: "field6",
            label: "Custom validator",
            rules: [
              {
                ruleType: "advanced",
                message: "Invalid value for field 6",
                custom: (_rule, value) => value === "qux",
              },
            ],
          },
        ]}
      />
      Multiple validations
      <Form
        mode="simplified"
        submitSlot={<SubmitSlot label="Submit 2" />}
        formItems={[
          {
            inputType: InputType.Text,
            name: "field7",
            label: "Required Field",
            rules: [
              {
                ruleType: "required",
                message: "Field Is Required",
              },
              {
                ruleType: "whitespace",
                message: "No whitespace",
              },
              {
                ruleType: "min",
                length: 3,
                message: "min length 3",
              },
              {
                ruleType: "max",
                length: 6,
                message: "max length 6",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export const FormValidation = _FormValidation.bind({});
FormValidation.args = {};
FormValidation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  let labelDom = canvasElement.querySelector(`label[for="field1"]`);
  await expect(labelDom).toBeInTheDocument();
  await expect(labelDom).toHaveClass("ant-form-item-required");

  labelDom = canvasElement.querySelector(`label[for="field2"]`);
  await expect(labelDom).toBeInTheDocument();
  await expect(labelDom).not.toHaveClass("ant-form-item-required");

  await modifyFormItems(canvasElement, [
    { name: "field2", initialValue: "more than five chars" },
    { name: "field3", initialValue: "foo" },
    { name: "field4", initialValue: "hello" },
    { name: "field5", initialValue: "   " },
    { name: "field6", initialValue: "bar" },
  ]);

  await userEvent.click(canvas.getByText("Submit 1"));
  await sleep(1000);
  await expect(
    canvasElement.getElementsByClassName("ant-form-item-explain-error").length
  ).toBe(6);

  await expect(canvas.getByText("Field Is Required"));
  await expect(canvas.getByText("Maximum Length is 5"));
  await expect(canvas.getByText("Minimum Length is 5"));
  await expect(canvas.getByText("Invalid value for field4"));
  await expect(canvas.getByText("Only whitespace"));
  await expect(canvas.getByText("Invalid value for field 6"));

  await modifyFormItems(canvasElement, [
    { name: "field1", initialValue: "hello" },
    { name: "field2", initialValue: "foo" },
    { name: "field3", initialValue: "more than five chars" },
    { name: "field4", initialValue: "bar" },
    { name: "field5", initialValue: "baz" },
    { name: "field6", initialValue: "qux" },
  ]);

  await userEvent.click(canvas.getByText("Submit 1"));
  await sleep(1000);
  await expect(
    canvasElement.getElementsByClassName("ant-form-item-explain-error").length
  ).toBe(0);

  await userEvent.click(canvas.getByText("Submit 2"));
  await sleep(700);
  await expect(canvas.getByText("Field Is Required"));

  await modifyFormItems(canvasElement, [
    { name: "field7", initialValue: "  " },
  ]);
  await userEvent.click(canvas.getByText("Submit 2"));
  await sleep(700);
  await expect(canvas.getByText("No whitespace"));

  await modifyFormItems(canvasElement, [
    { name: "field7", initialValue: "ab" },
  ]);
  await userEvent.click(canvas.getByText("Submit 2"));
  await sleep(700);
  await expect(canvas.getByText("min length 3"));

  await modifyFormItems(canvasElement, [
    { name: "field7", initialValue: "more than six chars" },
  ]);
  await userEvent.click(canvas.getByText("Submit 2"));
  await sleep(700);
  await expect(canvas.getByText("max length 6"));

  await modifyFormItems(canvasElement, [
    { name: "field7", initialValue: "  " },
  ]);
  await sleep(700);
  await expect(canvas.getByText("No whitespace"));
  await expect(canvas.getByText("min length 3"));
  await expect(
    canvasElement.getElementsByClassName("ant-form-item-explain-error").length
  ).toBe(2);

  await modifyFormItems(canvasElement, [
    { name: "field7", initialValue: "valid" },
  ]);
  await userEvent.click(canvas.getByText("Submit 2"));
  await sleep(700);
  await expect(
    canvasElement.getElementsByClassName("ant-form-item-explain-error").length
  ).toBe(0);
};
