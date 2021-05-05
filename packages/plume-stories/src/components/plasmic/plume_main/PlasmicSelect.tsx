// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: tH77ekFNugan8Yv3d3xJez
// Component: Xawb-6P8kx
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants,
} from "@plasmicapp/react-web";
import Select__Overlay from "../../select/Select__Overlay"; // plasmic-import: 48mjMNThJvo/component
import Select__Option from "../../select/Select__Option"; // plasmic-import: Z70s2K4zPR/component

import "@plasmicapp/react-web/lib/plasmic.css";
import * as defaultcss from "../plasmic__default_style.module.css"; // plasmic-import: global/defaultcss
import * as projectcss from "./plasmic_plume_main.module.css"; // plasmic-import: tH77ekFNugan8Yv3d3xJez/projectcss
import * as sty from "./PlasmicSelect.module.css"; // plasmic-import: Xawb-6P8kx/css

import ChevronDownIcon from "./icons/PlasmicIcon__ChevronDown"; // plasmic-import: VfjbLxU-bA/icon
import ChevronUpIcon from "./icons/PlasmicIcon__ChevronUp"; // plasmic-import: _2iYp9TARO/icon

export type PlasmicSelect__VariantMembers = {
  showPlaceholder: "showPlaceholder";
  isOpen: "isOpen";
  isDisabled: "isDisabled";
};

export type PlasmicSelect__VariantsArgs = {
  showPlaceholder?: SingleBooleanChoiceArg<"showPlaceholder">;
  isOpen?: SingleBooleanChoiceArg<"isOpen">;
  isDisabled?: SingleBooleanChoiceArg<"isDisabled">;
};

type VariantPropType = keyof PlasmicSelect__VariantsArgs;
export const PlasmicSelect__VariantProps = new Array<VariantPropType>(
  "showPlaceholder",
  "isOpen",
  "isDisabled"
);

export type PlasmicSelect__ArgsType = {
  selectedContent?: React.ReactNode;
  placeholder?: React.ReactNode;
  children?: React.ReactNode;
  value?: string;
  name?: string;
};

type ArgPropType = keyof PlasmicSelect__ArgsType;
export const PlasmicSelect__ArgProps = new Array<ArgPropType>(
  "selectedContent",
  "placeholder",
  "children",
  "value",
  "name"
);

export type PlasmicSelect__OverridesType = {
  root?: p.Flex<"div">;
  trigger?: p.Flex<"button">;
  contentContainer?: p.Flex<"div">;
  dropdownIcon?: p.Flex<"svg">;
  overlay?: p.Flex<typeof Select__Overlay>;
  optionsContainer?: p.Flex<"div">;
};

export interface DefaultSelectProps extends p.BaseSelectProps {
  name?: string;
}

const PlasmicSelectContext = React.createContext<
  | undefined
  | { variants: PlasmicSelect__VariantsArgs; args: PlasmicSelect__ArgsType }
>(undefined);

function PlasmicSelect__RenderFunc(props: {
  variants: PlasmicSelect__VariantsArgs;
  args: PlasmicSelect__ArgsType;
  overrides: PlasmicSelect__OverridesType;
  forNode?: string;
}) {
  const { variants, args, overrides, forNode } = props;

  const [
    isRootFocusVisibleWithin,
    triggerRootFocusVisibleWithinProps,
  ] = useTrigger("useFocusVisibleWithin", {
    isTextInput: false,
  });

  const triggers = {
    focusVisibleWithin_root: isRootFocusVisibleWithin,
  };

  return (
    <PlasmicSelectContext.Provider value={{ variants, args }}>
      <div
        data-plasmic-name={"root"}
        data-plasmic-override={overrides.root}
        data-plasmic-root={true}
        data-plasmic-for-node={forNode}
        className={classNames(defaultcss.all, projectcss.root_reset, sty.root, {
          [sty.root__isOpen]: hasVariant(variants, "isOpen", "isOpen"),
        })}
        data-plasmic-trigger-props={[triggerRootFocusVisibleWithinProps]}
      >
        <p.Stack
          as={"button"}
          data-plasmic-name={"trigger"}
          data-plasmic-override={overrides.trigger}
          hasGap={true}
          className={classNames(defaultcss.button, sty.trigger, {
            [sty.trigger_____focusVisibleWithin]:
              triggers.focusVisibleWithin_root,
            [sty.trigger__isDisabled]: hasVariant(
              variants,
              "isDisabled",
              "isDisabled"
            ),
            [sty.trigger__isOpen]: hasVariant(variants, "isOpen", "isOpen"),
          })}
        >
          <div
            data-plasmic-name={"contentContainer"}
            data-plasmic-override={overrides.contentContainer}
            className={classNames(defaultcss.all, sty.contentContainer, {
              [sty.contentContainer__showPlaceholder]: hasVariant(
                variants,
                "showPlaceholder",
                "showPlaceholder"
              ),
            })}
          >
            {(
              hasVariant(variants, "showPlaceholder", "showPlaceholder")
                ? false
                : true
            )
              ? p.renderPlasmicSlot({
                  defaultContents: "Selected",
                  value: args.selectedContent,
                  className: classNames(sty.slotSelectedContent, {
                    [sty.slotSelectedContent__isOpen]: hasVariant(
                      variants,
                      "isOpen",
                      "isOpen"
                    ),
                    [sty.slotSelectedContent__showPlaceholder]: hasVariant(
                      variants,
                      "showPlaceholder",
                      "showPlaceholder"
                    ),
                  }),
                })
              : null}
            {(
              hasVariant(variants, "showPlaceholder", "showPlaceholder")
                ? true
                : false
            )
              ? p.renderPlasmicSlot({
                  defaultContents: "Placeholder...",
                  value: args.placeholder,
                  className: classNames(sty.slotPlaceholder, {
                    [sty.slotPlaceholder__showPlaceholder]: hasVariant(
                      variants,
                      "showPlaceholder",
                      "showPlaceholder"
                    ),
                  }),
                })
              : null}
          </div>

          <p.PlasmicIcon
            data-plasmic-name={"dropdownIcon"}
            data-plasmic-override={overrides.dropdownIcon}
            PlasmicIconType={
              hasVariant(variants, "isOpen", "isOpen")
                ? ChevronUpIcon
                : ChevronDownIcon
            }
            className={classNames(defaultcss.all, sty.dropdownIcon, {
              [sty.dropdownIcon__isOpen]: hasVariant(
                variants,
                "isOpen",
                "isOpen"
              ),
            })}
            role={"img"}
          />
        </p.Stack>

        {(hasVariant(variants, "isOpen", "isOpen") ? true : false) ? (
          <Select__Overlay
            data-plasmic-name={"overlay"}
            data-plasmic-override={overrides.overlay}
            className={classNames("__wab_instance", sty.overlay, {
              [sty.overlay__isOpen]: hasVariant(variants, "isOpen", "isOpen"),
            })}
            relativePlacement={"bottom" as const}
          >
            <div
              data-plasmic-name={"optionsContainer"}
              data-plasmic-override={overrides.optionsContainer}
              className={classNames(defaultcss.all, sty.optionsContainer)}
            >
              {p.renderPlasmicSlot({
                defaultContents: (
                  <React.Fragment>
                    <Select__Option
                      className={classNames(
                        "__wab_instance",
                        sty.option__gcPey
                      )}
                      value={"value1" as const}
                    >
                      {"Option 1"}
                    </Select__Option>

                    <Select__Option
                      className={classNames(
                        "__wab_instance",
                        sty.option__upo2O
                      )}
                      value={"value2" as const}
                    >
                      {"Option 2"}
                    </Select__Option>
                  </React.Fragment>
                ),
                value: args.children,
              })}
            </div>
          </Select__Overlay>
        ) : null}
      </div>
    </PlasmicSelectContext.Provider>
  ) as React.ReactElement | null;
}

function useBehavior<P extends p.BaseSelectProps>(props: P, ref: p.SelectRef) {
  props = {
    ...props,
    ...(!props.children && {
      children: (
        <React.Fragment>
          <Select__Option
            className={classNames("__wab_instance", sty.option__gcPey)}
            value={"value1" as const}
          >
            {"Option 1"}
          </Select__Option>

          <Select__Option
            className={classNames("__wab_instance", sty.option__upo2O)}
            value={"value2" as const}
          >
            {"Option 2"}
          </Select__Option>
        </React.Fragment>
      ),
    }),
  };

  return p.useSelect(
    PlasmicSelect,
    props,
    {
      isOpenVariant: { group: "isOpen", variant: "isOpen" },
      placeholderVariant: {
        group: "showPlaceholder",
        variant: "showPlaceholder",
      },
      isDisabledVariant: { group: "isDisabled", variant: "isDisabled" },
      triggerContentSlot: "selectedContent",
      optionsSlot: "children",
      placeholderSlot: "placeholder",
      root: "root",
      trigger: "trigger",
      overlay: "overlay",
      optionsContainer: "optionsContainer",
    },

    ref
  );
}

const PlasmicDescendants = {
  root: [
    "root",
    "trigger",
    "contentContainer",
    "dropdownIcon",
    "overlay",
    "optionsContainer",
  ],
  trigger: ["trigger", "contentContainer", "dropdownIcon"],
  contentContainer: ["contentContainer"],
  dropdownIcon: ["dropdownIcon"],
  overlay: ["overlay", "optionsContainer"],
  optionsContainer: ["optionsContainer"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<
  T extends NodeNameType
> = typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
  trigger: "button";
  contentContainer: "div";
  dropdownIcon: "svg";
  overlay: typeof Select__Overlay;
  optionsContainer: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicSelect__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> = {
  // Explicitly specify variants, args, and overrides as objects
  variants?: PlasmicSelect__VariantsArgs;
  args?: PlasmicSelect__ArgsType;
  overrides?: NodeOverridesType<T>;
} & Omit<PlasmicSelect__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
  // Specify args directly as props
  Omit<PlasmicSelect__ArgsType, ReservedPropsType> &
  // Specify overrides for each element directly as props
  Omit<
    NodeOverridesType<T>,
    ReservedPropsType | VariantPropType | ArgPropType
  > &
  // Specify props for the root element
  Omit<
    Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
    ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
  >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicSelect__ArgProps,
      internalVariantPropNames: PlasmicSelect__VariantProps,
    });

    return PlasmicSelect__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicSelect";
  } else {
    func.displayName = `PlasmicSelect.${nodeName}`;
  }
  return func;
}

export const PlasmicSelect = Object.assign(
  // Top-level PlasmicSelect renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    trigger: makeNodeComponent("trigger"),
    contentContainer: makeNodeComponent("contentContainer"),
    dropdownIcon: makeNodeComponent("dropdownIcon"),
    overlay: makeNodeComponent("overlay"),
    optionsContainer: makeNodeComponent("optionsContainer"),

    // Metadata about props expected for PlasmicSelect
    internalVariantProps: PlasmicSelect__VariantProps,
    internalArgProps: PlasmicSelect__ArgProps,

    // Context for sub components
    Context: PlasmicSelectContext,

    useBehavior,
  }
);

export default PlasmicSelect;
/* prettier-ignore-end */
