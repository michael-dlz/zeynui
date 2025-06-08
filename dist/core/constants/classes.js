export const RADIUS_CLASSES = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};
export const WRAPPER_INPUT_SELECT_CLASSES = {
    solid: {
        primary: "bg-primary hover:bg-primary/80 text-foreground focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
        secondary: "bg-secondary hover:bg-secondary/80 text-foreground focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
        danger: "bg-danger hover:bg-danger/80 text-foreground focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
        warning: "bg-warning hover:bg-warning/80 text-foreground focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
        success: "bg-success hover:bg-success/80 text-foreground focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
        info: "bg-info hover:bg-info/80 text-black focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    },
    outline: {
        primary: "border border-primary focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
        secondary: "border border-secondary focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
        danger: "border border-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
        warning: "border border-warning focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
        success: "border border-success focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
        info: "border border-info focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    },
    soft: {
        primary: "bg-primary/5 border border-transparent focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 text-primary",
        secondary: "bg-secondary/5 border border-transparent focus-within:border-secondary focus-within:ring-4 focus-within:ring-secondary/10 text-secondary",
        danger: "bg-danger/5 border border-transparent focus-within:border-danger focus-within:ring-4 focus-within:ring-danger/10 text-danger",
        warning: "bg-warning/5 border border-transparent focus-within:border-warning focus-within:ring-4 focus-within:ring-warning/10 text-warning",
        success: "bg-success/5 border border-transparent focus-within:border-success focus-within:ring-4 focus-within:ring-success/10 text-success",
        info: "bg-info/5 border border-transparent focus-within:border-info focus-within:ring-4 focus-within:ring-info/10 text-info",
    },
    light: {
        primary: "border border-gray-300 hover:border-primary focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
        secondary: "border border-gray-300 hover:border-secondary focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
        danger: "border border-gray-300 hover:border-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
        warning: "border border-gray-300 hover:border-warning focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
        success: "border border-gray-300 hover:border-success focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
        info: "border border-gray-300 hover:border-info focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    },
    underline: {
        primary: "bg-gray-50 border-b border-primary hover:bg-gray-100 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
        secondary: "bg-gray-50 border-b border-secondary hover:bg-gray-100 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
        danger: "bg-gray-50 border-b border-danger hover:bg-gray-100 focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
        warning: "bg-gray-50 border-b border-warning hover:bg-gray-100 focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
        success: "bg-gray-50 border-b border-success hover:bg-gray-100 focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
        info: "bg-gray-50 border-b border-info hover:bg-gray-100 focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    },
    ghost: {
        primary: "border border-gray-300 hover:border-primary",
        secondary: "border border-gray-300 hover:border-secondary",
        danger: "border border-gray-300 hover:border-danger",
        warning: "border border-gray-300 hover:border-warning",
        success: "border border-gray-300 hover:border-success",
        info: "border border-gray-300 hover:border-info",
    },
    shadow: {
        primary: "shadow-lg shadow-primary/20 placeholder:text-gray-500 text-foreground",
        secondary: "shadow-lg shadow-secondary/20 placeholder:text-gray-500 text-foreground",
        danger: "shadow-lg shadow-danger/20 placeholder:text-gray-500 text-foreground",
        warning: "shadow-lg shadow-warning/20 placeholder:text-gray-500 text-foreground",
        success: "shadow-lg shadow-success/20 placeholder:text-gray-500 text-foreground",
        info: "shadow-lg shadow-info/20 placeholder:text-gray-500 text-foreground",
    },
};
export const BASE_INPUT_SELECT_CLASSES = {
    input: "w-full bg-transparent outline-none -internal-autofill-selected:bg-none",
    disabled: "bg-gray-50 opacity-60 cursor-not-allowed placeholder:text-black/80",
};
export const INPUT_SELECT_CLASSES = {
    solid: {
        primary: "placeholder:text-foreground text-foreground",
        secondary: "placeholder:text-foreground text-foreground",
        danger: "placeholder:text-foreground text-foreground",
        warning: "placeholder:text-foreground text-foreground",
        success: "placeholder:text-foreground text-foreground",
        info: "placeholder:text-foreground text-foreground",
    },
    outline: {
        primary: "placeholder:text-primary text-primary",
        secondary: "placeholder:text-secondary text-secondary",
        danger: "placeholder:text-danger text-danger",
        warning: "placeholder:text-warning text-warning",
        success: "placeholder:text-success text-success",
        info: "placeholder:text-info text-info",
    },
    soft: {
        primary: "placeholder:text-primary text-primary",
        secondary: "placeholder:text-secondary text-secondary",
        danger: "placeholder:text-danger text-danger",
        warning: "placeholder:text-warning text-warning",
        success: "placeholder:text-success text-success",
        info: "placeholder:text-info text-info",
    },
    light: {
        primary: "placeholder:text-foreground/50 text-foreground",
        secondary: "placeholder:text-foreground/50 text-foreground",
        danger: "placeholder:text-foreground/50 text-foreground",
        warning: "placeholder:text-foreground/50 text-foreground",
        success: "placeholder:text-foreground/50 text-foreground",
        info: "placeholder:text-foreground/50 text-foreground",
    },
    underline: {
        primary: "placeholder:text-gray-500 text-black",
        secondary: "placeholder:text-gray-500 text-black",
        danger: "placeholder:text-gray-500 text-black",
        warning: "placeholder:text-gray-500 text-black",
        success: "placeholder:text-gray-500 text-black",
        info: "placeholder:text-gray-500 text-black",
    },
    ghost: {
        primary: "placeholder:text-gray-500 text-foreground",
        secondary: "placeholder:text-gray-500 text-foreground",
        danger: "placeholder:text-gray-500 text-foreground",
        warning: "placeholder:text-gray-500 text-foreground",
        success: "placeholder:text-gray-500 text-foreground",
        info: "placeholder:text-gray-500 text-foreground",
    },
    shadow: {
        primary: "placeholder:text-primary text-primary",
        secondary: "placeholder:text-secondary text-secondary",
        danger: "placeholder:text-danger text-danger",
        warning: "placeholder:text-warning text-warning",
        success: "placeholder:text-success text-success",
        info: "placeholder:text-info text-info",
    },
};
export const BUTTON_CLASSES = {
    solid: {
        primary: "bg-primary hover:bg-primary/90 text-white focus-visible:ring-primary",
        secondary: "bg-secondary hover:bg-secondary/90 text-white focus-visible:ring-secondary",
        danger: "bg-danger hover:bg-danger/90 text-white focus-visible:ring-danger",
        warning: "bg-warning hover:bg-warning/90 text-white focus-visible:ring-warning",
        success: "bg-success hover:bg-success/90 text-white focus-visible:ring-success",
        info: "bg-info hover:bg-info/90 text-white focus-visible:ring-info",
    },
    outline: {
        primary: "border border-primary/50 text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
        secondary: "border border-secondary/50 text-secondary hover:bg-secondary hover:text-white focus-visible:ring-secondary",
        danger: "border border-danger/50 text-danger hover:bg-danger hover:text-white focus-visible:ring-danger",
        warning: "border border-warning/50 text-warning hover:bg-warning hover:text-white focus-visible:ring-warning",
        success: "border border-success/50 text-success hover:bg-success hover:text-white focus-visible:ring-success",
        info: "border border-info/50 text-info hover:bg-info hover:text-white focus-visible:ring-info",
    },
    soft: {
        primary: "bg-primary/10 text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
        secondary: "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white focus-visible:ring-secondary",
        danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white focus-visible:ring-danger",
        warning: "bg-warning/10 text-warning hover:bg-warning hover:text-white focus-visible:ring-warning",
        success: "bg-success/10 text-success hover:bg-success hover:text-white focus-visible:ring-success",
        info: "bg-info/10 text-info hover:bg-info hover:text-white focus-visible:ring-info",
    },
    light: {
        primary: "text-primary hover:bg-primary/10 focus-visible:ring-primary",
        secondary: "text-secondary hover:bg-secondary/10 focus-visible:ring-secondary",
        danger: "text-danger hover:bg-danger/10 focus-visible:ring-danger",
        warning: "text-warning hover:bg-warning/10 focus-visible:ring-warning",
        success: "text-success hover:bg-success/10 focus-visible:ring-success",
        info: "text-info hover:bg-info/10 focus-visible:ring-info",
    },
    underline: {
        primary: "text-primary border-b border-primary hover:bg-primary/10 focus-visible:ring-primary",
        secondary: "text-secondary border-b border-secondary hover:bg-secondary/10 focus-visible:ring-secondary",
        danger: "text-danger border-b border-danger hover:bg-danger/10 focus-visible:ring-danger",
        warning: "text-warning border-b border-warning hover:bg-warning/10 focus-visible:ring-warning",
        success: "text-success border-b border-success hover:bg-success/10 focus-visible:ring-success",
        info: "text-info border-b border-info hover:bg-info/10 focus-visible:ring-info",
    },
    ghost: {
        primary: "text-black hover:bg-primary/10 hover:text-black focus-visible:ring-primary",
        secondary: "text-black hover:bg-secondary/10 hover:text-black focus-visible:ring-secondary",
        danger: "text-black hover:bg-danger/10 hover:text-black focus-visible:ring-danger",
        warning: "text-black hover:bg-warning/10 hover:text-black focus-visible:ring-warning",
        success: "text-black hover:bg-success/10 hover:text-black focus-visible:ring-success",
        info: "text-black hover:bg-info/10 hover:text-black focus-visible:ring-info",
    },
    shadow: {
        primary: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/50 focus-visible:ring-primary",
        secondary: "bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/50 focus-visible:ring-secondary",
        danger: "bg-danger hover:bg-danger/90 text-white shadow-lg shadow-danger/50 focus-visible:ring-danger",
        warning: "bg-warning hover:bg-warning/90 text-white shadow-lg shadow-warning/50 focus-visible:ring-warning",
        success: "bg-success hover:bg-success/90 text-white shadow-lg shadow-success/50 focus-visible:ring-success",
        info: "bg-info hover:bg-info/90 text-white shadow-lg shadow-info/50 focus-visible:ring-info",
    },
};
export const SIZE_CLASSES = {
    sm: "text-[0.6rem] px-[1rem] py-[0.5rem]",
    md: "text-[0.8rem] px-[1.3rem] py-[0.7rem]",
    lg: "text-[1rem] px-[1.6rem] py-[0.9rem]",
};
export const SIZE_CLASSES_ONLY_ICON = {
    sm: "size-[2rem] text-[0.6rem]",
    md: "size-[3rem] text-[0.8rem]",
    lg: "size-[4rem] text-[1rem]",
};
export const INPUT_SELECT_SIZE_CLASSES = {
    sm: "text-[0.6rem] h-[2rem] px-2 py-1.5",
    md: "text-[0.8rem] h-[2.7rem] px-3 py-3",
    lg: "text-[1rem] h-[3rem] px-4 py-4",
};
export const TAB_CLASSES = {
    solid: {
        primary: { active: "bg-primary text-foreground", inactive: "text-primary" },
        secondary: {
            active: "bg-secondary text-foreground",
            inactive: "text-secondary",
        },
        danger: { active: "bg-danger text-foreground", inactive: "text-danger" },
        warning: { active: "bg-warning text-foreground", inactive: "text-warning" },
        success: { active: "bg-success text-foreground", inactive: "text-success" },
        info: { active: "bg-info text-foreground", inactive: "text-info" },
    },
    outline: {
        primary: {
            active: "border bg-primary border-primary/50 text-foreground",
            inactive: "bg-transparent border border-primary/50 text-primary -ml-px first:ml-0",
        },
        secondary: {
            active: "border bg-secondary border-secondary/50 text-foreground",
            inactive: "bg-transparent border border-secondary/50 text-secondary -ml-px first:ml-0",
        },
        danger: {
            active: "border bg-danger border-danger/50 text-foreground",
            inactive: "bg-transparent border border-danger/50 text-danger -ml-px first:ml-0",
        },
        warning: {
            active: "border bg-warning border-warning/50 text-foreground",
            inactive: "bg-transparent border border-warning/50 text-warning -ml-px first:ml-0",
        },
        success: {
            active: "border bg-success border-success/50 text-foreground",
            inactive: "bg-transparent border border-success/50 text-success -ml-px first:ml-0",
        },
        info: {
            active: "border bg-info border-info/50 text-foreground",
            inactive: "bg-transparent border border-info/50 text-info -ml-px first:ml-0",
        },
    },
    soft: {
        primary: {
            active: "bg-primary/10 text-primary",
            inactive: "bg-primary/5 text-primary",
        },
        secondary: {
            active: "bg-secondary/10 text-secondary",
            inactive: "bg-secondary/5 text-secondary",
        },
        danger: {
            active: "bg-danger/10 text-danger",
            inactive: "bg-danger/5 text-danger",
        },
        warning: {
            active: "bg-warning/10 text-warning",
            inactive: "bg-warning/5 text-warning",
        },
        success: {
            active: "bg-success/10 text-success",
            inactive: "bg-success/5 text-success",
        },
        info: { active: "bg-info/10 text-info", inactive: "bg-info/5 text-info" },
    },
    light: {
        primary: {
            active: "bg-primary/5 text-primary",
            inactive: "bg-primary/2 text-primary/50",
        },
        secondary: {
            active: "bg-secondary/5 text-secondary",
            inactive: "bg-secondary/2 text-secondary/50",
        },
        danger: {
            active: "bg-danger/5 text-danger",
            inactive: "bg-danger/2 text-danger/50",
        },
        warning: {
            active: "bg-warning/5 text-warning",
            inactive: "bg-warning/2 text-warning/50",
        },
        success: {
            active: "bg-success/5 text-success",
            inactive: "bg-success/2 text-success/50",
        },
        info: {
            active: "bg-info/5 text-info",
            inactive: "bg-info/2 text-info/50",
        },
    },
    underline: {
        primary: {
            active: "border-b-2 border-primary text-primary",
            inactive: "border-b-2 border-transparent text-primary",
        },
        secondary: {
            active: "border-b-2 border-secondary text-secondary",
            inactive: "border-b-2 border-transparent text-secondary",
        },
        danger: {
            active: "border-b-2 border-danger text-danger",
            inactive: "border-b-2 border-transparent text-danger",
        },
        warning: {
            active: "border-b-2 border-warning text-warning",
            inactive: "border-b-2 border-transparent text-warning",
        },
        success: {
            active: "border-b-2 border-success text-success",
            inactive: "border-b-2 border-transparent text-success",
        },
        info: {
            active: "border-b-2 border-info text-info",
            inactive: "border-b-2 border-transparent text-info",
        },
    },
    ghost: {
        primary: {
            active: "text-primary",
            inactive: "text-primary/50",
        },
        secondary: {
            active: "text-secondary",
            inactive: "text-secondary/50",
        },
        danger: {
            active: "text-danger",
            inactive: "text-danger/50",
        },
        warning: {
            active: "text-warning",
            inactive: "text-warning/50",
        },
        success: {
            active: "text-success",
            inactive: "text-success/50",
        },
        info: {
            active: "text-info",
            inactive: "text-info/50",
        },
    },
    shadow: {
        primary: {
            active: "shadow-lg shadow-primary/20 text-primary",
            inactive: "shadow-lg shadow-primary/10 text-primary/50",
        },
        secondary: {
            active: "shadow-lg shadow-secondary/20 text-secondary",
            inactive: "shadow-lg shadow-secondary/10 text-secondary/50",
        },
        danger: {
            active: "shadow-lg shadow-danger/20 text-danger",
            inactive: "shadow-lg shadow-danger/10 text-danger/50",
        },
        warning: {
            active: "shadow-lg shadow-warning/20 text-warning",
            inactive: "shadow-lg shadow-warning/10 text-warning/50",
        },
        success: {
            active: "shadow-lg shadow-success/20 text-success",
            inactive: "shadow-lg shadow-success/10 text-success/50",
        },
        info: {
            active: "shadow-lg shadow-info/20 text-info",
            inactive: "shadow-lg shadow-info/10 text-info/50",
        },
    },
};
export const CHIP_CLASSES = {
    solid: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        danger: "bg-danger text-white",
        warning: "bg-warning text-white",
        success: "bg-success text-white",
        info: "bg-info text-white",
    },
    outline: {
        primary: "border border-primary/50 text-primary",
        secondary: "border border-secondary/50 text-secondary",
        danger: "border border-danger/50 text-danger",
        warning: "border border-warning/50 text-warning",
        success: "border border-success/50 text-success",
        info: "border border-info/50 text-info",
    },
    soft: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        danger: "bg-danger/10 text-danger",
        warning: "bg-warning/10 text-warning",
        success: "bg-success/10 text-success",
        info: "bg-info/10 text-info",
    },
    light: {
        primary: "text-primary",
        secondary: "text-secondary",
        danger: "text-danger",
        warning: "text-warning",
        success: "text-success",
        info: "text-info",
    },
    underline: {
        primary: "text-primary border-b border-primary",
        secondary: "text-secondary border-b border-secondary",
        danger: "text-danger border-b border-danger",
        warning: "text-warning border-b border-warning",
        success: "text-success border-b border-success",
        info: "text-info border-b border-info",
    },
    ghost: {
        primary: "text-black",
        secondary: "text-black",
        danger: "text-black",
        warning: "text-black",
        success: "text-black",
        info: "text-black",
    },
    shadow: {
        primary: "shadow-lg shadow-primary/20 text-primary",
        secondary: "shadow-lg shadow-secondary/20 text-secondary",
        danger: "shadow-lg shadow-danger/20 text-danger",
        warning: "shadow-lg shadow-warning/20 text-warning",
        success: "shadow-lg shadow-success/20 text-success",
        info: "shadow-lg shadow-info/20 text-info",
    }
};
