import { rgba } from 'polished';
import { css } from 'styled-components';
import { add as addGoogleFont } from 'google-fonts';
import { CDPComponents } from 'mnet-icons';

import { deepFreeze } from 'mnet-ui-base/utils/object';
import { normalizeColor } from 'mnet-ui-base/utils/colors';
import { parseMetricToNum } from 'mnet-ui-base/utils/mixins';

const {
  ArrowUp, ArrowDown, ArrowRight, Close, Info, Success, Failed,
} = CDPComponents;

addGoogleFont({
  'Open Sans': true,
});

const brandColor = '#E15151';
const accentColors = ['#739FFC', '#F5F5F5', '#90D099', '#16B037', '#FC564F'];
const neutralColors = ['#519bff', '#99742E', '#00739D', '#A2423D'];
const statusColors = {
  critical: '#e35e59',
  error: '#E28880',
  warning: '#EDB982',
  ok: '#90D099',
  unknown: '#CCCCCC',
  disabled: '#CCCCCC',
};
const darkColors = [
  '#575F7D',
  '#8F94A6',
  '#E8EAF0',
  '#898EA2',
  '#BABDCA',
  '#DEDEDE',
  '#2F3A4A',
  '#29313D',

];
const lightColors = [
  '#F5F5F5',
  '#C4C4C4',
  '#E7EAF1',
  '#e1e3ef',
  '#9DA2AD',
  '#DADADA',
  '#F5F7FD',
];
const focusColor = 'transparent';
const initialBgColor = '#FC564F';
const colors = {
  active: 'rgba(221, 221, 221, 0.5)',
  'background-back': {
    dark: '#FFFFFF',
    light: '#FFFFFF',
  },
  'background-front': {
    dark: '#F8FAFE',
    light: '#F8FAFE',
  },
  'background-contrast': {
    dark: '#F3FFF5',
    light: '#F3FFF5',
  },
  'active-background': 'background-contrast',
  'error-background': '#FEEFEE',
  'active-text': 'text-strong',
  black: '#000000',
  border: {
    dark: '#D4D9E2',
    light: '#D4D9E2',
  },
  brand: brandColor,
  control: {
    dark: 'accent-3',
    light: 'accent-3',
  },
  focus: focusColor,
  'graph-0': 'accent-1',
  'graph-1': 'neutral-1',
  'graph-2': 'neutral-2',
  'graph-3': 'neutral-3',
  'graph-4': 'neutral-4',
  placeholder: 'light-5',
  selected: 'light-7',
  text: {
    dark: '#f8f8f8',
    light: '#898EA2',
  },
  'text-strong': {
    dark: '#FFFFFF',
    light: '#575F7D',
  },
  'text-weak': {
    dark: '#CCCCCC',
    light: '#898EA2',
  },
  'text-xweak': {
    dark: '#BBBBBB',
    light: '#BABDCA',
  },
  icon: {
    dark: 'dark-1',
    light: 'dark-1',
  },
  'selected-background': 'brand',
  'selected-text': 'text-strong',
  white: '#FFFFFF',
  link: '#739FFC',
};

const colorArray = (array, prefix) => array.forEach((color, index) => {
  colors[`${prefix}-${index + 1}`] = color;
});

colorArray(accentColors, 'accent');
colorArray(darkColors, 'dark');
colorArray(lightColors, 'light');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

export const generate = (baseSpacing = 16, scale = 6) => {
  const baseFontSize = baseSpacing * 0.75; // 12
  const fontScale = baseSpacing / scale; // 16

  const fontSizing = factor => ({
    size: `${baseFontSize + factor * fontScale}px`,
    height: `${baseSpacing + factor * fontScale}px`,
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
  });

  const borderWidth = 0;
  const controlBorderWidth = 1;

  const result = {
    global: {
      active: {
        background: {
          color: 'active',
          opacity: 'medium',
        },
        color: {
          dark: 'white',
          light: '#898EA2',
        },
      },
      animation: {
        duration: '1s',
        jiggle: {
          duration: '0.1s',
        },
      },
      borderSize: {
        xsmall: '1px',
        small: '2px',
        medium: `${baseSpacing / 6}px`, // 4
        large: `${baseSpacing / 2}px`, // 12
        xlarge: `${baseSpacing}px`, // 24
      },
      breakpoints: {
        small: {
          value: baseSpacing * 32, // 768
          borderSize: {
            xsmall: '1px',
            small: '2px',
            medium: `${baseSpacing / 6}px`, // 4
            large: `${baseSpacing / 4}px`, // 6
            xlarge: `${baseSpacing / 2}px`, // 12
          },
          edgeSize: {
            none: '0px',
            hair: '1px', // for Chart
            xxsmall: '2px',
            xsmall: `${baseSpacing / 8}px`, // 3
            small: `${baseSpacing / 4}px`, // 6
            medium: `${baseSpacing / 2}px`, // 12
            large: `${baseSpacing}px`, // 24
            xlarge: `${baseSpacing * 2}px`, // 48
          },
          size: {
            xxsmall: `${baseSpacing}px`, // 24
            xsmall: `${baseSpacing * 2}px`, // 48
            small: `${baseSpacing * 4}px`, // 96
            medium: `${baseSpacing * 8}px`, // 192
            large: `${baseSpacing * 16}px`, // 384
            xlarge: `${baseSpacing * 32}px`, // 768
            full: '100%',
          },
        },
        medium: {
          value: baseSpacing * 64, // 1536
        },
        large: {}, // anything above 'medium'
      },
      // Breakpoints used at Server Side Rendering for the initial rendering
      // These values correspond to the theme breakpoints
      deviceBreakpoints: {
        phone: 'small',
        tablet: 'medium',
        computer: 'large',
      },
      colors,
      control: {
        border: {
          width: `${controlBorderWidth}px`,
          radius: '4px',
          color: 'border',
        },
        disabled: {
          opacity: 0.3,
        },
      },
      // The time to wait after the user stopped typing, measured in ms.
      debounceDelay: 300,
      drop: {
        background: '#ffffff',
        border: {
          radius: `${controlBorderWidth * 5}px`,
        },
        zIndex: '20',
        marginTop: 0,
        extend: undefined,
      },
      edgeSize: {
        none: '0px',
        hair: '1px', // for Chart
        xxsmall: `${baseSpacing / (1.618 * 8)}px`, // 3
        xsmall: `${baseSpacing / (1.618 * 4)}px`, // 6
        small: `${baseSpacing / (1.618 * 2)}px`, // 12
        medium: `${baseSpacing / 1.618}px`, // 24
        large: `${baseSpacing}px`, // 48
        xlarge: `${baseSpacing * 1.618}px`, // 96
        responsiveBreakpoint: 'small',
      },
      elevation: {
        light: {
          none: 'none',
          xsmall: '0px 1px 2px rgba(0, 0, 0, 0.02)',
          small: '0px 1px 5px 0px rgba(217,217,217,1)',
          medium: '0px 4px 8px rgba(0, 0, 0, 0.02)',
          large: '0px 4px 13px rgba(0, 0, 0, 0.1)',
          xlarge: '0px 12px 24px rgba(0, 0, 0, 0.02)',
        },
        dark: {
          none: 'none',
          xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',
          small: '0px 4px 4px rgba(255, 255, 255, 0.40)',
          medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',
          large: '0px 4px 13px rgba(0, 0, 0, 0.1)',
          xlarge: '0px 12px 24px rgba(255, 255, 255, 0.40)',
        },
      },
      focus: {
        // shadow or outline are required for accessibility
        border: {
          // remove to only have shadow
          color: 'focus',
        },
        // outline: { color: undefined, size: undefined },
        shadow: {
          color: 'focus',
          size: '1px',
        },
      },
      font: {
        ...fontSizing(0),
        // face: undefined,
        family: "'Open Sans', sans-serif",
      },
      hover: {
        background: {
          color: 'active',
          opacity: 'medium',
        },
        color: {
          dark: 'white',
          light: 'black',
        },
      },
      input: {
        padding: {
          horizontal: `${
            parseMetricToNum(`${baseSpacing / 2}px`)
            - parseMetricToNum(`${controlBorderWidth}px`)
          }px`,
          vertical: `${
            parseMetricToNum(`${baseSpacing / 1.418}px`)
            - parseMetricToNum(`${controlBorderWidth}px`)
          }px`,
        },
        font: {
          size: 'large',
          // height: undefined,
          weight: 600,
        },
        // deprecate in v3
        // weight: undefined,
      },
      opacity: {
        strong: 0.8,
        medium: 0.4,
        weak: 0.1,
      },
      selected: {
        background: 'light-7',
        color: 'dark-3',
      },
      spacing: `${baseSpacing}px`,
      size: {
        xxsmall: `${baseSpacing * 2.2}px`, // 48
        xsmall: `${baseSpacing * 4}px`, // 96
        small: `${baseSpacing * 8}px`, // 192
        medium: `${baseSpacing * 16}px`, // 384
        large: `${baseSpacing * 32}px`, // 768
        xlarge: `${baseSpacing * 48}px`, // 1152
        xxlarge: `${baseSpacing * 64}px`, // 1536
        full: '100%',
      },
    },
    accordion: {
      panel: {
        border: undefined,
      },
      border: undefined,
      heading: {
        level: '4', // level ranges from 1-6
        // margin: undefined
      },
      hover: {
        color: { dark: 'light-4', light: 'dark-3' }, // deprecated
        heading: {
          color: { dark: 'light-4', light: 'dark-3' },
        },
      },
    },
    anchor: {
      textDecoration: 'none',
      fontWeight: 600,
      color: {
        dark: 'brand',
        light: 'brand',
      },
      hover: {
        textDecoration: 'underline',
        // fontWeight: undefined,
        // extend: undefined,
      },
      // extend: undefined,
    },
    avatar: {
      // extend: undefined,
      size: {
        xsmall: `${baseSpacing * 0.75}px`,
        small: `${baseSpacing}px`,
        medium: `${baseSpacing * 2}px`, // default 48
        large: `${baseSpacing * 3}px`,
        xlarge: `${baseSpacing * 4}px`,
      },
      text: {
        // fontWeight: undefined,
        // extend: undefined
      },
    },
    box: {
      responsiveBreakpoint: 'small', // when we switch rows to columns
      // extend: undefined,
    },
    breadcrumb: {
      item: {
        margin: {
          right: 'medium',
        },
      },
      content: {
        color: 'dark-1',
        size: 'large',
        extend: ({ last }) => ({
          fontWeight: last ? '400' : '600',
          marginRight: `${baseSpacing / 3.2}px`,
        }),
      },
      icon: {
        color: 'dark-1',
        size: 'large',
      },
      icons: {
        separator: ArrowRight,
      },
      extend: {
        ul: {
          display: 'flex',
          li: {
            border: 'none',
            padding: 0,
          },
        },
      },
    },
    button: {
      size: {
        small: {
          border: {
            radius: `${baseSpacing * 0.25}px`, // 4px
          },
          // pad: {
          //   vertical: `${baseSpacing / (1.618 * 2) - borderWidth}px`, // 4px
          //   horizontal: `${baseSpacing - borderWidth * 2}px`, // 20px,
          // },
        },
        medium: {
          border: {
            radius: `${baseSpacing * 0.312}px`, // 5px
          },
          // pad: {
          //   vertical: `${baseSpacing / 1.618 - borderWidth}px`,
          //   horizontal: `${baseSpacing - borderWidth * 1.4}px`,
          // },
        },
        large: {
          border: {
            radius: `${baseSpacing * 0.4}px`, // 24px
          },
          // pad: {
          //   vertical: `${baseSpacing / (1.618 / 2) + borderWidth}px`, // 8px
          //   horizontal: `${baseSpacing * 2.8 - borderWidth}px`, // 32px,
          // },
        },
      },
      border: {
        // color: { dark: undefined, light: undefined }
        width: `${borderWidth}px`,
        radius: `${baseSpacing * 0.0625}px`,
      },
      color: { dark: undefined, light: undefined },
      basic: {
        background: 'transparent',
        border: 'none',
        // color: undefined,
        padding: {
          vertical: '0',
          horizontal: '0',
        },
        // extend: undefined,
      },
      default: true,
      primary: {
        background: 'accent-1',
        border: {
          color: { dark: 'accent-1', light: 'accent-1' },
        },
        color: 'white',
        padding: {
          vertical: 'large',
          horizontal: 'xlarge',
        },
        extend: {
          fontWeight: 600,
          fontSize: `${baseSpacing * 0.875}px`,
        },
      },
      secondary: {
        background: 'white',
        border: {
          color: { dark: 'accent-1', light: 'accent-1' },
          width: '1px',
        },
        color: 'accent-1',
        padding: {
          vertical: 'large',
          horizontal: 'xlarge',
        },
        extend: {
          fontWeight: 600,
          fontSize: `${baseSpacing * 0.875}px`,
        },
      },
      tertiary: undefined,
      active: {
        background: undefined,
        border: {
          color: { dark: 'accent-3', light: 'accent-3' },
          width: `${borderWidth}px`,
          radius: `${baseSpacing * 0.2}px`,
        },
        color: undefined,
        extend: ({ active }) => `
          ${active ? 'padding-left: 0px' : ''}
        `,
        //   primary: {},
        //   secondary: {},
      },
      disabled: {
        background: 'dark-2',
        border: false,
        color: 'white',
        opacity: undefined,
        //   extend: undefined,
        //   default: {},
        //   primary: {},
        //   secondary: {},
      },
      // hover: {
      //   background: undefined,
      //   border: undefined,
      //   color: undefined},
      //   extend: undefined,
      //   default: {},
      //   primary: {},
      //   secondary: {},
      // },
      padding: {
        vertical: `${baseSpacing / 1.618 - borderWidth}px`,
        horizontal: `${baseSpacing - borderWidth * 1.4}px`,
      },
      transition: {
        timing: 'ease-in-out',
        duration: 0.1,
        properties: ['color', 'background-color', 'border-color', 'box-shadow'],
      },
    },
    calendar: {
      // daySize must align with global.size
      small: {
        fontSize: `${baseFontSize - fontScale}px`,
        lineHeight: 1.375,
        daySize: `${(baseSpacing * 8) / 7}px`,
        slideDuration: '0.2s',
      },
      medium: {
        fontSize: `${baseFontSize}px`,
        lineHeight: 1.45,
        daySize: `${(baseSpacing * 16) / 7}px`,
        slideDuration: '0.5s',
      },
      large: {
        fontSize: `${baseFontSize + 3 * fontScale}px`,
        lineHeight: 1.11,
        daySize: `${(baseSpacing * 32) / 7}px`,
        slideDuration: '0.8s',
      },
      heading: { level: '4' }, // level ranges from 1-6
    },
    carousel: {
      animation: {
        duration: 1000,
      },
      disabled: {
        icons: {
          // color: { dark: undefined, light: undefined },
        },
      },
    },
    checkBox: {
      border: {
        color: {
          dark: 'dark-2',
          light: 'dark-2',
        },
        width: '1.5px',
      },
      check: {
        // extend: undefined,
        radius: '4px',
        thickness: '4px',
      },
      // color: { dark: undefined, light: undefined },
      extend: {
        opacity: 1,
        maxWidth: '100%',
        span: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
      // gap: undefined
      hover: {
        border: 'none',
      },
      icon: {
        // size: undefined,
        // extend: undefined,
      },
      icons: {
        // checked: undefined,
        // indeterminate: undefined,
      },
      label: { align: 'center' },
      size: `${baseSpacing}px`,
      toggle: {
        background: { light: 'accent-2' },
        size: `${baseSpacing * 1.875}px`,
        color: {
          dark: 'accent-4',
          light: 'accent-4',
        },
        knob: {
          background: { light: statusColors.error },
          color: { light: statusColors.error },
          extend: ({ checked, theme }) => ({
            top: '1px',
            left: '2px',
            width: `${baseSpacing / 2}px`,
            height: `${baseSpacing / 2}px`,
            background: normalizeColor(checked ? 'accent-4' : 'dark-2', theme),
          }),
        },
        radius: `${baseSpacing / 2}px`,
        extend: ({ checked, theme }) => ({
          height: `${baseSpacing}px`,
          border: `2px solid ${normalizeColor(checked ? 'accent-4' : 'dark-2', theme)}`,
          background: 'white',
        }),
      },
    },
    clock: {
      analog: {
        // extend: undefined,
        hour: {
          color: {
            dark: 'light-2',
            light: 'dark-3',
          },
          width: `${baseSpacing / 3}px`,
          size: `${baseSpacing}px`,
          shape: 'round',
        },
        minute: {
          color: {
            dark: 'light-4',
            light: 'dark-3',
          },
          width: `${baseSpacing / 6}px`,
          size: `${Math.round(baseSpacing / 2)}px`,
          shape: 'round',
        },
        second: {
          color: {
            dark: 'accent-1',
            light: 'accent-1',
          },
          width: `${baseSpacing / 8}px`,
          size: `${Math.round(baseSpacing / 2.666)}px`,
          shape: 'round',
        },
        size: {
          small: `${baseSpacing * 3}px`,
          medium: `${baseSpacing * 4}px`,
          large: `${baseSpacing * 6}px`,
          xlarge: `${baseSpacing * 9}px`,
          huge: `${baseSpacing * 12}px`,
        },
      },
      digital: {
        text: {
          xsmall: { size: `${baseFontSize - 2 * fontScale}px`, height: 1.5 },
          small: { size: `${baseFontSize - fontScale}px`, height: 1.43 },
          medium: { size: `${baseFontSize}px`, height: 1.375 },
          large: { size: `${baseFontSize + fontScale}px`, height: 1.167 },
          xlarge: { size: `${baseFontSize + 2 * fontScale}px`, height: 1.1875 },
          xxlarge: { size: `${baseFontSize + 4 * fontScale}px`, height: 1.125 },
        },
      },
    },
    collapsible: {
      minSpeed: 200,
      baseline: 500,
    },
    dataTable: {
      groupHeader: {
        background: {
          dark: 'dark-2',
          light: 'light-2',
        },
        border: { side: 'bottom', size: 'xsmall' },
        pad: { horizontal: 'small', vertical: 'xsmall' },
      },
      groupEnd: {
        border: { side: 'bottom', size: 'xsmall' },
      },
      header: {},
      primary: {
        weight: 'bold',
      },
      resize: {
        border: {
          color: 'border',
          side: 'end',
        },
      },
    },
    diagram: {
      // extend: undefined,
      line: {
        color: 'graph-0',
      },
    },
    // drop: {
    //   extend: undefined,
    //   maxHeight: undefined,
    // },
    formField: {
      border: {
        color: 'border',
        error: {
          color: {
            dark: 'white',
            light: 'status-critical',
          },
        },
        position: 'inner',
        side: 'all',
        size: 'xsmall',
      },
      content: {
        pad: 'small',
      },
      disabled: {
        background: {
          color: 'status-disabled',
          opacity: 'medium',
        },
        // border: {
        //   color: undefined,
        // },
        // label: {
        //   color: undefined,
        // },
      },
      // focus: {
      //   background: {
      //     color: undefined,
      //   },
      //   border: {
      //     color: undefined,
      //   },
      // },
      error: {
        color: 'status-critical',
        margin: { vertical: 'xsmall', horizontal: 'none' },
        // background: undefined,
      },
      // extend: undefined,
      help: {
        color: 'dark-3',
        margin: {
          start: 'small',
        },
      },
      info: {
        color: 'text-xweak',
        margin: { vertical: '0', left: 'medium' },
        extend: {
          position: 'relative',
          top: '3px',
        },
      },
      label: {
        margin: { vertical: 'large', horizontal: '0' },
      },
      margin: { bottom: 'small' },
      postfix: {
        color: 'white',
        background: 'background-contrast',
        justify: 'center',
        pad: { horizontal: 'medium', vertical: 'medium' },
      },
      prefix: {
        color: 'white',
        background: 'background-contrast',
        justify: 'center',
        pad: { horizontal: 'medium', vertical: 'medium' },
      },
      // round: undefined,
      extend: {
        button: {
          flex: 1,
          border: 'none',
        },
        input: {
          border: 'none',
        },
      },
      round: 'small',
    },
    mnet: {
      global: css`
        :focus {
          outline: none;
        }
      `,
    },
    heading: {
      font: {
        // family: undefined
      },
      level: {
        1: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          xsmall: { ...fontSizing(2) },
          small: { ...fontSizing(4) },
          medium: { ...fontSizing(8) },
          large: { ...fontSizing(16) },
          xlarge: { ...fontSizing(24) },
        },
        2: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(2) },
          medium: { ...fontSizing(4) },
          large: { ...fontSizing(8) },
          xlarge: { ...fontSizing(12) },
        },
        3: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(1) },
          medium: { ...fontSizing(2) },
          large: { ...fontSizing(4) },
          xlarge: { ...fontSizing(6) },
        },
        4: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(0) },
          medium: { ...fontSizing(0) },
          large: { ...fontSizing(0) },
          xlarge: { ...fontSizing(0) },
        },
        5: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(-0.5) },
          medium: { ...fontSizing(-0.5) },
          large: { ...fontSizing(-0.5) },
          xlarge: { ...fontSizing(-0.5) },
        },
        6: {
          font: {
            // family: undefined,
            // weight: undefined,
          },
          small: { ...fontSizing(-1) },
          medium: { ...fontSizing(-1) },
          large: { ...fontSizing(-1) },
          xlarge: { ...fontSizing(-1) },
        },
      },
      responsiveBreakpoint: 'small', // when we scale the font size down
      weight: 700,
    },
    layer: {
      background: 'white',
      border: {
        radius: '4px',
      },
      container: {
        zIndex: '15',
      },
      // extend: undefined,
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
      responsiveBreakpoint: 'small', // when Layer takes over the full screen
      zIndex: '10',
    },
    list: {
      item: {
        // background: undefined,
        border: 0,
        pad: { horizontal: `${baseSpacing * 2}px`, vertical: `${baseSpacing}px` },
        // extend: undefined,
      },
      // extend: undefined,
    },
    maskedInput: {
      // extend: undefined,
      // disabled: { opacity: undefined },
    },
    menu: {
      // background: undefined,
      // extend: undefined,
    },
    meter: {
      color: 'graph-0',
      // colors: [] || colors: ['graph-0', 'graph-1', 'graph-2', 'graph-3'],
      // extend: undefined,
    },
    modalpopup: {
      container: {
        width: 'large',
      },
      title: {
        wrapper: {
          pad: { horizontal: 'large', vertical: 'medium' },
          border: {
            side: 'bottom',
            color: 'dark-6',
          },
        },
        text: {
          level: 3,
          size: 'small',
          color: 'dark-3',
        },
      },
      message: {
        wrapper: {
          pad: {
            horizontal: 'large',
            vertical: 'xlarge',
          },
        },
        text: {
          size: 'medium',
          color: 'dark-3',
          style: {
            lineHeight: `${baseSpacing * 1.25}px`,
          },
        },
      },
      buttons: {
        wrapper: {
          pad: {
            horizontal: 'large',
            bottom: 'large',
            top: 'medium',
          },
          direction: 'row',
        },
        button: {
          margin: {
            right: 'medium',
          },
        },
      },
    },
    multiselect: {
      option: {
        width: 'full',
        direction: 'row',
        justify: 'start',
        pad: { horizontal: 'medium' },
        align: 'center',
      },
      checkbox: {
        box: {
          margin: {
            right: 'medium',
            // extend: undefined,
          },
        },
        checkmark: {
          size: `${baseSpacing * 1.2}px`,
          color: 'dark-1',
        },
        check: {
          height: `${baseSpacing * 1.2}px`,
          width: `${baseSpacing * 1.2}px`,
          margin: 'auto',
          round: 'small',
          align: 'center',
          background: 'dark-3',
          border: { color: 'dark-1' },
          extend: props => ({
            background: normalizeColor('dark-3', props.theme),
          }),
        },
        include: {
          check: 'check',
          background: 'transparent',
        },
        exclude: {
          check: null,
          background: 'transparent',
        },
      },
      chips: {
        wrapper: {
          pad: 'medium',
          direction: 'row',
          extend: props => ({
            padding: props.twoColumnLayout ? 0 : `${baseSpacing / 1.618}px`,
            'border-bottom': props.twoColumnLayout
              ? 'none'
              : '1px solid #D9DBE5',
          }),
        },
        option: {
          background: 'light-3',
          round: 'small',
          pad: {
            vertical: 'small',
            horizontal: 'medium',
          },
          margin: 'small',
          direction: 'row',
          align: 'center',
          extend: props => ({
            width: props.twoColumnLayout ? '100%' : 'auto',
            margin: props.twoColumnLayout
              ? 0
              : `${baseSpacing / (1.618 * 2)}px`,
            background: normalizeColor(props.twoColumnLayout ? 'white' : 'light-3', props.theme),
            padding: props.twoColumnLayout
              ? `${baseSpacing / 1.618}px`
              : `${baseSpacing / (1.618 * 2)}px ${baseSpacing / 1.618}px`,
            'border-radius': props.twoColumnLayout
              ? 0
              : `${baseSpacing / (1.618 * 2)}px`,
            'border-bottom': props.twoColumnLayout
              ? '1px solid #D9DBE5'
              : 'none',
            'justify-content': props.twoColumnLayout
              ? 'space-between'
              : 'flex-start',
          }),
        },
        label: {
          color: 'dark-3',
          size: 'medium',
          weight: 600,
          margin: {
            right: 'small',
          },
          extend: props => {
            const getTextColor = () => {
              switch (props.isExcluded) {
                case false:
                  return '#38C18B';
                case true:
                  return '#FC564F';
                default:
                  return normalizeColor('dark-3', props.theme);
              }
            };
            return {
              color: getTextColor(),
            };
          },
        },
        icon: {
          size: 'small',
          color: 'dark-3',
        },
        clear: {
          color: 'accent-2',
          size: 'small',
        },
      },
      controls: {
        wrapper: {
          pad: 'medium',
          direction: 'row',
          height: {
            min: 'auto',
          },
          // extend: undefined,
        },
        button: {
          margin: 'small',
        },
      },
      searchbox: {
        container: {
          height: {
            min: 'xxsmall',
            max: 'xxsmall',
          },
          direction: 'row',
          align: 'center',
          background: 'light-2',
          pad: { right: 'medium', vertical: 'small' },
          extend: props => ({
            background:
              normalizeColor(props.layout === 'double-column' ? 'white' : 'light-2', props.theme),
            'flex-direction':
              props.layout === 'double-column' ? 'row-reverse' : 'row',
            'padding-left':
              props.layout === 'double-column' ? `${baseSpacing / 1.618}px` : 0,
            'border-bottom':
              props.layout === 'double-column' ? '1px solid #D9DBE5' : 'none',
          }),
        },
        placeholder: {
          color: 'dark-5',
          size: 'medium',
        },
        icon: {
          size: 'small',
          color: 'dark-3',
        },
      },
      rightPanel: {
        border: '#D9DBE5',
        incExcHeader: {
          box: {
            direction: 'row',
            justify: 'between',
            pad: 'medium',
            background: 'background-back',
            border: {
              side: 'bottom',
              color: '#D9DBE5',
            },
          },
          text: {
            color: 'accent-2',
            size: 'medium',
            weight: 600,
          },
        },
      },
      label: {
        color: 'dark-1',
      },

      custom: {
        wrapper: {
          direction: 'row',
        },
        textAreaWrap: {
          border: { side: 'right' },
          pad: 'large',
        },
        label: {
          weight: 600,
        },
        textAreaContainer: {
          width: 'medium',
          height: 'medium',
          minHeight: '140px',
          margin: { vertical: 'medium' },
        },
        actions: {
          wrapper: {
            direction: 'row',
            margin: { vertical: 'small' },
            gap: 'medium',
            height: { min: 'auto' },
          },
        },
      },
    },
    paragraph: {
      small: { ...fontSizing(-1) },
      medium: { ...fontSizing(0) },
      large: { ...fontSizing(1) },
      xlarge: { ...fontSizing(2) },
      xxlarge: { ...fontSizing(4) },
    },
    radioButton: {
      border: {
        color: {
          dark: 'dark-6',
          light: 'dark-6',
        },
        width: '3px',
      },
      check: {
        radius: '100%',
        color: {
          dark: 'accent-3',
          light: 'accent-3',
        },
        // extend: undefined,
      },
      hover: {
        border: {
          color: {
            dark: 'accent-3',
            light: 'accent-3',
          },
        },
      },
      icon: {
        // size: undefined,
        extend: {
          display: 'none',
        },
      },
      icons: {
        // circle: undefined,
      },
      gap: 'small',
      size: `${baseSpacing}px`,
      extend: {
        'margin-right': `${baseSpacing}px`,
      },
    },
    rangeInput: {
      track: {
        height: '4px',
        color: css`
          ${props => rgba(normalizeColor('border', props.theme), 0.2)};
        `,
      },
      thumb: {
        // color: { dark: undefined, light: undefined },
      },
    },
    rangeSelector: {
      background: {
        invert: {
          color: 'light-4',
        },
      },
      // edge: {
      //   type: undefined,
      // },
    },
    select: {
      background: 'dark-3',
      activeColor: 'light-5',
      container: {
        extend: props => ({
          borderColor: normalizeColor('border', props.theme),
          background: normalizeColor('dark-3', props.theme),
        }),
      },
      control: {
        // open: undefined,
        extend: {
          border: 'none',
          borderRadius: `${baseSpacing / 3.2}px`,
        },
      },
      options: {
        container: {
          align: 'start',
          pad: 'small',
          round: 'false',
        },
        text: {
          margin: 'small',
          color: 'dark-1',
        },
      },
      icons: {
        color: 'icon',
        margin: 'none',
        pad: 'medium',
        background: 'dark-3',
        up: ArrowUp,
        down: ArrowDown,
        extend: {
          borderRadius: `${baseSpacing / 3.2}px`,
          span: {
            fontSize: `${baseSpacing}px`,
            fontWeight: 600,
          },
        },
      },
      // searchInput: undefined,
      step: 20,
    },
    sidebar: {
      header: {
        background: 'dark-8',
        align: 'center',
        pad: {
          top: `${baseSpacing}px`,
          bottom: `${baseSpacing * 1.428}px`,
        },
        initial: {
          background: initialBgColor,
          height: `${baseSpacing * 4.64}px`,
          width: `${baseSpacing * 4.64}px`,
          align: 'center',
          justify: 'center',
          round: 'full',
          margin: { vertical: 'medium' },
          text: {
            color: 'white',
            size: `${baseSpacing * 1.785}px`,
          },
        },
        username: {
          size: `${baseSpacing}px`,
          color: 'white',
          margin: { vertical: 'small' },
        },
        anchor: {
          textDecoration: 'none',
          size: 'large',
          margin: { top: 'small' },
          color: 'accent-1',
          fontWeight: '200',
        },
      },
      menu: {
        pad: { vertical: 'xlarge', horizontal: 'medium' },
        item: {
          pad: { horizontal: 'medium', vertical: 'medium' },
          direction: 'row',
          gap: 'large',
          align: 'center',
          icon: {
            size: `${baseSpacing * 1.5}px`,
            color: 'dark-2',
          },
          label: {
            size: 'large',
            color: 'dark-2',
          },
        },
        list: {
          alignSelf: 'stretch',
          pad: { horizontal: `${baseSpacing * 2.25}px`, vertical: `${baseSpacing / 2}px` },
          border: {
            color: 'dark-1',
            side: 'top',
            size: 'xsmall',
          },
          margin: { horizontal: 'large', vertical: '0' },
          text: {
            color: 'dark-4',
            alignSelf: 'start',
          },
        },
      },
    },
    switch: {
      padding: `${baseSpacing * 0.625}px`,
      fontWeight: 600,
      fontSize: `${baseSpacing * 0.625}px`,
      opacity: 1,
      height: `${baseSpacing * 1.56}px`,
      background: {
        active: 'accent-1',
        inactive: 'dark-3',
        disabled: {
          active: 'dark-2',
          // inactive: undefined,
        },
      },
      text: {
        active: 'white',
        inactive: 'dark-2',
        disabled: {
          active: 'dark-3',
          // inactive: undefined,
        },
      },
      container: {
        direction: 'row',
        gap: 'none',
        round: 'small',
        overflow: 'hidden',
      },
      disabled: {
        border: {
          size: 'xsmall',
          color: 'dark-2',
        },
      },
    },
    tab: {
      active: {
        color: 'white',
        weight: 600,
        background: 'dark-1',
      },
      color: 'dark-1',
      // background: undefined,
      // hover: undefined,

      pad: {
        vertical: 'small',
        horizontal: 'medium',
      },
      margin: 'none',
      border: 0,
      extend: {
        borderRadius: `${baseSpacing / 3.2}px`,
        span: {
          fontSize: `${baseSpacing * 0.875}px`,
        },
        paddingBottom: `${baseSpacing / 3.2}px`,
      },
    },
    tabs: {
      // background: undefined,
      // extend: undefined,
      gap: 'none',
      header: {
        // background: undefined,
        // extend: undefined,
      },
      panel: {
        extend: {},
      },
    },
    table: {
      extend: ({ theme }) => ({
        'table-layout': 'fixed',
        'border-collapse': 'collapse',
        width: '100%',
        'tr:nth-child(even)': {
          background: normalizeColor('background-front', theme),
        },
        'tr:nth-child(odd)': {
          background: normalizeColor('background-back', theme),
        },
        'th:nth-child(1)': {
          width: `${baseSpacing * 9}px`,
        },
        'th:nth-child(3)': {
          width: `${baseSpacing * 12}px`,
        },
        'th:nth-child(5)': {
          width: `${baseSpacing * 11}px`,
        },
        color: normalizeColor('dark-1', theme),
        td: {
          border: 'none',
        },
        thead: {
          th: {
            span: {
              fontSize: 'small',
              color: normalizeColor('dark-1', theme),
              fontWeight: 600,
            },
          },
        },
        tbody: {
          th: {
            padding: `${baseSpacing * 2}px ${baseSpacing / 1.65}px`,
          },
          td: {
            span: {
              fontSize: `${baseFontSize * 1.5}px`,
            },
          },
        },
      }),
      header: {
        align: 'start',
        fill: 'horizontal',
        verticalAlign: 'bottom',
        weight: 600,
        background: {
          color: 'dark-3',
        },
        extend: ({ theme }) => ({
          span: {
            color: normalizeColor('dark-1', theme),
            'font-weight': '600',
            fontSize: `${baseFontSize}px`,
          },
        }),
        // verticalAlign: undefined,
        // background: undefined,
        // extend: undefined,
      },
      body: {
        align: 'start',
        // background: undefined,
        // border: undefined,
        // extend: undefined,
      },
      row: {
        hover: {
          background: undefined,
          color: undefined,
        },
        text: {
          margin: 'none',
          size: 'small',
          color: 'dark-1',
        },
      },
      footer: {
        align: 'start',
        // pad: { horizontal: 'small', vertical: 'xsmall' },
        border: 'top',
        // verticalAlign: undefined,
        // background: undefined,
        // extend: undefined,
        text: {
          margin: 'none',
          size: 'small',
          color: 'dark-1',
        },
      },
    },
    text: {
      xsmall: { ...fontSizing(-1.5) },
      small: { ...fontSizing(-1) },
      medium: { ...fontSizing(0) }, // 18px
      large: { ...fontSizing(1) }, // 22px
      xlarge: { ...fontSizing(2) },
      xxlarge: { ...fontSizing(4) },
    },
    textArea: {
      extend: {
        border: 'none',
        'box-shadow': 'none',
      },
      // disabled: { opacity: undefined },
    },
    textInput: {
      // disabled: { opacity: undefined },
      extend: ({ theme, onSuggestionsOpen }) => ({
        'box-shadow': 'none',
        color: normalizeColor('dark-1', theme),
        lineHeight: 'normal',
        input: {
          fontWeight: onSuggestionsOpen ? '400' : '600',
        },
      }),
      suggestions: {
        extend: undefined,
      },
    },
    mnetPagination: {
      background: 'transparent',
      round: 'small',
      border: {
        color: 'transparent',
      },
      pad: 'medium',
      active: {
        color: 'transparent',
      },
      icon: {
        bgColor: 'transparent',
        pad: 'xsmall',
        size: `${baseSpacing / 1.14}px`,
      },
      extend: ({ className, theme }) => ({
        button: {
          color: normalizeColor(className === 'active' ? 'dark-1' : 'dark-2', theme),
          'font-size': `${baseSpacing / 1.14}px`,
          'font-weight': className === 'active' ? '700' : '400',
          span: {
            'font-size': `${baseSpacing / 1.14}px`,
          },
        },
      }),
    },
    tooptip: {
      showArrow: false,
      background: 'white',
      color: 'dark-1',
      tipSize: '5px',
      round: 'small',
      maxWidth: '20%',
      dropProps: { left: 'right', top: 'bottom' },
      boxShadow: '0 1px 5px 0 rgba(0,0,0,0.21)',
      pad: {
        horizontal: 'large',
        vertical: 'medium',
      },
      text: {
        size: 'large',
        style: {
          lineHeight: `${baseSpacing * 1.43}px`,
        },
      },
    },
    notification: {
      toast: {
        closeIcon: Close,
        position: 'top-right',
        zIndex: 999,
        width: '60%',
        color: 'white',
        timeout: 5000,
        icon: {
          size: 'xlarge',
          default: Info,
          ok: Success,
          error: Failed,
        },
        text: {
          default: {
            weight: 600,
            size: 'large',
          },
          ok: {
            color: 'white',
            weight: 600,
            size: 'large',
            margin: { horizontal: 'small' },
          },
          error: {
            color: 'white',
            weight: 600,
            size: 'large',
            margin: { horizontal: 'small' },
          },
        },
        default: {
          background: 'dark-1',
          size: 'medium',
          align: 'center',
          direction: 'row',
          gap: 'medium',
          justify: 'between',
          round: 'small',
          elevation: 'medium',
          pad: { vertical: 'medium', horizontal: 'medium' },
          margin: { vertical: 'small', horizontal: 'large' },
        },
        ok: {
          background: 'status-ok',
          // text: {},
        },
        critical: {
          background: 'status-critical',
          // text: {},
        },
        error: {
          background: 'status-error',
          // text: {},
        },
        warning: {
          background: 'status-warning',
          // text: {},
        },
      },
    },
    avails: {
      container: {
        background: 'white',
        direction: 'column',
        border: true,
        round: { size: 'small', corner: 'top' },
      },
      views: {
        size: `${baseSpacing * 2.5}px`,
        color: 'dark-1',
      },
      collapsible: {
        container: {
          reverse: true,
          headerProps: { border: false },
          alignTitle: { gap: 'medium' },
          pad: { bottom: 'xlarge' },
        },
        grid: {
          rows: ['xxsmall', 'xxsmall', 'xxsmall'],
          columns: ['auto', 'auto'],
          areas: [
            { name: 'env', start: [0, 0], end: [1, 0] },
            { name: 'country', start: [0, 1], end: [0, 1] },
            { name: 'device', start: [1, 1], end: [1, 1] },
            { name: 'browser', start: [0, 2], end: [0, 2] },
            { name: 'os', start: [1, 2], end: [1, 2] },
          ],
        },
      },
      multiSelect: {
        reverse: true,
        removeSelected: false,
        labelKey: 'label',
        valueKey: { key: 'id', reduce: true },
        layout: 'single-column',
        loader: {
          size: '20',
        },
      },
    },
    urlList: {
      container: {
        direction: 'column',
        border: [{ side: 'bottom' }, { side: 'vertical' }],
        round: { size: 'small', corner: 'bottom' },
      },
      title: {
        margin: { vertical: 'medium' },
        size: 'xlarge',
        weight: '600',
        color: 'dark-1',
      },
      anchor: {
        extend: {
          margin: { vertical: 'medium' },
          color: 'accent-1',
          target: '_blank',
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        },
        anchorLabel: {
          weight: 400,
          margin: { vertical: 'medium' },
        },
      },
    },
  };

  return deepFreeze(result);
};

export const cdp = generate(14);
